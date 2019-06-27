// import { HasValue } from 'basic-helper';
import {
  SELECT_CHAT, RECEIVE_CHAT_LIST, RECEIVE_CHAT_MESSAGE, READ_MSG
} from "../actions";
import {
  ChatActions, ChatContentState, ChatContentItem, UnreadState,
  ChatItemEntity, ChatListEntity, ActionType
} from '../types';
// import { FakeChatList, getFakeChatContent } from './fake-data';
import array2obj from '../lib/array2obj';
import mergeChatContent from '../lib/merge-chat-content';

export function chatListData(
  state: ChatListEntity = {
    array: [],
    obj: {}
  },
  action: ChatActions,
) {
  let nextState;
  switch (action.type) {
    case RECEIVE_CHAT_LIST:
      const nextChatList = [...action.chatList].sort((f, s) => s.UpdatedAt - f.UpdatedAt);
      nextState = {
        array: nextChatList,
        obj: array2obj(nextChatList, 'ChatID')
      };
      return nextState;
    default:
      return state;
  }
}

export function chatContentData(
  state: ChatContentState = {},
  action,
) {
  let nextState;
  switch (action.type) {
    case SELECT_CHAT:
      const { ChatID = '' } = action.chatEntity;
      nextState = Object.assign({}, state);
      if (!nextState[ChatID.toString()]) {
        nextState[ChatID.toString()] = {
          data: [],
          lastState: 0,
          lastData: {},
        };
      }
      return nextState;
    case RECEIVE_CHAT_MESSAGE:
      nextState = Object.assign({}, state);
      const { chatContent, chatID } = action;
      if (!nextState[chatID]) nextState[chatID] = {};
      const currChatContent = nextState[chatID].data;
      const nextContent = mergeChatContent(currChatContent, chatContent);
      const lastData = nextContent[nextContent.length - 1] || {};
      nextState[chatID] = {
        data: nextContent,
        lastState: lastData.State,
        lastData,
      };
      return nextState;
    default:
      return state;
  }
}

export function unreadInfo(
  state: UnreadState = {},
  action,
) {
  let nextState;
  switch (action.type) {
    case RECEIVE_CHAT_MESSAGE:
      const { chatContent, chatID, countUnread } = action;
      nextState = Object.assign({}, state);
      if (countUnread) nextState[chatID] = (+nextState[chatID] || 0) + chatContent.length;
      return nextState;
    case SELECT_CHAT:
      const { chatEntity } = action;
      nextState = Object.assign({}, state);
      nextState[chatEntity.ChatID] = 0;
      // nextState = Object.assign({}, state);
      // if (!countUnread) nextState[chatID] = (+nextState[chatID] || 0) + chatContent.length;
      return nextState;
    default:
      return state;
  }
}

export function selectedChat(
  state: ChatItemEntity = {},
  action,
) {
  switch (action.type) {
    case SELECT_CHAT:
      return action.chatEntity;
    default:
      return state;
  }
}
