import { all } from 'redux-saga/effects';

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
