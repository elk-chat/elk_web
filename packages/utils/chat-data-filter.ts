import {
  FEMessageType
} from '@little-chat/core/types';

const chatContentFilter = (ChatEntity) => {
  if (!ChatEntity || !ChatEntity.UpdateMessage) return ChatEntity;
  const res = { ...ChatEntity };
  switch (ChatEntity.MessageType) {
    case FEMessageType.SendMessage:
      Object.assign(res, res.UpdateMessage.UpdateMessageChatSendMessage.ChatMessage);
      break;
    case FEMessageType.AddMember:
      Object.assign(res, res.UpdateMessage.UpdateMessageChatAddMember);
      break;
    case FEMessageType.ReadState:
      Object.assign(res, res.UpdateMessage.UpdateMessageChatReadMessage.ChatMessage);
      break;
    case FEMessageType.DeletedMemeber:
      Object.assign(res, res.UpdateMessage.UpdateMessageChatDeleteMember);
      break;
  }
  return res;
};

export {
  chatContentFilter
};
