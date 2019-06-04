import * as ChatSDK from '@little-chat/sdk/lib';

const FakeChatList: ChatSDK.kproto.IChat[] = [
  {
    ID: 1,
    CreateAt: 1559618145623,
    UpdatedAt: 1559618545623,
    ChatType: 1,
    Title: 'Alex',
    Disabled: 0,
  },
  {
    ID: 2,
    CreateAt: 1559618145623,
    UpdatedAt: 1559618545623,
    ChatType: 2,
    Title: 'Blex',
    Disabled: 0,
  },
  {
    ID: 3,
    CreateAt: 1559618145623,
    UpdatedAt: 1559618545623,
    ChatType: 2,
    Title: 'Clex',
    Disabled: 0,
  },
];

export {
  FakeChatList
};
