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
      const { ID } = action.chatEntity;
      return {
        ...state,
        [ID]: FakeChatContent
      };
    default:
      return state;
  }
}

export function selectedChat(
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
