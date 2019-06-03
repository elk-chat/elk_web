import React from "react";
import ReactDOM from "react-dom";

import createChatStore from '@little-chat/core/store';
import ChatApp from '@little-chat/ui/app';
import { Provider } from 'react-redux';

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
