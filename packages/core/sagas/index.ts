import { all } from 'redux-saga/effects';

import {
  watchAuthActions,
  watchChatActions,
  watchContactActions,
} from '../actions';

export default function* rootSaga() {
  yield all([
    watchAuthActions(),
    watchChatActions(),
    watchContactActions(),
  ]);
}
