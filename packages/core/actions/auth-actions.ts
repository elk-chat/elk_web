import { put, takeLatest, call, delay } from 'redux-saga/effects';

import {
  ApplyLogin
} from "@little-chat/sdk";

export interface LoginForm {
  UserName: string;
  Password: string;
}

export const APPLY_LOGIN = "APPLY_LOGIN";
export const LOGGING = "LOGGING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_TIMEOUT = "LOGIN_TIMEOUT";
export function* login(action) {
  yield put({ type: LOGGING });
  try {
    const userInfo = yield call(ApplyLogin, action.form);
    yield delay(1000);
    yield put({ type: LOGIN_SUCCESS, userInfo });
  } catch(event) {
    console.log(event);
  }
}
export function applyLogin(form: LoginForm) {
  return {
    type: APPLY_LOGIN,
    form
  };
}

export function* watchApplyLogin() {
  yield takeLatest(APPLY_LOGIN, login);
}
