import React from "react";
import ReactDOM from "react-dom";

import ChatApp from '@little-chat/ui';
import { InitSDK } from '@little-chat/sdk';
import config from './.config';

InitSDK(config);

ReactDOM.render(
  <ChatApp />,
  document.getElementById("Main")
);
