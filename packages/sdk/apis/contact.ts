import SDK from '../lib/sdk';
import { WSSend } from '..';

const {
  ContactAddReq, ContactDeleteReq, ContactGetContactsReq, ContactUpdateReq,
  UserGetFullUsersReq, UserGetUsersReq, ChatInitiateReq, UserGetFullUserReq
} = SDK.kproto;

/**
 * 添加联系人
 */
export async function AddContact(form: SDK.kproto.IContactAddReq) {
  const res = await WSSend(ContactAddReq, 'ContactAddReq', form);
  return res;
}

/**
 * 获取联系人列表
 */
export async function GetContacts() {
  const res = await WSSend(ContactGetContactsReq, 'ContactGetContactsReq');
  return res;
}

/**
 * 删除联系人
 */
export async function DeleteContact(form: SDK.kproto.IContactDeleteReq) {
  const res = await WSSend(ContactDeleteReq, 'ContactDeleteReq', form);
  return res;
}

/**
 * 更新联系人信息
 */
export async function UpdateContact(form: SDK.kproto.IContactUpdateReq) {
  const res = await WSSend(ContactUpdateReq, 'ContactUpdateReq', form);
  return res;
}

/**
 * 获取多个联系人详情信息
 */
export async function GetFullUsers(form: SDK.kproto.IUserGetFullUsersReq) {
  const res = await WSSend(UserGetFullUsersReq, 'UserGetFullUsersReq', form);
  return res;
}

/**
 * 获取某个联系人的详情信息
 */
export async function GetFullUser(form: SDK.kproto.IUserGetFullUserReq) {
  const res = await WSSend<typeof UserGetFullUserReq, SDK.kproto.IUserGetFullUserResp>(UserGetFullUserReq, 'UserGetFullUserReq', form);
  return res;
}

/**
 * 更新联系人信息
 */
export async function SearchUser(
  form: SDK.kproto.IUserGetUsersReq
): Promise<SDK.kproto.IUserGetUsersResp> {
  const res = await WSSend<typeof UserGetUsersReq, SDK.kproto.IUserGetUsersResp>(
    UserGetUsersReq, 'UserGetUsersReq', form
  );
  return res;
}

/**
 * 与联系人发起 Chat 聊天，主要用于获取与该联系人关联的 ChatID
 */
export async function InitPeerChat(
  form: SDK.kproto.IChatInitiateReq
): Promise<SDK.kproto.IChatInitiateResp> {
  const res = await WSSend<typeof ChatInitiateReq, SDK.kproto.IChatInitiateResp>(
    ChatInitiateReq, 'ChatInitiateReq', form
  );
  return res;
}
