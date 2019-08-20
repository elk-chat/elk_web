import {
  FEMessageType
} from '@little-chat/core/types';

const chatContentFilter = (ChatEntity) => {
  if (!ChatEntity) return ChatEntity;
  const res = { ...ChatEntity };
  switch (ChatEntity.MessageType) {
    case FEMessageType.SendMessage:
      Object.assign(res, res.UpdateMessage.UpdateMessageChatSendMessage);
      break;
    case FEMessageType.AddMember:
      Object.assign(res, res.UpdateMessage.UpdateMessageChatAddMember);
      break;
    case FEMessageType.ReadState:
      Object.assign(res, res.UpdateMessage.UpdateMessageChatReadMessage);
      break;
  }
  return res;
};

export {
  chatContentFilter
};
