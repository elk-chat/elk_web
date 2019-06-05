import {

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
