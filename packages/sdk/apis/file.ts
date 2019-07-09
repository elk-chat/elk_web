import SDK from '../lib/sdk';
import { WSSend } from '..';

const {
  UtilityUploadReq, UtilityFileStatReq, UtilityDownloadReq
} = SDK.kproto;

/**
 * 上传文件
 */
export async function UploadFile(options: SDK.kproto.IUtilityUploadReq) {
  const res = await WSSend(UtilityUploadReq, 'UtilityUploadReq', options);
  return res;
}

/**
 * 获取文件信息
 */
export async function GetFileState(options: SDK.kproto.IUtilityFileStatReq) {
  const res = await WSSend<typeof UtilityFileStatReq, SDK.kproto.IUtilityFileStatResp>(UtilityFileStatReq, 'UtilityFileStatReq', options);
  return res;
}

/**
 * 获取文件信息
 */
export async function DownloadFile(options: SDK.kproto.IUtilityDownloadReq) {
  const res = await WSSend(UtilityDownloadReq, 'UtilityDownloadReq', options);
  return res;
}
