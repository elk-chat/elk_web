import { Random } from 'basic-helper';

import * as ChatSDK from '@little-chat/sdk/lib';

interface IChat extends ChatSDK.kproto.IChat {
  Avatar?: string;
}

const genFakeChatListData = (count: number = 20): IChat[] => {
  const res: IChat[] = [];
  // console.log([...Array(count)].forEach);
  for (let i = 0; i < count; i++) {
    res.push({
      ID: i,
      CreateAt: 1559618145623,
      UpdatedAt: 1559618545623,
      ChatType: 1,
      Title: `Chat_${i}`,
      Disabled: 0,
    });
  }
  return res;
};

const randomUserColl = ['alex', 'Chili', 'Yakult', 'Milk'];
const getFakeChatContent = (count: number = 50) => {
  const res: {} = {};
  // console.log([...Array(count)].forEach);
  for (let i = 0; i < count; i++) {
    res[i] = {
      ID: i,
      SendTime: 1559618145623,
      UpdatedAt: 1559618545623,
      MsgType: 0,
      FromUser: randomUserColl[Random([0, 3])],
      Message: `Chat_Content_${i}`,
    };
  }
  return res;
};

const FakeChatList: IChat[] = genFakeChatListData();

const FakeChatContent = getFakeChatContent();

export {
  FakeChatList,
  FakeChatContent,
};
