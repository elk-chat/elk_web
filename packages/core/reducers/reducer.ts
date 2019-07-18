import { combineReducers } from "redux";

// import {
//   authState, userInfo
// } from './auth-state';

import {
  chatListData, chatContentData, selectedChat,
  unreadInfo, lastMsgInfo
} from './chat-state';
import {
  contactData, selectedContact
} from './contact-state';

const rootReducers = combineReducers({
  lastMsgInfo,
  selectedContact,
  contactData,
  selectedChat,
  unreadInfo,
  chatListData,
  chatContentData,
  // authState,
  // userInfo,
});

export default rootReducers;
