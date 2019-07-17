/**
 * Actions 规则
 * 1. applyAction 请求发起异步请求的 action
 * 2. asyncAction 为 generator 函数，请参考 redux-saga
 *
 * @Author Alex
 */

import {
  EventEmitter
} from 'basic-helper';
import {
  put, takeLatest, call
} from 'redux-saga/effects';

import {
  SendMsg, GetChatList, CreateChat, AddMemberToChat,
  SyncChatMessage, GetFullUser,
  MsgStateAck, ReadMsg, GetChatMembers
} from "@little-chat/sdk";

import SDK from "@little-chat/sdk/lib/sdk";
import array2obj from '@little-chat/utils/array2obj';

import { authStore } from './auth-action';

import {
  ChatActions, ChatItemEntity, MessageType, ChatType
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

export const READ_MSG = "READ_MSG";
export function readMsg(payload: SDK.kproto.IChatReadMessageReq) {
  return {
    type: READ_MSG,
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
export function applySyncChatMessage(payload: SDK.kproto.IChatSyncChatStatesReq) {
  return {
    type: APPLY_SYNC_CHAT_MESSAGE,
    payload
  };
}
export const RECEIVE_CHAT_MESSAGE = "RECEIVE_CHAT_MESSAGE";
export function receiveChatMessage(chatContent, chatID, countUnread: boolean) {
  EventEmitter.emit(RECEIVE_CHAT_MESSAGE, chatContent);

  /** 向服务端确认收到了消息 */
  const lastMsg = chatContent[chatContent.length - 1];
  if (lastMsg) {
    MsgStateAck({
      ChatID: chatID,
      MessageID: lastMsg.MessageID,
      State: lastMsg.State,
    });
  }
  return {
    chatID,
    chatContent,
    countUnread,
    type: RECEIVE_CHAT_MESSAGE,
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
  } catch (e) {
    console.log(e);
  }
}

export const SYNCING_CHAT_MESSAGE = "SYNCING_CHAT_MESSAGE";
export const SYNC_CHAT_MESSAGE_FAIL = "SYNC_CHAT_MESSAGE_FAIL";
/**
 * 同步 Chat 的通讯内容
 */
export function* syncChatMessage(action) {
  const { payload } = action;
  yield put({ type: SYNCING_CHAT_MESSAGE });
  try {
    const { StateUpdates } = yield call(SyncChatMessage, payload);
    yield put(receiveChatMessage(StateUpdates, payload.ChatID, false));
  } catch (e) {
    console.log(e);
  }
}

export const FETCHING_CHAT_LIST = 'FETCHING_CHAT_LIST';
export const RECEIVE_CHAT_LIST = 'RECEIVE_CHAT_LIST';
export function* getChatMembers(Chats) {
  const getMemberInfoList: SDK.kproto.IChatGetMembersResp[] = [];
  const currState = authStore.getState();
  const { contactData, userInfo } = currState;
  const myID = userInfo.UserID.toString();
  const nextChats = [...Chats];
  /** 这里主要为了查找 Chat 的 UserName */
  Chats.forEach((chat, idx) => {
    const { ChatID } = chat;
    const isOneByOneChat = chat.ChatType === ChatType.OneToOne;
    const func = (resolve: typeof Promise.resolve, reject: typeof Promise.reject) => {
      GetChatMembers({
        ChatID,
      }, isOneByOneChat ? myID : undefined)
        .then((usersData) => {
          if (isOneByOneChat) {
            const currUser = usersData[0];
            /** 如果是一对一聊天, 则把对方的用户名赋予该 Chat 的 Title */
            if (currUser) nextChats[idx].Title = currUser.UserName;
          }
          nextChats[idx].Users = usersData;
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    };
    getMemberInfoList.push(new Promise<SDK.kproto.IChatGetMembersResp>(func));
  });
  yield Promise.all(getMemberInfoList);

  yield put({ type: RECEIVE_CHAT_LIST, chatList: nextChats });
}
/**
 * 获取 Chat 列表
 */
export function* getChatList() {
  yield put({ type: FETCHING_CHAT_LIST });
  try {
    const { Chats } = yield call(GetChatList);
    yield put({ type: RECEIVE_CHAT_LIST, chatList: Chats });
    yield* getChatMembers(Chats);
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
      ChatID: createRes.Chat.ChatID,
      UserID
    });
    yield put({ type: ADDED_CHAT, addMemberRes });
  } catch (res) {
    console.log(res);
  }
}

export function* readMsgArk(action) {
  try {
    // yield call(ReadMsg, action.payload);
  } catch (e) {
    console.log(e);
  }
}

export function* watchChatActions() {
  yield takeLatest(APPLY_SEND_MSG, sendMsgReq);
  yield takeLatest(APPLY_FETCH_CHAT_LIST, getChatList);
  yield takeLatest(APPLY_ADD_CHAT, addChat);
  yield takeLatest(APPLY_SYNC_CHAT_MESSAGE, syncChatMessage);
  // yield takeLatest(READ_MSG, readMsgArk);
}
