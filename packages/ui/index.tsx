import React from "react";
import createChatStore, { getPersistor } from '@little-chat/core/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ChatApp from './app';

const chatStore = createChatStore({});

const AppWithRedux = () => (
  <Provider store={chatStore}>
    <PersistGate loading={null} persistor={getPersistor()}>
      <ChatApp dispatch={chatStore.dispatch} />
    </PersistGate>
  </Provider>
);

export default AppWithRedux;
