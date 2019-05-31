import { combineReducers } from "redux";

import {
  SELECT_CHAT,
} from "../actions";
import {
  ChatActions
} from '../types';

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
});

export default chatReducers;
