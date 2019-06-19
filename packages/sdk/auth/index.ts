import SDK from '../lib/sdk';
import { encodeAgent } from '../lib';
import { WSSend } from '..';

const {
  UserLoginReq, UserRegisterReq
} = SDK.kproto;

export async function ApplyLogin(form: SDK.kproto.IUserLoginReq) {
  const res = await WSSend(UserLoginReq, {
    UserName: form.UserName,
    Password: form.Password,
  }, 'UserLoginReq');
  const result = {
    UserName: form.UserName,
  };
  return result;
}

export async function ApplyRegister(form: SDK.kproto.IUserRegisterReq) {
  const res = await WSSend(UserRegisterReq, {
    UserName: form.UserName,
    Password: form.Password,
  }, 'UserRegisterReq');
  const result = {
    UserName: form.UserName,
  };
  return result;
}

setTimeout(() => {
  ApplyRegister({
    UserName: 'aaaalex',
    Password: '123123123'
  });
}, 1000);
