import SDK from '../lib/sdk';
import { WSSend } from '..';

const {
  ContactAddReq, ContactDeleteReq, ContactGetContactsReq, ContactUpdateReq,
  UserGetFullUsersReq, UserGetUsersReq, ChatInitiateReq
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
 * 更新联系人信息
 */
export async function GetFullUsers(form: SDK.kproto.IUserGetFullUsersReq) {
  const res = await WSSend(UserGetFullUsersReq, 'UserGetFullUsersReq', form);
  return res;
}

/**
 * 更新联系人信息
 */
export async function SearchUser(form: SDK.kproto.IUserGetUsersReq) {
  const res = await WSSend(UserGetUsersReq, 'UserGetUsersReq', form);
  return res;
}

/**
 * 更新联系人信息
 */
export async function InitPeerChat(form: SDK.kproto.IChatInitiateReq) {
  const res = await WSSend(ChatInitiateReq, 'ChatInitiateReq', form);
  return res;
}
