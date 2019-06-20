import Msg from '../lib/sdk';
import { WSSend } from '..';

const { ChatSendMessageReq } = Msg.kproto;

export async function SendMsg(msgData: Msg.kproto.IChatSendMessageReq) {
  const res = await WSSend(ChatSendMessageReq, {
    ChatID: msgData.ChatID,
    Message: msgData.Message,
    MessageType: msgData.MessageType,
  }, 'ChatSendMessageReq');
  const result = {
    // UserName: msgData.UserName,
  };
  return result;
}
