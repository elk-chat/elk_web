import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import createChatStore from '@little-chat/core/store';
import "@little-chat/protocal";

import App from "./connect";

const chatStore = createChatStore({});

const AppWithRedux = () => (
  <Provider store={chatStore}>
    <App />
  </Provider>
)

ReactDOM.render(
  <AppWithRedux />, 
  document.getElementById("Main")
);
