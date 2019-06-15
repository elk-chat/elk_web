import {
  put, takeEvery, all, delay
} from 'redux-saga/effects';

import {
  watchAuthActions,
  watchChatActions
} from '../actions';

export default function* rootSaga() {
  yield all([
    watchAuthActions(),
    watchChatActions(),
  ]);
}
