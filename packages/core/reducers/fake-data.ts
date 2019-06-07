import { Random } from 'basic-helper';

import * as ChatSDK from '@little-chat/sdk/lib';

import FakeChatMsgDatas from './fake-chat-msg-data';
import { ContactEntity, ChatListEntity } from '../types';

const genFakeChatListData = (count: number = 50): ChatListEntity => {
  const res: ChatListEntity = {};
  // console.log([...Array(count)].forEach);
  for (let i = 0; i < count; i++) {
    const ChatID = i;
    res[ChatID] = {
      ID: ChatID,
      CreateAt: 1559618145623,
      UpdatedAt: 1559618545623,
      ChatType: 1,
      Title: `Chat_${i}`,
      Disabled: 0,
    };
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
      FromUser: randomUserColl[Random([0, randomUserColl.length])],
      Message: FakeChatMsgDatas[Random([0, FakeChatMsgDatas.length])],
    };
  }
  return res;
};

const getFakeContact = (count: number = 50) => {
  const res: ContactEntity[] = [];
  // console.log([...Array(count)].forEach);
  for (let i = 0; i < count; i++) {
    res.push({
      ID: i,
      ChatID: i,
      UserName: `${randomUserColl[Random([0, randomUserColl.length])]}_${i}`,
      Avatar: ''
    });
  }
  return res;
};

const FakeChatList = genFakeChatListData();
const FakeChatContent = getFakeChatContent();
const FakeContactData = getFakeContact();

export {
  FakeChatList,
  FakeChatContent,
  FakeContactData,
};
