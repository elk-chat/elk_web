/**
 * 处理 websocket 的 message 的具体业务逻辑
 * @Author Alex
 */

import { DecodedDataStruct } from '../struct';
import SDK from '../lib/sdk';
import SigMethod from './method-sig-mapper';

function messageResHandler(msgData: DecodedDataStruct) {
  const { Sig } = msgData;
  const res = Object.assign({}, msgData);
  let api;
  switch (Sig) {
    case SigMethod.SIG_SUCCESS:
      api = SDK.kproto.Success;
      break;
    case SigMethod.SIG_ERROR:
      api = SDK.kproto.Error;
      break;
    case SigMethod.SIG_USER_REGISTER_RESP:
      api = SDK.kproto.UserRegisterResp;
      break;
    case SigMethod.SIG_USER_LOGIN_RESP:
      api = SDK.kproto.UserLoginResp;
      break;
    case SigMethod.SIG_CHAT_GET_CHATS_RESP:
      api = SDK.kproto.ChatGetChatsResp;
      break;
  }
  if (api) res.Data = api.decode(msgData.DataBuf);
  console.log(res)
  return res;
}

export {
  messageResHandler
};
