import { all } from 'redux-saga/effects';

import {
  // watchAuthActions,
  watchChatActions,
  watchContactActions,
  watchInitActions,
} from '../actions';

export default function* rootSaga() {
  yield all([
    watchInitActions(),
    // watchAuthActions(),
    watchChatActions(),
    watchContactActions(),
  ]);
}
