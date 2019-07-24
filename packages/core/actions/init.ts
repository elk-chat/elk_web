import {
  EventEmitter
} from 'basic-helper';
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
  receiveChatMessage, getChatList, applyFetchChatList
} from './chat-actions';
import { fetchContacts } from './contact-actions';

export const INIT_CHAT = "INIT_CHAT";
export function initChat(dispatch, callback) {
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
        // dispatch(receiveChatMessage([nextState], nextState.ChatID, false));
        break;
      case FEMessageType.SendMessage:
        mark = 'UpdateMessageChatSendMessage';
        break;
    }
    if (mark) {
      /** 如果发送者是自己，则不需要计入 unread count */
      // const { userInfo } = authStore.getState();
      // const { selectedChat, chatContentData } = getChatStore().getState();
      // const selectedChatID = selectedChat.ChatID;
      // const currStateChatID = nextState.ChatID;
      // const myName = userInfo.UserName;
      // const isInChating = !!selectedChatID || (currStateChatID.toString() === (selectedChatID || '').toString());
      // const isMyMsg = nextState.UpdateMessage[mark].SenderName === myName;
      // const currChatContent = chatContentData[currStateChatID] || {};
      // if (!currChatContent.lastState) {
      //   dispatch(applyFetchChatList());
      // }
      dispatch(receiveChatMessage([nextState], nextState.ChatID));
    }
  }
  yield EventEmitter.on(RECEIVE_STATE_UPDATE, handleStateUpdate);
}

export const SYNC_CONTACTS_AND_CHATS = "SYNC_CONTACTS_AND_CHATS";
export function syncContactsAndChats(callback) {
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
