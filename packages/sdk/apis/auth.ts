import SDK from '../lib/sdk';
import { WSSend, setHeaderSSID } from '..';

const {
  UserLoginReq, UserRegisterReq, HeartbeatReq
} = SDK.kproto;

export async function ApplyLogin(form: SDK.kproto.IUserLoginReq) {
  const res = await WSSend<typeof UserLoginReq, SDK.kproto.IUserLoginResp>(UserLoginReq, 'UserLoginReq', form);
  /** 成功后设置 sessionID */
  if (res.SessionID) setHeaderSSID(res.SessionID);
  const result = Object.assign({}, res, {
    UserName: form.UserName,
    ...res.User
  });
  return result;
}

/**
 * 请求注册
 */
export async function ApplyRegister(form: SDK.kproto.IUserRegisterReq) {
  const res = await WSSend(UserRegisterReq, 'UserRegisterReq', form);
  return res;
}

/**
 * 心跳检测
 */
export async function HeartBeat(form: SDK.kproto.IHeartbeatReq) {
  const res = await WSSend(HeartbeatReq, 'HeartbeatReq', form);
  return res;
}

// setTimeout(() => {
//   ApplyRegister({
//     UserName: `alex`,
//     Password: '123'
//   });
//   for (let index = 0; index < 20; index++) {
//     ApplyRegister({
//       UserName: `user${index}`,
//       Password: '1'
//     });
//   }
// }, 1000);
