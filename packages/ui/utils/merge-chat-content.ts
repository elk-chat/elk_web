import {
  ChatContentItem, FEMessageType
} from '@little-chat/core/types';
import { chatContentFilter } from '@little-chat/utils/chat-data-filter';

const msgFilterGroup = [FEMessageType.SendMessage, FEMessageType.AddMember];

function mergeChatContent(
  srcArray: ChatContentItem[], mergeArr: ChatContentItem[]
): ChatContentItem[] {
  const mergedArr = srcArray.concat(mergeArr);
  const obj = {};
  let res: ChatContentItem[] = [];
  mergedArr.forEach((item) => {
    if (
      item && msgFilterGroup.indexOf(item.MessageType) !== -1
    ) {
      const nextItem = chatContentFilter(item);
      const { ClientMessageID, MessageID } = nextItem;
      if (ClientMessageID) {
        obj[String(ClientMessageID)] = nextItem;
      } else if (MessageID) {
        obj[String(MessageID)] = nextItem;
      }
    }
  });
  res = Object.values(obj);
  /** 按 state 排序 */
  res.sort((f, s) => +String(f.State) - +String(s.State));
  return res;
}

export default mergeChatContent;
