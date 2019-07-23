import SDK from '../lib/sdk';
import { WSSend } from '..';

const {
  UserUpdateProfileReq
} = SDK.kproto;

/**
 * 更新用户信息
 */
export async function UpdateProfile(options: SDK.kproto.IUserUpdateProfileReq) {
  const res = await WSSend<typeof UserUpdateProfileReq, SDK.kproto.IUserUpdateProfileResp>(UserUpdateProfileReq, 'UserUpdateProfileReq', options);
  return res;
}
