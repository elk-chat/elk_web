import createStore from 'unistore';
import { Call, EventEmitter } from 'basic-helper';

import { ApplyLogin, ON_CONNECT_CLOSE } from '@little-chat/sdk';
import initHeartBeat from './heartbeat';
import {
  parseToObj
} from '../lib/storage';
import { USER_INFO_STORAGE, LOGIN_SUCCESS } from '../constant';

let lastUserInfo = localStorage.getItem(USER_INFO_STORAGE);

if (lastUserInfo) {
  lastUserInfo = parseToObj(lastUserInfo);
}

let stopHeartbeat = () => {};
const handleConnectClose = () => {
  /** 链接断开时，停止心跳 */
  stopHeartbeat();
};
EventEmitter.on(ON_CONNECT_CLOSE, handleConnectClose);

const defaultAuthStore = {
  Token: '',
  UserID: '',
  userInfo: {},
  username: '',
  loginResDesc: '',
  logging: false,
  logouting: false,
  isLogin: false,
};

const runtimeState = Object.assign({}, defaultAuthStore, lastUserInfo, lastUserInfo ? {
  isLogin: true
} : {});

const authStore = createStore(runtimeState);

async function onLoginSuccess(store, resData) {
  const userInfo = resData;
  userInfo.UserID = userInfo.UserID.toString();
  const { UserID, UserName } = userInfo;
  const nextLoginInfo = {
    UserID,
    userInfo,
    username: UserName,
    loginResDesc: '登陆成功',
    logging: false,
    logouting: false,
    isLogin: true,
  };
  const emitEvent = LOGIN_SUCCESS;
  const emitData = { userInfo };

  stopHeartbeat = initHeartBeat();

  localStorage.setItem(USER_INFO_STORAGE, JSON.stringify({
    userInfo,
  }));

  Object.assign(runtimeState, nextLoginInfo);

  store.setState(nextLoginInfo);

  EventEmitter.emit(emitEvent, emitData);
}

function clearPrevLoginData() {
  localStorage.removeItem(USER_INFO_STORAGE);
}

const authActions = store => ({
  async autoLogin() {
    if (!runtimeState.userInfo.Token) {
      store.setState({
        isLogin: false,
        loginResDesc: 'Token 失效'
      });
    } else {
      try {
        const loginRes = await ApplyLogin({
          Token: runtimeState.userInfo.Token
        });
        onLoginSuccess(store, { ...loginRes });
      } catch (error) {
        console.log(error);
        store.setState({
          isLogin: false
        });
      }
    }
  },
  async applyLogin(state, form, callback) {
    let isPass = false;
    store.setState({
      logging: true,
      loginResDesc: '',
    });
    try {
      const loginRes = await ApplyLogin(form);
      if (!loginRes.Code) isPass = true;
      const isLogin = isPass;
      if (isLogin) {
        Call(callback, form);
        onLoginSuccess(store, { ...form, ...loginRes });
      }
    } catch (res) {
      store.setState({
        logging: false,
        loginResDesc: res ? res.Message : '登陆失败'
      });
      clearPrevLoginData();
    }
  },
  async logout() {
    store.setState({
      logouting: true,
    });
    // await AUTH_APIS.logout();
    store.setState(defaultAuthStore);
    clearPrevLoginData();
  },
  logFail() {
    store.setState(defaultAuthStore);
    clearPrevLoginData();
  },
});

export {
  authStore, authActions
};
