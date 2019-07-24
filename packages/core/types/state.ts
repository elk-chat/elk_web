import * as ChatSDK from '@little-chat/sdk/lib';

export enum FEContentType {
  Other = 0,
  Text = 1,
  Image = 2,
  Audio = 3,
  Video = 4,
  Geo = 5,
}

export enum FEMessageType {
  SendMessage = 1,
  AddMember = 2,
  ReadState = 3,
}

export enum ChatType {
  Group = 1,
  OneToOne = 2,
  Contact = 3,
  Follower = 4,
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
  ChatID?: Long;
  FromUser: string;
  LastMsg: string;
}

export interface ChatListEntity {
  array: ChatItemEntity[];
  obj: {
    [ChatID: string]: ChatItemEntity;
  };
}

export interface ChatContentItem extends ChatSDK.kproto.IStateUpdate {}

export interface ChatContentStateInfo {
  lastState: number;
  lastData: ChatContentItem;
  data: ChatContentItem[];
}

export interface ChatContentState {
  [chatID: string]: ChatContentStateInfo;
}

export interface UnreadState {
  [chatID: string]: number;
}

export interface LastMsgInfo {
  [chatID: string]: ChatContentItem;
}

export interface ContactList {
  [ContactID: string]: ContactEntity;
}

export interface ContactEntity {
  UserID: Long;
  ChatID: Long;
  UserName: string;
  Avatar?: string;
}

export interface ContactState {
  array: ContactEntity[];
  obj: {
    [ContactID: string]: ContactEntity;
  };
}
