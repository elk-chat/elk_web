import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import chatReducers from '../reducers';

export default function createChatStore(preloadedState) {
  return createStore(
    chatReducers,
    preloadedState,
    applyMiddleware(createLogger())
  )
}
