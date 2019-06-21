import SDK from '../lib/sdk';
import { WSSend } from '..';

const {
  ChatSendMessageReq, ChatGetChatsReq, ChatCreateReq, ChatAddMemberReq,
  ChatSyncChatMessagesReq,
} = SDK.kproto;

export async function SyncChatMessage(options: SDK.kproto.IChatSyncChatMessagesReq) {
  const res = await WSSend(ChatSyncChatMessagesReq, 'ChatSyncChatMessagesReq', options);
  return res;
}

export async function CreateChat(options: SDK.kproto.IChatCreateReq) {
  const res = await WSSend(ChatCreateReq, 'ChatCreateReq', options);
  return res;
}

export async function AddMemberToChat(options: SDK.kproto.IChatAddMemberReq) {
  const res = await WSSend(ChatAddMemberReq, 'ChatAddMemberReq', options);
  return res;
}

export async function GetChatList() {
  const res = await WSSend(ChatGetChatsReq, 'ChatGetChatsReq', {});
  return res;
}

export async function SendMsg(msgData: SDK.kproto.IChatSendMessageReq) {
  const res = await WSSend(ChatSendMessageReq, 'ChatSendMessageReq', msgData);
  return res;
}
