import React from "react";
import ReactDOM from "react-dom";

import createChatStore from '@little-chat/core/store';
import ChatApp from '@little-chat/ui/app';
import { InitSDK } from '@little-chat/sdk';
import { Provider } from 'react-redux';
import config from './.config';

InitSDK(config);

const chatStore = createChatStore({});

const AppWithRedux = () => (
  <Provider store={chatStore}>
    <ChatApp />
  </Provider>
);

ReactDOM.render(
  <AppWithRedux />,
  document.getElementById("Main")
);
