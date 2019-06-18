import Msg from '../lib/sdk';

const { UserLoginReq } = Msg.kproto;
// console.log(Msg)

export function ApplyLogin(form: Msg.kproto.IUserLoginReq) {
  const msg = UserLoginReq.create({
    UserName: form.UserName,
    Password: form.Password,
  });
  console.log(msg, 'logging');
  const result = {
    UserName: form.UserName,
  };
  return result;
}
