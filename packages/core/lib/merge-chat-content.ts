import {
  ChatContentItem
} from '../types';

function mergeChatContent(
  array: ChatContentItem[], mergeArr: ChatContentItem[]
): ChatContentItem[] {
  const mergedArr = [...(array || []), ...(mergeArr || [])];
  const obj = {};
  let res: ChatContentItem[] = [];
  mergedArr.forEach((item) => {
    obj[`${item.State}`] = item;
  });
  res = Object.values(obj);
  res.sort((f, s) => +f.State.toString() - +s.State.toString());
  return res;
}

export default mergeChatContent;
