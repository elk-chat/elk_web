import {
  SELECT_CHAT,
} from "../actions";
import {
  ChatActions, ChatContentState, ChatItemEntity
} from '../types';
import { FakeChatList, FakeChatContent } from './fake-data';

export function chatListData(
  state: ChatItemEntity[] = FakeChatList,
  action: ChatActions,
) {
  switch (action.type) {
    case SELECT_CHAT:
      return state;
    default:
      return state;
  }
}

export function chatContentData(
  state: ChatContentState = {},
  action: ChatActions,
) {
  switch (action.type) {
    case SELECT_CHAT:
      return {
        ...state,
        [action.chatEntity.ID]: FakeChatContent
      };
    default:
      return state;
  }
}

export function activeChat(
  state: ChatItemEntity = {},
  action: ChatActions,
) {
  switch (action.type) {
    case SELECT_CHAT:
      return { ...action.chatEntity };
    default:
      return state;
  }
}
