export interface ChatActions {
  type: string;
  chatID: string;
}

export const SELECT_CHAT = "SELECT_CHAT";
export function selectChat(chatID: string): ChatActions {
  return {
    chatID,
    type: SELECT_CHAT,
  };
}

export const FETCH_CHATS = "FETCH_CHATS";
export function fetch_chats() {

}
