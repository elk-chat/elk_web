import {

} from "@little-chat/sdk";

import {
  ChatActions
} from '../types';

export const SELECT_CHAT = "SELECT_CHAT";
export function selectChat(chatID: string): ChatActions {
  return {
    chatID,
    type: SELECT_CHAT,
  };
}

export const FETCH_CHATS = "FETCH_CHATS";
export function fetchChats() {

}
