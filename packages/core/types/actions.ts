import { ChatItemEntity } from './state';

export interface ChatActions {
  type: string;
  chatEntity: ChatItemEntity;
}

export interface ActionType {
  type: string;
}

export interface LoginAction {
  type: string;
  userInfo: object;
}
