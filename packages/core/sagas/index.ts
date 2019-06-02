import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';

import {
  watchApplyLogin
} from '../actions';

export default function* rootSaga() {
  yield all([
    watchApplyLogin(),
  ]);
}
