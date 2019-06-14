import {
  put, takeEvery, all, delay
} from 'redux-saga/effects';

import {
  watchApplyLogin
} from '../actions';

export default function* rootSaga() {
  yield all([
    watchApplyLogin(),
  ]);
}
