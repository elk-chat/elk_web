/**
 * 处理 websocket 的 message 的具体业务逻辑
 * @Author Alex
 */

import { DecodedDataStruct } from '../struct';
import SDK from '../lib/sdk';

function messageResHandler(msgData: DecodedDataStruct) {
  const { Sig } = msgData;
  const res = Object.assign({}, msgData);
  switch (Sig) {
    case 2696799790: // 成功
      res.Data = SDK.kproto.Success.decode(msgData.DataBuf);
      break;
    case 2619118453: // 失败
      res.Data = SDK.kproto.Error.decode(msgData.DataBuf);
      break;
    case 866699904: // 注册 res
      res.Data = SDK.kproto.UserRegisterResp.decode(msgData.DataBuf);
      break;
  }
  return res;
}

export {
  messageResHandler
};
