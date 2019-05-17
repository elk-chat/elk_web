import Msg from './lib/koi';
const { UserRegisterReq } = Msg.kproto;

const msg = UserRegisterReq.create({
  UserName: 'alex',
  Password: '123',
});
const encodeBuffer = UserRegisterReq.encode(msg).finish();
const decodeBuffer = UserRegisterReq.decode(encodeBuffer);

console.log(encodeBuffer)
console.log(decodeBuffer)

const Pro = {

}

export default Pro