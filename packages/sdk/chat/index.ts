import Msg from '../lib/sdk';
import { encodeAgent } from '../lib/proto-agent';
import { WSSend } from '..';

const { ChatSendMessageReq } = Msg.kproto;

export function SendMsg(msgData: Msg.kproto.IChatSendMessageReq) {
  const bufData = encodeAgent(ChatSendMessageReq, {
    ChatID: msgData.ChatID,
    Message: msgData.Message,
    MessageType: msgData.MessageType,
  });
  WSSend(bufData);
  const result = {
    // UserName: msgData.UserName,
  };
  return result;
}
