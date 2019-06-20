import Msg from '../lib/sdk';
import { WSSend } from '..';

const { ChatSendMessageReq, ChatGetChatsReq } = Msg.kproto;

export async function GetChatList() {
  const res = await WSSend(ChatGetChatsReq, {}, 'ChatGetChatsReq');
  return res;
}

export async function SendMsg(msgData: Msg.kproto.IChatSendMessageReq) {
  const res = await WSSend(ChatSendMessageReq, {
    ChatID: msgData.ChatID,
    Message: msgData.Message,
    MessageType: msgData.MessageType,
  }, 'ChatSendMessageReq');
  return res;
}
