import { ChatItemEntity, ContactEntity } from './state';

export interface LoginAction {
  type: string;
  userInfo: object;
}

export interface ActionType {
  type: string;
}

export interface ChatActions {
  type: string;
  chatEntity: ChatItemEntity;
}

export interface ContactActions {
  type: string;
  conctactEntity: ContactEntity;
}
