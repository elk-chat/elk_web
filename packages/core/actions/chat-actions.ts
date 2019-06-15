import {
  put, takeLatest, call, delay
} from 'redux-saga/effects';

import {
  ChatActions, ChatItemEntity
} from '../types';

export const SELECT_CHAT = "SELECT_CHAT";
export function selectChat(chatEntity: ChatItemEntity): ChatActions {
  return {
    chatEntity,
    type: SELECT_CHAT,
  };
}

export const FETCH_CHATS = "FETCH_CHATS";
export function fetchChats() {

}

export const SEND_MSG = "SEND_MSG";
export const SENDING_MSG = "SENDING_MSG";
export const SENT_MSG = "SENT_MSG";
export const SEND_MSG_FAIL = "SEND_MSG_FAIL";
export function* sendMsg(msg) {
  yield put({ type: SENDING_MSG });
}

export function* watchChatActions() {
  yield takeLatest(SEND_MSG, sendMsg);
}
