import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import chatReducers from '../reducers';
import sagas from '../sagas';

let store;

export function getStore() {
  return store;
}

export default function createChatStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(
    chatReducers,
    preloadedState,
    applyMiddleware(
      // createLogger(),
      sagaMiddleware
    )
  );

  sagaMiddleware.run(sagas);

  return store;
}
