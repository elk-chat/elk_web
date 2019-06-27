import SDK from '../lib/sdk';
import { WSSend } from '..';

const {
  ChatSendMessageReq, ChatGetChatsReq, ChatCreateReq, ChatAddMemberReq,
  ChatSyncChatStatesReq, StateAck, ChatReadMessageReq, ChatGetMembersReq
} = SDK.kproto;

/**
 * 同步聊天消息
 */
export async function SyncChatMessage(options: SDK.kproto.IChatSyncChatStatesReq) {
  const res = await WSSend(ChatSyncChatStatesReq, 'ChatSyncChatStatesReq', options);
  return res;
}

/**
 * 告知服务端已收到消息
 */
export async function MsgStateAck(options: SDK.kproto.IStateAck) {
  const res = await WSSend(StateAck, 'StateAck', options);
  return res;
}

/**
 * 告知服务端消息已读
 */
export async function ReadMsg(options: SDK.kproto.IChatReadMessageReq) {
  const res = await WSSend(ChatReadMessageReq, 'ChatReadMessageReq', options);
  return res;
}

/**
 * 创建聊天
 */
export async function CreateChat(options: SDK.kproto.IChatCreateReq) {
  const res = await WSSend(ChatCreateReq, 'ChatCreateReq', options);
  return res;
}

/**
 * 向对应的聊天添加人员
 */
export async function AddMemberToChat(options: SDK.kproto.IChatAddMemberReq) {
  const res = await WSSend(ChatAddMemberReq, 'ChatAddMemberReq', options);
  return res;
}

/**
 * 获取聊天列表
 */
export async function GetChatList() {
  const res = await WSSend(ChatGetChatsReq, 'ChatGetChatsReq', {});
  return res;
}

/**
 * 获取 Chat 中的联系人信息
 */
export async function GetChatMembers(options: SDK.kproto.IChatGetMembersReq) {
  const res = await WSSend(ChatGetMembersReq, 'ChatGetMembersReq', options);
  return res;
}

/**
 * 发送消息
 */
export async function SendMsg(msgData: SDK.kproto.IChatSendMessageReq) {
  const res = await WSSend(ChatSendMessageReq, 'ChatSendMessageReq', msgData);
  return res;
}
