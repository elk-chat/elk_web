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
    case SigMethod.SIG_CHAT_SYNC_CHAT_STATE_MESSAGES_RESP:
      api = SDK.kproto.ChatSyncChatStateMessagesResp;
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
    case SigMethod.SIG_CHAT_GET_MEMBERS_RESP:
      api = SDK.kproto.ChatGetMembersResp;
      break;
    case SigMethod.SIG_USER_GET_FULL_USER_RESP:
      api = SDK.kproto.UserGetFullUserResp;
      break;
    case SigMethod.SIG_HEARTBEAT_RESP:
      api = SDK.kproto.HeartbeatResp;
      break;
    case SigMethod.SIG_UTILITY_UPLOAD_RESP:
      api = SDK.kproto.UtilityUploadResp;
      break;
    case SigMethod.SIG_UTILITY_NEW_MULTIPART_UPLOAD_RESP:
      api = SDK.kproto.UtilityNewMultipartUploadResp;
      break;
    case SigMethod.SIG_UTILITY_DOWNLOAD_RESP:
      api = SDK.kproto.UtilityDownloadResp;
      break;
    case SigMethod.SIG_UTILITY_FILE_STAT_RESP:
      api = SDK.kproto.UtilityFileStatResp;
      break;
    case SigMethod.SIG_CHAT_READ_MESSAGE_RESP:
      api = SDK.kproto.ChatReadMessageResp;
      break;
    // case SigMethod.SIG_CHAT_GET_CHAT_STATE_RESP:
    //   api = SDK.kproto.ChatGetChatStateResp;
    //   break;
    case SigMethod.SIG_USER_GET_CHAT_USER_STATE_RESP:
      api = SDK.kproto.UserGetChatUserStateResp;
      break;
    case SigMethod.SIG_CHAT_GET_CHAT_STATE_MESSAGES_RESP:
      api = SDK.kproto.ChatGetChatStateMessagesResp;
      break;
    case SigMethod.SIG_USER_GET_CHAT_USER_SUPERSCRIPT_RESP:
      api = SDK.kproto.UserGetChatUserSuperscriptResp;
      break;
    case SigMethod.SIG_CHAT_GET_STATE_READ_RESP:
      api = SDK.kproto.ChatGetStateReadResp;
      break;
    case SigMethod.SIG_INIT_CONNECTION_RESP:
      api = SDK.kproto.InitConnectionResp;
      break;
    case SigMethod.SIG_CHAT_SEND_MESSAGE_RESP:
      api = SDK.kproto.ChatSendMessageResp;
      break;
    case SigMethod.SIG_USER_CHANGE_PASSWORD_RESP:
      api = SDK.kproto.UserChangePasswordResp;
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
