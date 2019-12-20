import {
  EventEmitter
} from '@mini-code/base-func';
import {
  put, takeLatest, call
} from 'redux-saga/effects';
import {
  RECEIVE_STATE_UPDATE
} from "@little-chat/sdk";
import { authStore } from './auth-action';
import { FEMessageType } from '../types';
import { getStore as getChatStore } from '../store';
import {
  receiveChatMessage, getChatList, applyFetchChatList, ON_READ_CHAT_MESSAGE
} from './chat-actions';
import { fetchContacts } from './contact-actions';

export const INIT_CHAT = "INIT_CHAT";
export function initChat(dispatch, callback?) {
  return {
    type: INIT_CHAT,
    dispatch,
    callback
  };
}

/**
 * 注册推送事件
 */
function* watchBoard({ dispatch }) {
  function handleStateUpdate(nextState) {
    let mark;
    switch (nextState.MessageType) {
      case FEMessageType.AddMember:
        mark = 'UpdateMessageChatAddMember';
        break;
      case FEMessageType.SendMessage:
        mark = 'UpdateMessageChatSendMessage';
        break;
      case FEMessageType.DeletedMemeber:
        mark = 'UpdateMessageChatDeletedMember';
        break;
      case FEMessageType.ReadState:
        // mark = 'UpdateMessageChatReadMessage';
        EventEmitter.emit(ON_READ_CHAT_MESSAGE, nextState);
        break;
    }
    if (mark) {
      dispatch(receiveChatMessage([nextState], nextState.ChatID));
    }
  }
  yield EventEmitter.on(RECEIVE_STATE_UPDATE, handleStateUpdate);
}

export const SYNC_CONTACTS_AND_CHATS = "SYNC_CONTACTS_AND_CHATS";
export function syncContactsAndChats(callback?) {
  return {
    type: SYNC_CONTACTS_AND_CHATS,
    callback
  };
}

function* getInitChatData({ callback }) {
  yield fetchContacts();
  yield getChatList(callback);
}

export function* watchInitActions() {
  yield takeLatest(INIT_CHAT, watchBoard);
  yield takeLatest(SYNC_CONTACTS_AND_CHATS, getInitChatData);
}
