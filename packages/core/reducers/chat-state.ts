// import { HasValue } from 'basic-helper';
import array2obj from '@little-chat/utils/array2obj';
import getLastItem from '@little-chat/utils/get-last-item';
import {
  SELECT_CHAT, RECEIVE_CHAT_LIST, RECEIVE_CHAT_MESSAGE,
  RECEIVE_CHAT_MESSAGES,
  READ_MSG
} from "../actions";
import {
  ChatActions, ChatContentState, ChatContentItem, UnreadState,
  ChatItemEntity, ChatListEntity, ActionType, LastMsgInfo
} from '../types';
// import { FakeChatList, getFakeChatContent } from './fake-data';
import { getStorage, setStorage } from '../lib/storage';
import mergeChatContent from '../lib/merge-chat-content';
import merge from '../lib/merge';

/**
 * 记录 ChatList 数据
 */
export function chatListData(
  state: ChatListEntity = getStorage('chatListData') || {
    array: [],
    obj: {}
  },
  action: ChatActions,
) {
  let nextState;
  switch (action.type) {
    case RECEIVE_CHAT_LIST:
      const mergeKey = 'ChatID';
      const chatList = merge(state.array, action.chatList, mergeKey);
      // const nextChatList = chatList.sort((f, s) => s.UpdatedAt - f.UpdatedAt);
      nextState = {
        array: chatList,
        obj: array2obj(chatList, mergeKey)
      };
      setStorage('chatListData', nextState);
      return nextState;
    default:
      return state;
  }
}

/**
 * 记录所有 ChatContent 数据
 */
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

/**
 * 未读消息 state
 */
export function lastMsgInfo(
  state: LastMsgInfo = getStorage('lastMsgInfo') || {},
  action,
) {
  let nextState;
  switch (action.type) {
    case RECEIVE_CHAT_MESSAGES:
      const { chatContents } = action;
      nextState = chatContents;
      setStorage('lastMsgInfo', nextState);
      return nextState;
    case RECEIVE_CHAT_MESSAGE:
      const { chatContent, chatID } = action;
      nextState = Object.assign({}, state);
      const lastItem = getLastItem(chatContent);
      if (lastItem) nextState[chatID] = [lastItem];
      setStorage('lastMsgInfo', nextState);
      return nextState;
    default:
      return state;
  }
}

/**
 * 未读消息 state
 */
export function unreadInfo(
  state: UnreadState = {},
  action,
) {
  let nextState;
  switch (action.type) {
    case RECEIVE_CHAT_MESSAGE:
      const { chatContent, chatID, countUnread } = action;
      const chatIDStr = chatID.toString();
      nextState = Object.assign({}, state);
      if (countUnread) nextState[chatIDStr] = (+nextState[chatIDStr] || 0) + chatContent.length;
      return nextState;
    case SELECT_CHAT:
      const { chatEntity } = action;
      nextState = Object.assign({}, state);
      nextState[chatEntity.ChatID.toString()] = 0;
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
