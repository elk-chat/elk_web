import { Random } from 'basic-helper';

import * as ChatSDK from '@little-chat/sdk/lib';

import FakeChatMsgDatas from './fake-chat-msg-data';
import { ContactList, ChatListEntity } from '../types';

const selfUserName = 'Alex';
const randomUserColl = ['Chili', 'Yakult', 'Milk', 'Wavy', 'None'];
const userLen = randomUserColl.length;
let userCursor = 0;
function getUser(idx: number) {
  userCursor = idx % userLen;
  const res = randomUserColl[userCursor];
  if (userCursor >= userLen) userCursor = 0;
  return res;
}

/** 随机生成联系人 */
const getFakeContact = (count: number = 50) => {
  const res: ContactList = {};
  for (let i = 0; i < count; i++) {
    const ContactID = i;
    res[ContactID] = {
      ID: i,
      ChatID: i,
      UserName: `${getUser(i)}_${i}`,
      Avatar: ''
    };
  }
  return res;
};

const FakeContactData = getFakeContact();

/** 根据联系人随机生成 chat */
const genFakeChatListData = (): ChatListEntity => {
  const res: ChatListEntity = {};
  const contactIDs = Object.keys(FakeContactData);
  const contactLen = contactIDs.length;
  for (let i = 0; i < contactLen; i++) {
    const currContact = FakeContactData[i];
    const { ChatID, ID, UserName } = currContact;
    res[ChatID] = {
      ID: ChatID,
      ContactID: ID,
      CreateAt: 1559618145623,
      UpdatedAt: 1559618545623,
      ChatType: 1,
      FromUser: UserName,
      LastMsg: FakeChatMsgDatas[Random([0, FakeChatMsgDatas.length])].slice(0, 20),
      Title: `${getUser(i)}_${i}`,
      Disabled: 0,
    };
  }
  return res;
};

/** 随机生成聊天内容 */
const getFakeChatContent = (FromUser: string, count: number = 20) => {
  const res: {} = {};
  for (let i = 0; i < count; i++) {
    const sendTime = Date.now() - (+Random([10000 * 1000, 500000 * 1000]));
    res[i] = {
      ID: i,
      SendTime: sendTime,
      UpdatedAt: sendTime,
      MsgType: 0,
      FromUser: i % 3 === 0 ? selfUserName : FromUser,
      Message: FakeChatMsgDatas[Random([0, FakeChatMsgDatas.length])],
    };
  }
  return res;
};

const FakeChatList = genFakeChatListData();

export {
  FakeChatList,
  getFakeChatContent,
  FakeContactData,
};
