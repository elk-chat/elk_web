// import React from "react";
// import createChatStore from '@little-chat/core/store';
// import { Provider } from 'react-redux';
import Long from 'long';
import protobuf from 'protobufjs';
import { hot } from 'react-hot-loader';

import ChatApp from './auth-connection';

protobuf.util.Long = Long;
protobuf.configure();

// export default hot(module)(ChatApp);
export default ChatApp;

// const chatStore = createChatStore({});

// const AppWithRedux = () => (
//   <Provider store={chatStore}>
//     <ChatApp dispatch={chatStore.dispatch} />
//   </Provider>
// );

// export default AppWithRedux;
