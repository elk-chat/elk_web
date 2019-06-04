import { combineReducers } from "redux";
import * as ChatSDK from '@little-chat/sdk/lib';

import {
  SELECT_CHAT,
} from "../actions";
import {
  ChatActions
} from '../types';
import {
  authState, userInfo
} from './auth-state';

import { FakeChatList } from './fake-data';

interface ChatEntity extends ChatSDK.kproto.IChat {

}

export function chatListData(
  state: ChatEntity[] = FakeChatList,
  action: ChatActions,
) {
  switch (action.type) {
    case SELECT_CHAT:
      return state;
    default:
      return state;
  }
}

const chatReducers = combineReducers({
  chatListData,
  authState,
  userInfo,
});

export default chatReducers;
