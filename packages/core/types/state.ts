import * as ChatSDK from '@little-chat/sdk/lib';

export enum ContentType {
  Other = 0,
  Text = 1,
  Image = 2,
  Audio = 3,
  Video = 4,
  Geo = 5,
}

export enum MessageType {
  AddMember = 2,
  SendMessage = 1,
}

export interface AuthState {
  isLogin: boolean;
  loginFail: boolean;
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

export interface ChatContentItem extends ChatSDK.kproto.IStateUpdate {}

export interface ChatContentStateInfo {
  lastState: number;
  data: ChatContentItem[];
}

export interface ChatContentState {
  [chatID: string]: ChatContentStateInfo;
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
