import SDK from '../lib/sdk';
import { GetWS, WSSend, setHeaderSSID } from '..';

const {
  UserLoginReq, UserRegisterReq, HeartbeatReq
} = SDK.kproto;

export async function ApplyLogin(form: SDK.kproto.IUserLoginReq) {
  const res = await WSSend<typeof UserLoginReq, SDK.kproto.IUserLoginResp>(UserLoginReq, 'UserLoginReq', form, false);
  if (res.SessionID) {
    /**
     * 1. 成功后设置 sessionID
     * 2. 设置 websocket 的权限
     */
    setHeaderSSID(res.SessionID);
    GetWS().setPermissions(true);
  }
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
  const res = await WSSend<typeof UserRegisterReq, SDK.kproto.IUserRegisterResp>(UserRegisterReq, 'UserRegisterReq', form, false);
  return res;
}

/**
 * 心跳检测
 */
export async function HeartBeat(form: SDK.kproto.IHeartbeatReq) {
  const res = await WSSend<typeof HeartbeatReq, SDK.kproto.IHeartbeatResp>(HeartbeatReq, 'HeartbeatReq', form);
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
