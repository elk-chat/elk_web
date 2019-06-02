export interface ChatActions {
  type: string;
  chatID: string;
}

export interface ActionType {
  type: string;
}

export interface LoginAction {
  type: string;
  userInfo: object;
}
