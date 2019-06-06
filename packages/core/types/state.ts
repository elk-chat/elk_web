import * as ChatSDK from '@little-chat/sdk/lib';

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
  ID?: (number|Long|null);
}

export interface ChatContentState {
  [chatName: string]: {
    [chatID: string]: {
      ID: number;
      Message: string;
      FromUser: string;
      SendTime: number;
      UpdatedAt: number;
      MsgType: number;
    };
  };
}

export interface ContactEntity {
  ID?: number;
  ChatID?: number;
  UserName?: string;
  Avatar?: string;
}
