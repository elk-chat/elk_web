import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import chatReducers from '../reducers';
import sagas from '../sagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contactData', 'chatListData', 'chatContentData']
};

const persistedReducer = persistReducer(persistConfig, chatReducers);

let store;
let persistor;

export function getStore() {
  return store;
}
export function getPersistor() {
  return persistor;
}

export default function createChatStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(
    persistedReducer,
    preloadedState,
    applyMiddleware(
      // createLogger(),
      sagaMiddleware
    )
  );

  persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return store;
}
