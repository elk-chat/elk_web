import * as ChatSDK from '@little-chat/sdk/lib';

export enum MsgType {
  Text,
  Image,
  Link,
}

export interface AuthState {
  isLogin: boolean;
  logging: boolean;
  msg: string;
}

export interface UserInfo {
  UserName: string;
}

// Chat

export interface ChatItemEntity extends ChatSDK.kproto.IChat {
  /** Chat ID */
  ContactID?: number;
  ID?: (number|Long);
  FromUser: string;
  LastMsg: string;
}

export interface ChatListEntity {
  [ChatID: string]: ChatItemEntity;
}

export interface ChatContentState {
  [chatName: string]: {
    [chatID: string]: {
      ID: number;
      Message: string;
      FromUser: string;
      SendTime: number;
      UpdatedAt: number;
      MsgType: MsgType;
    };
  };
}

export interface ContactList {
  [ContactID: string]: ContactEntity;
}

export interface ContactEntity {
  ID: number;
  ChatID: number;
  UserName: string;
  Avatar?: string;
}
