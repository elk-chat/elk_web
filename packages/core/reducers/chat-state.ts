// import { HasValue } from 'basic-helper';
import array2obj from '@little-chat/utils/array2obj';
import getLastItem from '@little-chat/utils/get-last-item';
import {
  RECEIVE_CHAT_LIST, RECEIVE_CHAT_MESSAGE,
  RECEIVE_CHAT_MESSAGES,
} from "../actions";
import {
  ChatActions, ChatListEntity, LastMsgInfo, FEMessageType
} from '../types';
import { getStorage, setStorage } from '../lib/storage';
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
      if (lastItem && lastItem.MessageType === FEMessageType.SendMessage) {
        nextState[chatID] = lastItem;
      }
      setStorage('lastMsgInfo', nextState);
      return nextState;
    default:
      return state;
  }
}
