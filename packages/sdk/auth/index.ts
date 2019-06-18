import Msg from '../lib/sdk';
import { encodeAgent } from '../lib/proto-agent';
import { WSSend } from '..';

const { UserLoginReq, UserRegisterReq } = Msg.kproto;

export function ApplyLogin(form: Msg.kproto.IUserLoginReq) {
  const bufData = encodeAgent(UserLoginReq, {
    UserName: form.UserName,
    Password: form.Password,
  });
  WSSend(bufData);
  const result = {
    UserName: form.UserName,
  };
  return result;
}
