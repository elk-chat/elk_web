import {
  put, takeLatest, call, delay
} from 'redux-saga/effects';
import { EventEmitter } from 'basic-helper';

import {
  ApplyLogin,
  ON_CONNECT_CLOSE
} from "@little-chat/sdk";
import initHeartBeat from './heartbeat';

export interface LoginForm {
  UserName: string;
  Password: string;
}

const stopHeartbeat = () => {};
const handleConnectClose = () => {
  /** 链接断开时，停止心跳 */
  stopHeartbeat();
};

EventEmitter.on(ON_CONNECT_CLOSE, handleConnectClose);


export const APPLY_LOGIN = "APPLY_LOGIN";
export const LOGGING = "LOGGING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_TIMEOUT = "LOGIN_TIMEOUT";
export function* login(action) {
  yield put({ type: LOGGING });
  try {
    const userInfo = yield call(ApplyLogin, action.form);
    yield put({ type: LOGIN_SUCCESS, userInfo });
    /** 登陆成功后启动心跳检测 */
    // stopHeartbeat = initHeartBeat();
  } catch (failInfo) {
    yield put({ type: LOGIN_FAIL, failInfo: failInfo.Message });
  }
}
export function applyLogin(form: LoginForm) {
  return {
    type: APPLY_LOGIN,
    form
  };
}

export function* watchAuthActions() {
  yield takeLatest(APPLY_LOGIN, login);
}
