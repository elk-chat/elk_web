import React from "react";
import ReactDOM from "react-dom";

import createChatStore from '@little-chat/core/store';
import { Provider } from 'react-redux';

import App from "./connect";

const chatStore = createChatStore({});

const AppWithRedux = () => (
  <Provider store={chatStore}>
    <App />
  </Provider>
);

ReactDOM.render(
  <AppWithRedux />,
  document.getElementById("Main")
);
