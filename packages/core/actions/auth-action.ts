import createStore from 'unistore';
import { Call, EventEmitter } from 'basic-helper';

import { ApplyLogin, ON_CONNECT_CLOSE } from '@little-chat/sdk';
import initHeartBeat from './heartbeat';
import { getStorage, setStorage } from '../lib/storage';
import { USER_INFO_STORAGE } from '../constant';

const LAST_USER_ID = 'LAST_USER_ID';
const lastUserID = localStorage.getItem(LAST_USER_ID);

let stopHeartbeat = () => {};
const handleConnectClose = () => {
  /** 链接断开时，停止心跳 */
  stopHeartbeat();
};
EventEmitter.on(ON_CONNECT_CLOSE, handleConnectClose);

const defaultAuthStore = Object.assign({}, {
  userInfo: {},
  username: '',
  loginResDesc: '',
  logging: false,
  logouting: false,
  isLogin: false,
}, lastUserID ? getStorage(USER_INFO_STORAGE, lastUserID) : {});

const authStore = createStore(defaultAuthStore);

async function onLoginSuccess(store, resData) {
  const userInfo = resData;
  const nextLoginInfo = {
    userInfo,
    username: userInfo.UserName,
    loginResDesc: '登陆成功',
    logging: false,
    logouting: false,
    isLogin: true,
  };
  const emitEvent = 'LOGIN_SUCCESS';
  const emitData = { userInfo };
  const { UserID } = resData;

  stopHeartbeat = initHeartBeat();

  localStorage.setItem(LAST_USER_ID, UserID);

  setStorage(USER_INFO_STORAGE, {
    userInfo,
  }, UserID);

  store.setState(nextLoginInfo);

  EventEmitter.emit(emitEvent, emitData);
}

function clearPrevLoginData() {
  sessionStorage.clear();
}

function getPrevLoginData() {
  const res = sessionStorage.getItem('PREV_LOGIN_DATA');
  let result = null;
  if (res) {
    try {
      result = JSON.parse(res);
    } catch (e) {
      console.log(e);
    }
  }
  return result;
}

const authActions = store => ({
  async autoLogin() {
    const prevLoginData = getPrevLoginData();
    if (prevLoginData) {
      onLoginSuccess(store, prevLoginData);
    }
  },
  async applyLogin(state, form, callback) {
    let isPass = false;
    store.setState({
      logging: true,
      loginResDesc: '',
    });
    const loginRes = await ApplyLogin(form);
    if (!loginRes.Code) isPass = true;
    const isLogin = isPass;
    if (isLogin) {
      Call(callback, form);
      onLoginSuccess(store, { ...form, ...loginRes });
    } else {
      store.setState({
        logging: false,
        loginResDesc: loginRes ? loginRes.Message : '请求失败'
      });
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
