import { combineReducers } from "redux";

import {
  authState, userInfo
} from './auth-state';

import {
  chatListData, chatContentData, activeChat
} from './chat-state';

const chatReducers = combineReducers({
  activeChat,
  chatListData,
  chatContentData,
  authState,
  userInfo,
});

export default chatReducers;
