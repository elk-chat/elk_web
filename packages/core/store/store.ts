import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import chatReducers from '../reducers';
import sagas from '../sagas';

export default function createChatStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    chatReducers,
    preloadedState,
    applyMiddleware(createLogger(), sagaMiddleware)
  );

  sagaMiddleware.run(sagas);

  return store;
}
