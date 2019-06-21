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
  SendMsg, GetChatList, CreateChat, AddMemberToChat,
  SyncChatMessage
} from "@little-chat/sdk";

import SDK from "@little-chat/sdk/lib/sdk";

import {
  ChatActions, ChatItemEntity
} from '../types';

export const SELECT_CHAT = "SELECT_CHAT";
export function selectChat(chatEntity: ChatItemEntity) {
  return {
    chatEntity,
    type: SELECT_CHAT,
  };
}

export const FETCH_CHATS = "FETCH_CHATS";
export function fetchChats() {

}

export const APPLY_SEND_MSG = "APPLY_SEND_MSG";
export function applySendMsg(payload: SDK.kproto.IChatSendMessageReq) {
  return {
    type: APPLY_SEND_MSG,
    payload
  };
}

export const APPLY_FETCH_CHAT_LIST = 'APPLY_FETCH_CHAT_LIST';
export function applyFetchChatList() {
  return {
    type: APPLY_FETCH_CHAT_LIST,
  };
}

export const APPLY_ADD_CHAT = 'APPLY_ADD_CHAT';
export function applyAddChat(payload: SDK.kproto.IChatCreateReq) {
  return {
    type: APPLY_ADD_CHAT,
    payload
  };
}

export const APPLY_SYNC_CHAT_MESSAGE = 'APPLY_SYNC_CHAT_MESSAGE';
export function applySyncChatMessage(payload: SDK.kproto.IChatSyncChatMessagesReq) {
  return {
    type: APPLY_SYNC_CHAT_MESSAGE,
    payload
  };
}

export const SENDING_MSG = "SENDING_MSG";
export const SENT_MSG = "SENT_MSG";
export const SEND_MSG_FAIL = "SEND_MSG_FAIL";
/**
 * 发送消息
 */
export function* sendMsgReq(action) {
  // console.log(action)
  const { payload } = action;
  yield put({ type: SENDING_MSG });
  try {
    yield call(SendMsg, payload);
    yield put({ type: SENT_MSG, sentMsg: payload });
  } catch (e) {
    console.log(e);
  }
}

export const SYNCING_CHAT_MESSAGE = "SYNCING_CHAT_MESSAGE";
export const RECEIVE_CHAT_MESSAGE = "RECEIVE_CHAT_MESSAGE";
export const SYNC_CHAT_MESSAGE_FAIL = "SYNC_CHAT_MESSAGE_FAIL";
/**
 * 同步 Chat 的通讯内容
 */
export function* syncChatMessage(action) {
  const { payload } = action;
  yield put({ type: SYNCING_CHAT_MESSAGE });
  try {
    const { StateUpdates } = yield call(SyncChatMessage, payload);
    yield put({
      type: RECEIVE_CHAT_MESSAGE,
      chatContent: StateUpdates,
      chatID: payload.ChatID
    });
  } catch (e) {
    console.log(e);
  }
}

export const FETCHING_CHAT_LIST = 'FETCHING_CHAT_LIST';
export const RECEIVE_CHAT_LIST = 'RECEIVE_CHAT_LIST';
/**
 * 获取 Chat 列表
 */
export function* getChatList() {
  yield put({ type: FETCHING_CHAT_LIST });
  try {
    const { Chats } = yield call(GetChatList);
    yield put({ type: RECEIVE_CHAT_LIST, chatList: Chats });
  } catch (res) {
    console.log(res);
  }
}

export const ADDING_CHAT = 'ADDING_CHAT';
export const ADDED_CHAT = 'ADDED_CHAT';
/**
 * 添加 Chat
 * 1. 创建 Chat，获取 ChatID
 * 2. 往该 Chat 添加成员
 */
export function* addChat(action) {
  yield put({ type: ADDING_CHAT });
  try {
    const { UserID, Title } = action.payload;
    const createRes = yield call(CreateChat, {
      Title
    });
    const addMemberRes = yield call(AddMemberToChat, {
      ChatID: createRes.Chat.ID,
      UserID
    });
    yield put({ type: ADDED_CHAT, addMemberRes });
  } catch (res) {
    console.log(res);
  }
}

export function* watchChatActions() {
  yield takeLatest(APPLY_SEND_MSG, sendMsgReq);
  yield takeLatest(APPLY_FETCH_CHAT_LIST, getChatList);
  yield takeLatest(APPLY_ADD_CHAT, addChat);
  yield takeLatest(APPLY_SYNC_CHAT_MESSAGE, syncChatMessage);
}
