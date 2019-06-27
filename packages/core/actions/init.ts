import {
  EventEmitter
} from 'basic-helper';
import {
  put, takeLatest, call
} from 'redux-saga/effects';
import {
  RECEIVE_STATE_UPDATE
} from "@little-chat/sdk";
import { getStore } from '../store';
import {
  MessageType
} from '../types';

import { receiveChatMessage, getChatList } from './chat-actions';
import { fetchContacts } from './contact-actions';

export const INIT = "INIT";
export function init(dispatch) {
  return {
    type: INIT,
    dispatch,
  };
}

/**
 * 注册推送事件
 */
function* initSaga({ dispatch }) {
  function handleStateUpdate(nextState) {
    switch (nextState.MessageType) {
      case MessageType.AddMember:

        break;
      case MessageType.SendMessage:
        /** 如果发送者是自己，则不需要计入 unread count */
        const { userInfo } = getStore().getState();
        const myName = userInfo.UserName;
        const isMyMsg = nextState.UpdateMessage.UpdateMessageChatSendMessage.SenderName === myName;
        dispatch(receiveChatMessage([nextState], nextState.ChatID, !isMyMsg));
        break;
    }
  }
  yield EventEmitter.on(RECEIVE_STATE_UPDATE, handleStateUpdate);
}

export const SYNC_CONTACTS_AND_CHATS = "SYNC_CONTACTS_AND_CHATS";
export function syncContactsAndChats() {
  return {
    type: SYNC_CONTACTS_AND_CHATS
  };
}

function* getInitChatData() {
  yield fetchContacts();
  yield getChatList();
}

export function* watchInitActions() {
  yield takeLatest(INIT, initSaga);
  yield takeLatest(SYNC_CONTACTS_AND_CHATS, getInitChatData);
}
