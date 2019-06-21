import SDK from '../lib/sdk';
import { WSSend, setHeaderSSID } from '..';

const {
  UserLoginReq, UserRegisterReq
} = SDK.kproto;

export async function ApplyLogin(form: SDK.kproto.IUserLoginReq) {
  const res = await WSSend(UserLoginReq, 'UserLoginReq', form);
  /** 成功后设置 sessionID */
  if (res.SessionID) setHeaderSSID(res.SessionID);
  const result = Object.assign({}, res, {
    UserName: form.UserName,
  });
  return result;
}

export async function ApplyRegister(form: SDK.kproto.IUserRegisterReq) {
  const res = await WSSend(UserRegisterReq, 'UserRegisterReq', form);
  return res;
}

// setTimeout(() => {
//   ApplyRegister({
//     UserName: 'Alex',
//     Password: '123'
//   });
// }, 1000);
