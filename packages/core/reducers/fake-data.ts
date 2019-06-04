import * as ChatSDK from '@little-chat/sdk/lib';

interface IChat extends ChatSDK.kproto.IChat {
  Avatar?: string;
}

const genFakeData = (count: number = 20): IChat[] => {
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

const FakeChatList: IChat[] = genFakeData();

export {
  FakeChatList
};
