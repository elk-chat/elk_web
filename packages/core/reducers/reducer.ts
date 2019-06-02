import { combineReducers } from "redux";

import {
  SELECT_CHAT,
} from "../actions";
import {
  ChatActions
} from '../types';
import {
  authState, userInfo
} from './auth-state';

export function chats(
  state = {},
  action: ChatActions,
) {
  switch (action.type) {
    case SELECT_CHAT:

      break;
    default:
      return state;
  }
}

const chatReducers = combineReducers({
  chats,
  authState,
  userInfo,
});

export default chatReducers;
