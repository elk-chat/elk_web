import { combineReducers } from "redux";

import {
  SELECT_CHAT,
} from "../actions";

export function chats(
  state = {},
  action,
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
