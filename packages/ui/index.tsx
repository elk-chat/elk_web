import React from "react";
import createChatStore from '@little-chat/core/store';
import { Provider } from 'react-redux';
import ChatApp from './app';

const chatStore = createChatStore({});

const AppWithRedux = () => (
  <Provider store={chatStore}>
    <ChatApp dispatch={chatStore.dispatch} />
  </Provider>
);

export default AppWithRedux;
