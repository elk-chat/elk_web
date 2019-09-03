import {
  FEMessageType
} from '@little-chat/core/types';

const chatContentFilter = (ChatEntity) => {
  if (!ChatEntity) return ChatEntity;
  const res = { ...ChatEntity };
  let mark;
  switch (ChatEntity.MessageType) {
    case FEMessageType.SendMessage:
      mark = 'UpdateMessageChatSendMessage';
      break;
    case FEMessageType.AddMember:
      mark = 'UpdateMessageChatAddMember';
      break;
    case FEMessageType.ReadState:
      mark = 'UpdateMessageChatReadMessage';
      break;
  }
  if (mark && res.UpdateMessage) {
    Object.assign(res, res.UpdateMessage[mark].ChatMessage);
  }
  return res;
};

export {
  chatContentFilter
};
