import Msg from './lib/koi';

const testUrl = 'ws://10.30.0.28:9999/gate';
const socket = new WebSocket(testUrl);

const { UserRegisterReq } = Msg.kproto;

const msg = UserRegisterReq.create({
  UserName: 'alex',
  Password: '123',
});
const encodeBuffer = UserRegisterReq.encode(msg).finish();
const decodeBuffer = UserRegisterReq.decode(encodeBuffer);

console.log(encodeBuffer);
console.log(decodeBuffer);

const Pro = {

};

socket.onopen = () => {
  socket.send(encodeBuffer);
};

socket.onmessage = (event) => {
  // socket.send(encodeBuffer);
  console.log(UserRegisterReq.decode(event.data));
};

export default Pro;
