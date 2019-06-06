import { combineReducers } from "redux";

import {
  authState, userInfo
} from './auth-state';

import {
  chatListData, chatContentData, selectedChat
} from './chat-state';
import {
  contactData, selectedContact
} from './contact-state';

const rootReducers = combineReducers({
  selectedContact,
  contactData,
  selectedChat,
  chatListData,
  chatContentData,
  authState,
  userInfo,
});

export default rootReducers;
