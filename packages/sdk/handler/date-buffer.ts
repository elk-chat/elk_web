import JSBI from 'jsbi';
import getSigMapper from './method-sig';
import { HeaderStruct, DecodedDataStruct } from '../struct';
import '../bigint-buffer';

const { BigInt } = JSBI;

const HeaderByteLen = {
  Len: 4,
  Sig: 4,
  ApplicationID: 4,
  AuthKeyID: 8,
  SessionID: 8,
  RequestID: 8,
  ResponseID: 8,
};

const HBYTEOFFSET_LEN = 0;
const HBYTEOFFSET_SIG = HeaderByteLen.Len + HBYTEOFFSET_LEN;
const HBYTEOFFSET_APP_ID = HeaderByteLen.ApplicationID + HBYTEOFFSET_SIG;
const HBYTEOFFSET_AUTHKEYID = HeaderByteLen.Sig + HBYTEOFFSET_APP_ID;
const HBYTEOFFSET_SESSIONID = HeaderByteLen.AuthKeyID + HBYTEOFFSET_AUTHKEYID;
const HBYTEOFFSET_REQUESTID = HeaderByteLen.SessionID + HBYTEOFFSET_SESSIONID;
const HBYTEOFFSET_RESPONSEID = HeaderByteLen.RequestID + HBYTEOFFSET_REQUESTID;

const headerBufferLen = (() => {
  let res = 0;
  Object.values(HeaderByteLen).forEach((item) => {
    res += +item;
  });
  return res;
})();

const COMMON_HEADER: HeaderStruct = {
  Len: 0,
  Sig: 0,
  ApplicationID: 1,
  AuthKeyID: BigInt(0),
  SessionID: BigInt(0),
  RequestID: BigInt(0),
  ResponseID: BigInt(0)
};

export function setHeaderSSID(SessionID) {
  COMMON_HEADER.SessionID = BigInt(SessionID);
}

/**
 * 将数据进行 encode，步骤
 *
 * 1. 把特定格式的 header 的字段进行 unit 转换，写入 ArrayBuffer 缓存带中
 * 2. 把已经通过 protobuf 的 data buffer 数据写入 ArrayBuffer
 *
 * @param {string} method
 * @param {Uint8Array} dataBuf
 * @param {Long} RequestID
 * @returns
 */
function encodeData(method: string, dataBuf: Uint8Array, RequestID: typeof BigInt) {
  const sig = getSigMapper(method);
  const totalLen = headerBufferLen + dataBuf.length;
  const header = Object.assign({}, COMMON_HEADER, {
    Len: totalLen,
    Sig: sig,
    RequestID
  });
  const buffer = new ArrayBuffer(totalLen);
  const uint8 = new Uint8Array(buffer);
  const dataView = new DataView(buffer);

  dataView.setUint32(HBYTEOFFSET_LEN, header.Len, true);
  dataView.setUint32(HBYTEOFFSET_SIG, header.Sig, true);
  dataView.setUint32(HBYTEOFFSET_APP_ID, header.ApplicationID, true);
  dataView.setUint64(HBYTEOFFSET_AUTHKEYID, header.AuthKeyID, true);
  dataView.setUint64(HBYTEOFFSET_SESSIONID, header.SessionID, true);
  dataView.setUint64(HBYTEOFFSET_REQUESTID, header.RequestID, true);
  dataView.setUint64(HBYTEOFFSET_RESPONSEID, header.ResponseID, true);

  /** 合并 protobuf 的数据 */
  uint8.set(dataBuf, headerBufferLen);

  return buffer;
}

/**
 * 提取返回消息的 buffer 的内容
 * 1. 提取 header 内容
 * 2. 提取 data buffer 内容，交给 handler 函数根据返回的 Sig 做 toObject 处理
 *
 * @param {ArrayBuffer} buffer
 * @returns {DecodedDataStruct}
 */
function decodeData(buffer: ArrayBuffer): DecodedDataStruct {
  const dataView = new DataView(buffer);

  const headerBufMapper = {
    Len: dataView.getUint32(HBYTEOFFSET_LEN, true),
    Sig: dataView.getUint32(HBYTEOFFSET_SIG, true),
    ApplicationID: dataView.getUint32(HBYTEOFFSET_APP_ID, true),
    AuthKeyID: dataView.getUint64(HBYTEOFFSET_AUTHKEYID, true),
    SessionID: dataView.getUint64(HBYTEOFFSET_SESSIONID, true),
    RequestID: dataView.getUint64(HBYTEOFFSET_REQUESTID, true),
    ResponseID: dataView.getUint64(HBYTEOFFSET_RESPONSEID, true),
  };
  const dataBuf = buffer.slice(headerBufferLen);

  return {
    ...headerBufMapper,
    DataBuf: new Uint8Array(dataBuf),
  };
}

export {
  encodeData, decodeData
};
