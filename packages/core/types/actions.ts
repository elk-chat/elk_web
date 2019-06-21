import { ChatItemEntity, ContactEntity } from './state';

export interface LoginAction {
  type: string;
  userInfo: object;
}

export interface ActionType {
  type: string;
}

export interface ChatActions extends ActionType {
  chatList: ChatItemEntity[];
}

export interface ContactActions extends ActionType {
  conctactEntity: ContactEntity;
}

export interface AuthActions extends ActionType {
  failInfo?: string;
}
