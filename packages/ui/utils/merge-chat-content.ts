import {
  ChatContentItem
} from '@little-chat/core/types';

function mergeChatContent(
  array: ChatContentItem[], mergeArr: ChatContentItem[]
): ChatContentItem[] {
  const mergedArr = array.concat(mergeArr);
  const obj = {};
  let res: ChatContentItem[] = [];
  mergedArr.forEach((item) => {
    if (item && item.MessageID) obj[`${item.MessageID.toString()}`] = item;
  });
  res = Object.values(obj);
  res.sort((f, s) => +f.State.toString() - +s.State.toString());
  return res;
}

export default mergeChatContent;
