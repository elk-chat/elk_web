import React from "react";
import ReactDOM from "react-dom";

import ChatApp from '@little-chat/ui';
import { InitSDK } from '@little-chat/sdk';
import config from './.config';

InitSDK(config)
  .then(() => {
    ReactDOM.render(
      <ChatApp ClientConfig={config} />,
      document.getElementById("Main")
    );
  });
