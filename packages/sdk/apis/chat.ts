import array2obj from '@little-chat/utils/array2obj';
import Long from 'long';
import SDK from '../lib/sdk';
import { WSSend, GetFullUser } from '..';

interface CreateChatAndAddMemberOptions extends SDK.kproto.IChatCreateReq {
  UserIDs: string[];
  Title: string;
}

// interface SyncChatMessagesParams {
//   ChatIDs: Long[];
//   Limit: number;
// }

const {
  ChatSendMessageReq, ChatGetChatsReq, ChatCreateReq, ChatAddMemberReq,
  ChatSyncChatStateMessagesReq, StateAck, ChatReadMessageReq, ChatGetMembersReq,
  UserGetChatUserStateReq, ChatGetChatStateReq, ChatGetChatStateMessagesReq
} = SDK.kproto;

/**
 * 同步单个 Chat 的聊天消息
 */
export async function SyncChatMessage(options: SDK.kproto.IChatGetChatStateReq) {
  const res = await WSSend<typeof ChatGetChatStateReq, SDK.kproto.IChatGetChatStateResp>(ChatGetChatStateReq, 'ChatGetChatStateReq', options);
  return res;
}

/**
 * 通过查询条件和分页控制，查询历史聊天信息
 */
export async function QueryChatMsgsByCondition(options: SDK.kproto.IChatGetChatStateMessagesReq) {
  const res = await WSSend<typeof ChatGetChatStateMessagesReq, SDK.kproto.IChatGetChatStateMessagesResp>(ChatGetChatStateMessagesReq, 'ChatGetChatStateMessagesReq', options);
  return res;
}

/**
 * 同步多个 Chat 的聊天消息
 */
// export function SyncChatMessages(options: SyncChatMessagesParams) {
//   return new Promise((resolve, reject) => {
//     const { ChatIDs, Limit = 1 } = options;
//     const addQueue: typeof Promise[] = [];
//     const resData = {};
//     ChatIDs.forEach((ChatID) => {
//       const promise = new Promise((rs, rj) => {
//         QueryChatMsgsByCondition({
//           Paging: {
//             PageSize: Limit,
//             PageIndex: 0
//           },
//           Condition: {
//             ChatID,
//             MessageTypes: [FEMessageType.SendMessage]
//           }
//         })
//           .then(({ StateUpdates }) => {
//             resData[ChatID.toString()] = getLastItem(StateUpdates);
//             rs(StateUpdates);
//           })
//           .catch((e) => {
//             rj(e);
//           });
//       });
//       addQueue.push(promise);
//     });
//     Promise.all(addQueue)
//       .then(() => {
//         resolve(resData);
//       })
//       .catch((e) => {
//         reject(e);
//       });
//   });
//   // const res = await WSSend(ChatSyncChatStateMessagesReq, 'ChatSyncChatStateMessagesReq', options);
//   // return res;
// }

/**
 * 告知服务端已收到消息
 */
export async function MsgStateAck(options: SDK.kproto.IStateAck) {
  const res = await WSSend(StateAck, 'StateAck', options);
  return res;
}

/**
 * 告知服务端消息已读
 */
export async function ReadMsg(options: SDK.kproto.IChatReadMessageReq) {
  const res = await WSSend(ChatReadMessageReq, 'ChatReadMessageReq', options);
  return res;
}

/**
 * 创建聊天
 */
export async function CreateChat(options: SDK.kproto.IChatCreateReq) {
  const res = await WSSend<typeof ChatCreateReq, SDK.kproto.IChatCreateResp>(ChatCreateReq, 'ChatCreateReq', options);
  return res;
}

/**
 * 向指定的 Chat 添加成员
 */
export async function AddMemberToChat(options: SDK.kproto.IChatAddMemberReq) {
  const res = await WSSend<typeof ChatAddMemberReq, SDK.kproto.IChatAddMemberResp>(ChatAddMemberReq, 'ChatAddMemberReq', options);
  return res;
}

interface AddMembersToChatParams {
  ChatID: Long;
  UserIDs: Long[];
}
/**
 * 向指定的 Chat 添加多个成员
 */
export function AddMembersToChat(options: AddMembersToChatParams) {
  const { ChatID, UserIDs } = options;
  const addQueue: any[] = [];
  UserIDs.forEach((UserID) => {
    const promise = new Promise((resolve, reject) => {
      WSSend(ChatAddMemberReq, 'ChatAddMemberReq', {
        ChatID, UserID
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
    addQueue.push(promise);
  });
  return Promise.all(addQueue);
}

/**
 * 查看自己在对应 Chat 中的已读消息状态
 */
export async function CheckMsgReadState(options: SDK.kproto.IUserGetChatUserStateReq) {
  const res = await WSSend<typeof UserGetChatUserStateReq, SDK.kproto.IUserGetChatUserStateResp>(UserGetChatUserStateReq, 'UserGetChatUserStateReq', options);
  return res;
}

/**
 * 创建 Chat 并且添加成员
 */
export async function CreateChatAndAddMember(options: CreateChatAndAddMemberOptions) {
  const { Title, UserIDs } = options;
  const createRes = await CreateChat({
    Title
  });
  const { ChatID } = createRes.Chat;
  const sendQueue: typeof Promise[] = [];
  UserIDs.forEach((UserID) => {
    const promise = new Promise(async (resolve, reject) => {
      try {
        const res = await AddMemberToChat({
          ChatID,
          UserID
        });
        resolve(res);
      } catch (e) {
        reject(e);
      }
    });
    sendQueue.push(promise);
  });
  return Promise.all(sendQueue);
  // return res;
}

/**
 * 获取聊天列表
 */
export async function GetChatList() {
  const res = await WSSend(ChatGetChatsReq, 'ChatGetChatsReq', {});
  return res;
}

/**
 * 获取 Chat 中的联系人信息的 User 信息，只有 UserID
 */
export async function GetChatMembersOnly(options: SDK.kproto.IChatGetMembersReq) {
  const res = await WSSend<typeof ChatGetMembersReq, SDK.kproto.IChatGetMembersResp>(ChatGetMembersReq, 'ChatGetMembersReq', options);
  return res;
}

/**
 * 获取 Chat 中的联系人的所有完整信息，包括 UserName Avatar 等
 */
export function GetChatMembers(options: SDK.kproto.IChatGetMembersReq, myID?) {
  return new Promise<SDK.kproto.IChatGetMembersResp[]>((resolve, reject) => {
    const resData = {};
    const getUserQueue = [];
    GetChatMembersOnly(options)
      .then((chatMemberRes) => {
        const { Members } = chatMemberRes;
        const memberObj = array2obj(Members, 'UserID');
        if (myID) delete memberObj[myID];
        const contactIDs = Object.keys(memberObj);
        contactIDs.forEach((contactID) => {
          const currQueue = new Promise((rs, rj) => {
            GetFullUser({
              UserID: new Long(+contactID)
            })
              .then((fullUserRes) => {
                const { User } = fullUserRes;
                resData[contactID] = User;
                // nextChats[idx].Title = nextChats[idx].Title || User.UserName;
                rs();
              })
              .catch((e) => {
                console.log(e);
              });
          });
          getUserQueue.push(currQueue);
        });
        Promise.all(getUserQueue)
          .then(() => {
          // console.log(resData);
            resolve(Object.values(resData));
          });
      }).catch((e) => {
        reject(e);
      });
  });
}

/**
 * 发送消息
 */
export async function SendMsg(msgData: SDK.kproto.IChatSendMessageReq) {
  const res = await WSSend<typeof ChatSendMessageReq, SDK.kproto.IChatSendMessageResp>(ChatSendMessageReq, 'ChatSendMessageReq', msgData);
  return res;
}
