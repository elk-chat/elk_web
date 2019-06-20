import {
  LOGIN_SUCCESS, LOGIN_FAIL, LOGGING, LOGIN_TIMEOUT
} from '../actions';
import {
  ActionType, LoginAction, AuthState, UserInfo, AuthActions
} from '../types';

const initAuthState: AuthState = {
  isLogin: false,
  loginFail: false,
  logging: false,
  msg: '未登录',
};
export function authState(
  state = initAuthState,
  action: AuthActions,
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLogin: true,
        logging: false,
        msg: '登陆成功'
      });
    case LOGGING:
      return Object.assign({}, state, {
        isLogin: false,
        logging: true,
        msg: '登陆中'
      });
    case LOGIN_FAIL:
      const { failInfo } = action;
      return Object.assign({}, state, {
        isLogin: false,
        loginFail: true,
        logging: false,
        msg: failInfo
      });
    case LOGIN_TIMEOUT:
      return Object.assign({}, state, {
        isLogin: false,
        loginFail: true,
        logging: false,
        msg: '登陆超时'
      });
    default:
      return state;
  }
}

const initUserInfo: UserInfo = {
  UserName: '',
};
export function userInfo(
  state = initUserInfo,
  action: LoginAction
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.userInfo);
    case LOGIN_FAIL:
    case LOGIN_TIMEOUT:
      return initUserInfo;
    case LOGGING:
    default:
      return state;
  }
}
