import Msg from '../lib/sdk';

const { ChatSendMessageReq } = Msg.kproto;

export function SendMsg(msgData: Msg.kproto.IChatSendMessageReq) {
  const msg = ChatSendMessageReq.create({
    ChatID: msgData.ChatID,
    Message: msgData.Message,
    MessageType: msgData.MessageType,
  });
  console.log(msg, 'sending msg');
  const result = {
    // UserName: msgData.UserName,
  };
  return result;
}
