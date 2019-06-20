/**
 * Actions 规则
 * 1. applyAction 请求发起异步请求的 action
 * 2. asyncAction 为 generator 函数，请参考 redux-saga
 *
 * @Author Alex
 */

import {
  put, takeLatest, call
} from 'redux-saga/effects';

import {
  SendMsg, GetChatList
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

export const APPLY_SEND_MSG = "APPLY_SEND_MSG";
export function applySendMsg(msg) {
  return {
    type: APPLY_SEND_MSG,
    msg
  };
}

export const APPLY_FETCH_CHAT_LIST = 'APPLY_FETCH_CHAT_LIST';
export function applyFetchChatList() {
  return {
    type: APPLY_FETCH_CHAT_LIST,
  };
}

export const SENDING_MSG = "SENDING_MSG";
export const SENT_MSG = "SENT_MSG";
export const SEND_MSG_FAIL = "SEND_MSG_FAIL";
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

export const FETCHING_CHAT_LIST = 'FETCHING_CHAT_LIST';
export const RECEIVE_CHAT_LIST = 'RECEIVE_CHAT_LIST';
export function* getChatList() {
  yield put({ type: FETCHING_CHAT_LIST });
  try {
    const chatList = yield call(GetChatList);
    yield put({ type: RECEIVE_CHAT_LIST, chatList });
  } catch (res) {
    console.log(res);
  }
}

export function* watchChatActions() {
  yield takeLatest(APPLY_SEND_MSG, sendMsgReq);
  yield takeLatest(APPLY_FETCH_CHAT_LIST, getChatList);
}
