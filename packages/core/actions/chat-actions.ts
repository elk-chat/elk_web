/* eslint-disable max-len */
/**
 * Actions 规则
 * 1. applyAction 请求发起异步请求的 action
 * 2. asyncAction 为 generator 函数，请参考 redux-saga
 *
 * @Author Alex
 */

import {
  EventEmitter, Call
} from 'basic-helper';
import {
  put, takeLatest, call, takeEvery
} from 'redux-saga/effects';

import {
  SendMsg, GetChatList, CreateChat, AddMemberToChat,
  SyncChatMessage, GetChatsLastUnreadState,
  MsgStateAck, GetChatMembers,
  QueryChatMsgsByCondition
} from "@little-chat/sdk";
import { FEMessageType } from '@little-chat/core/types';
import SDK from "@little-chat/sdk/lib/sdk";
import getLastItem from '@little-chat/utils/get-last-item';

import array2obj from '@little-chat/utils/array2obj';
import { authStore } from './auth-action';
// import { getStore } from '../store';

import {
  ChatActions, ChatItemEntity, ChatType
} from '../types';

// export const SELECT_CHAT = "SELECT_CHAT";
// export function selectChat(chatID) {
//   const chatEntity = getStore().getState().chatListData.obj[chatID] || {
//     ChatID: -1
//   };
//   return {
//     chatEntity,
//     type: SELECT_CHAT,
//   };
// }

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
export function applySyncChatMessage(payload: SDK.kproto.IChatSyncChatStatesReq) {
  return {
    type: APPLY_SYNC_CHAT_MESSAGE,
    payload
  };
}

// export const APPLY_SYNC_CHAT_MESSAGES = 'APPLY_SYNC_CHAT_MESSAGES';
// export function applySyncChatMessages(payload: {
//   ChatIDs: []; Limit: number;
// }) {
//   return {
//     type: APPLY_SYNC_CHAT_MESSAGES,
//     payload
//   };
// }

export const RECEIVE_CHAT_MESSAGE = "RECEIVE_CHAT_MESSAGE";
export function receiveChatMessage(chatContent, chatID, countUnread?: boolean) {
  EventEmitter.emit(RECEIVE_CHAT_MESSAGE, {
    chatContent, chatID, countUnread
  });

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
    lastMsg,
    chatID,
    chatContent,
    countUnread,
    type: RECEIVE_CHAT_MESSAGE,
  };
}

export const RECEIVE_CHAT_MESSAGES = "RECEIVE_CHAT_MESSAGES";
export function receiveChatMessages(chatContents) {
  return {
    chatContents,
    type: RECEIVE_CHAT_MESSAGES,
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
 * 同步 Chat 的聊天数据
 */
export function* syncChatMessage(action: {
  payload: SDK.kproto.IChatSyncChatStatesReq;
}) {
  const { payload } = action;
  yield put({ type: SYNCING_CHAT_MESSAGE });
  try {
    const { StateUpdates } = yield call(SyncChatMessage, payload);
    yield put(receiveChatMessage(StateUpdates, payload.ChatID, false));
  } catch (e) {
    console.log(e);
  }
}

// export const SYNCING_CHAT_MESSAGES = 'SYNCING_CHAT_MESSAGES';
// export function* syncChatMessages(payload) {
//   yield put({ type: SYNCING_CHAT_MESSAGES });
//   try {
//     const msgsData = yield call(SyncChatMessages, payload);
//     yield put(receiveChatMessages(msgsData));
//   } catch (e) {
//     console.log(e);
//   }
// }

function getUserID() {
  const { userInfo } = authStore.getState();
  const currUserID = userInfo.UserID.toString();
  return currUserID;
}

export const FETCHING_CHAT_LIST = 'FETCHING_CHAT_LIST';
export const RECEIVE_CHAT_LIST = 'RECEIVE_CHAT_LIST';
export const RECEIVE_UNREAD_DATA = 'RECEIVE_UNREAD_DATA';
// export function* getChatMembers(Chats) {

// }
/**
 * 初始化 Chat 的所需要的内容
 *
 * 1. 获取 Chat 列表
 * 2. 根据获取的 Chat 的 ChatID 获取 Chat 的成员信息
 * 3. 获取 Chat List 每一项的最后一条消息
 * 4. 获取 Chat List 每一项的已读状态，与 3 获取的最后一条数据做对比，初始化未读数
 */
export function* getChatList(callback) {
  yield put({ type: FETCHING_CHAT_LIST });
  try {
    // 1. 获取 Chat 列表
    const { Chats } = yield call(GetChatList);
    yield put({ type: RECEIVE_CHAT_LIST, chatList: Chats });

    // 2. 根据获取的 Chat 的 ChatID 获取 Chat 的成员信息

    /** 存储并发请求的队列 */
    const getDataConcurrentList: any[] = [];

    /** 当前登陆用户的 ID */
    const currUserID = getUserID();
    const nextChats = [...Chats];

    /** 存储所有的 ChatID */
    const chatIDs: any[] = [];

    /** 最后一条聊天数据 */
    const lastChatDataGroup = {};

    /** 最后未读消息 */
    const lastUnreadDataGroup = {};

    Chats.forEach((chat, idx) => {
      switch (chat.ChatType) {
        case ChatType.Contact:
        case ChatType.Follower:
          return;
      }
      const { ChatID } = chat;
      const chatIDStr = ChatID.toString();
      chatIDs.push(ChatID);
      const isOneByOneChat = chat.ChatType === ChatType.OneToOne;
      const func = (resolve, reject) => {
        GetChatMembers({
          ChatID,
        }, isOneByOneChat ? currUserID : undefined)
          .then((usersData) => {
            if (isOneByOneChat) {
              const currUser = usersData[0];
              /** 如果是一对一聊天, 则把对方的用户名赋予该 Chat 的 Title */
              if (currUser) nextChats[idx].Title = currUser.UserName;
            }
            nextChats[idx].Users = usersData;
            nextChats[idx].UsersRef = array2obj(usersData, 'UserName');
            // 3. 获取 Chat List 每一项的最后一条消息
            QueryChatMsgsByCondition({
              Paging: {
                PageSize: 1,
                PageIndex: 0
              },
              Condition: {
                ChatID,
                MessageTypes: [FEMessageType.SendMessage, FEMessageType.AddMember]
              }
            })
              .then(({ StateUpdates }) => {
                lastChatDataGroup[chatIDStr] = getLastItem(StateUpdates) || {};
                // 4. 获取 Chat List 每一项的已读状态，与 3 获取的最后一条数据做对比，初始化未读数
                GetChatsLastUnreadState({
                  ChatID,
                })
                  .then(({ SuperscriptNumber }) => {
                    lastUnreadDataGroup[chatIDStr] = +SuperscriptNumber.toString();
                    resolve(nextChats[idx]);
                  });
              });
          })
          .catch((e) => {
            reject(e);
          });
      };
      getDataConcurrentList.push(new Promise<SDK.kproto.IChatGetMembersResp>(func));
    });

    yield Promise.all(getDataConcurrentList);
    yield put({ type: RECEIVE_CHAT_LIST, chatList: nextChats });
    yield put(receiveChatMessages(lastChatDataGroup));
    EventEmitter.emit(RECEIVE_UNREAD_DATA, lastUnreadDataGroup);
    // return {
    //   nextChats, chatIDs
    // };

    // 2. 根据返回的 Chat 的 ChatID 并发获取 Chat 的成员信息
    // const { chatIDs } = yield getChatMembers(Chats);

    // 3. 获取已获取的 Chat 的最后一条消息
    // yield syncChatMessages({
    //   ChatIDs: chatIDs,
    //   Limit: 1
    // });
    Call(callback);
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

export function* watchChatActions() {
  yield takeLatest(APPLY_SEND_MSG, sendMsgReq);
  yield takeLatest(APPLY_FETCH_CHAT_LIST, getChatList);
  yield takeLatest(APPLY_ADD_CHAT, addChat);
  // yield takeLatest(APPLY_SYNC_CHAT_MESSAGES, syncChatMessages);
  yield takeEvery(APPLY_SYNC_CHAT_MESSAGE, syncChatMessage);
}
