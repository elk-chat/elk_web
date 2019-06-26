import {
  ChatContentItem
} from '../types';

function mergeChatContent(array: ChatContentItem[], mergeArr: ChatContentItem[]): ChatContentItem[] {
  const mergedArr = [...(array || []), ...(mergeArr || [])];
  const obj = {};
  let res: ChatContentItem[] = [];
  mergedArr.forEach((item) => {
    obj[`${item.State}`] = item;
  });
  res = Object.values(obj);
  res.sort((f, s) => f.State - s.State);
  return res;
}

export default mergeChatContent;
