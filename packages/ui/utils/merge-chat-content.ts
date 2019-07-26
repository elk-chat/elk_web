import {
  ChatContentItem, FEMessageType
} from '@little-chat/core/types';

const msgFilterGroup = [FEMessageType.SendMessage, FEMessageType.AddMember];

function mergeChatContent(
  array: ChatContentItem[], mergeArr: ChatContentItem[]
): ChatContentItem[] {
  const mergedArr = array.concat(mergeArr);
  const obj = {};
  let res: ChatContentItem[] = [];
  mergedArr.forEach((item) => {
    if (item && item.MessageID && msgFilterGroup.indexOf(item.MessageType) !== -1) obj[`${item.MessageID.toString()}`] = item;
  });
  res = Object.values(obj);
  res.sort((f, s) => +f.State.toString() - +s.State.toString());
  return res;
}

export default mergeChatContent;
