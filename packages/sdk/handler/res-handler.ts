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
    case SigMethod.SIG_STATE_UPDATE: // 消息推送统一接口
      api = SDK.kproto.StateUpdate;
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
    case SigMethod.SIG_CHAT_CREATE_RESP:
      api = SDK.kproto.ChatCreateResp;
      break;
    case SigMethod.SIG_CHAT_ADD_MEMBER_RESP:
      api = SDK.kproto.ChatAddMemberResp;
      break;
    case SigMethod.SIG_CHAT_SYNC_CHAT_STATES_RESP:
      api = SDK.kproto.ChatSyncChatStatesResp;
      break;
    case SigMethod.SIG_CONTACT_GET_CONTACTS_RESP:
      api = SDK.kproto.ContactGetContactsResp;
      break;
    case SigMethod.SIG_CONTACT_ADD_RESP:
      api = SDK.kproto.ContactAddResp;
      break;
    case SigMethod.SIG_CONTACT_DELETE_RESP:
      api = SDK.kproto.ContactDeleteResp;
      break;
    case SigMethod.SIG_CONTACT_UPDATE_RESP:
      api = SDK.kproto.ContactUpdateResp;
      break;
    case SigMethod.SIG_USER_GET_FULL_USERS_RESP:
      api = SDK.kproto.UserGetFullUsersResp;
      break;
    case SigMethod.SIG_USER_GET_USERS_RESP:
      api = SDK.kproto.UserGetUsersResp;
      break;
    case SigMethod.SIG_CHAT_INITIATE_RESP:
      api = SDK.kproto.ChatInitiateResp;
      break;
  }
  if (api) {
    res.Data = api.decode(msgData.DataBuf);
  } else {
    console.log(api ? api.name : `没有处理对应 ${Sig} 的函数，请检查`, res);
  }
  // console.log(api ? api.name : `没有处理对应 ${Sig} 的函数，请检查`, res);
  return res;
}

export {
  messageResHandler
};
