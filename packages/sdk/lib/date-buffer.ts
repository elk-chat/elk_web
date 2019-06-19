import MethodSig from './method-sig';
import ToConstName from './to-const-name';

interface HeaderStruct {
  Len: number;
  Sig: number;
  AuthKeyID: number;
  SessionID: number;
  RequestID: number;
  ResponseID: number;
}

const HeaderByteLen = {
  Len: 4,
  Sig: 4,
  AuthKeyID: 8,
  SessionID: 8,
  RequestID: 8,
  ResponseID: 8,
};

const HBYTEOFFSET_LEN = 0;
const HBYTEOFFSET_SIG = HeaderByteLen.Len + HBYTEOFFSET_LEN;
const HBYTEOFFSET_AUTHKEYID = HeaderByteLen.Sig + HBYTEOFFSET_SIG;
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

function encodeData(method: string, dataBuf: Uint8Array, RequestID: number) {
  const methodMapper = `SIG_${ToConstName(method)}`;
  const sig = MethodSig[methodMapper];
  const totalLen = headerBufferLen + dataBuf.length;
  const header: HeaderStruct = {
    Len: totalLen,
    Sig: sig,
    AuthKeyID: 0,
    SessionID: 0,
    RequestID,
    ResponseID: 0
  };
  const buffer = new ArrayBuffer(totalLen);
  const uint8 = new Uint8Array(buffer);
  const view = new DataView(buffer);

  view.setUint32(HBYTEOFFSET_LEN, header.Len, true);
  view.setUint32(HBYTEOFFSET_SIG, header.Sig, true);
  view.setBigUint64(HBYTEOFFSET_AUTHKEYID, BigInt(header.AuthKeyID), true);
  view.setBigUint64(HBYTEOFFSET_SESSIONID, BigInt(header.SessionID), true);
  view.setBigUint64(HBYTEOFFSET_REQUESTID, BigInt(header.RequestID), true);
  view.setBigUint64(HBYTEOFFSET_RESPONSEID, BigInt(header.ResponseID), true);

  /** 合并 protobuf 的数据 */
  uint8.set(dataBuf, headerBufferLen);

  return buffer;
}

function decodeData(buffer: ArrayBuffer) {
  const view = new DataView(buffer);

  const headerBufMapper = {
    Len: view.getUint32(HBYTEOFFSET_LEN, true),
    Sig: view.getUint32(HBYTEOFFSET_SIG, true),
    AuthKeyID: view.getBigUint64(HBYTEOFFSET_AUTHKEYID, true),
    SessionID: view.getBigUint64(HBYTEOFFSET_SESSIONID, true),
    RequestID: view.getBigUint64(HBYTEOFFSET_REQUESTID, true),
    ResponseID: view.getBigUint64(HBYTEOFFSET_RESPONSEID, true),
  };
  const dataBuf = buffer.slice(headerBufferLen);

  return {
    ...headerBufMapper,
    data: new Uint8Array(dataBuf)
  };
}

export {
  encodeData, decodeData
};
