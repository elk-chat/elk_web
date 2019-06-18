import {
  put, takeLatest, call, delay
} from 'redux-saga/effects';

import {
  SendMsg
} from "@little-chat/sdk";

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
export function sendMsg(msg) {
  return {
    type: 'SEND_MSG',
    msg
  };
}

export function* sendMsgReq(action) {
  // console.log(action)
  const { msg } = action;
  yield put({ type: SENDING_MSG });
  try {
    const sendRes = yield call(SendMsg, msg);
    console.log(sendRes);
    yield put({ type: SENT_MSG });
  } catch (e) {
    console.log(e);
  }
}

export function* watchChatActions() {
  yield takeLatest(SEND_MSG, sendMsgReq);
}
