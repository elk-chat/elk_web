// import sortedIndexBy from 'lodash/sortedIndexBy';
import {
  SELECT_CHAT, RECEIVE_CHAT_LIST, RECEIVE_CHAT_MESSAGE, SENT_MSG
} from "../actions";
import {
  ChatActions, ChatContentState, ChatContentItem,
  ChatItemEntity, ChatListEntity, ActionType
} from '../types';
// import { FakeChatList, getFakeChatContent } from './fake-data';
import array2obj from '../lib/array2obj';
import mergeChatContent from '../lib/merge-chat-content';

export function chatListData(
  state: ChatItemEntity[] = [],
  action: ChatActions,
) {
  switch (action.type) {
    default:
      return state;
    case RECEIVE_CHAT_LIST:
      const sortedChatList = [...action.chatList].sort((f, s) => s.UpdatedAt - f.UpdatedAt);
      return sortedChatList;
  }
}

export function chatListObjData(
  state: ChatListEntity = {},
  action,
) {
  switch (action.type) {
    default:
      return state;
    case RECEIVE_CHAT_LIST:
      return array2obj(action.chatList, 'ID');
  }
}

export function chatContentData(
  state: ChatContentState = {},
  action,
) {
  let nextState;
  switch (action.type) {
    case SELECT_CHAT:
      const { ID = '' } = action.chatEntity;
      nextState = Object.assign({}, state);
      if (!nextState[ID.toString()]) {
        nextState[ID.toString()] = {
          data: [],
          lastState: 0
        };
      }
      return nextState;
    case RECEIVE_CHAT_MESSAGE:
      nextState = Object.assign({}, state);
      const { chatContent, chatID } = action;
      const currChatContent = state[chatID].data;
      const nextContent = mergeChatContent(currChatContent, chatContent);
      nextState[chatID].data = nextContent;
      nextState[chatID].lastState = nextContent[nextContent.length - 1].State;
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
