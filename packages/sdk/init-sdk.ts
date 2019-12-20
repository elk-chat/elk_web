import JSBI from 'jsbi';
import { UUID } from '@mini-code/base-func';
import SocketHelper from './socket';
import failResHandler from './handler/error-res-handler';
import SDK from './lib/sdk';
// import { encodeData } from './handler/date-buffer';

const { InitConnectionReq } = SDK.kproto;

interface Params {
  apiHost: string;
}
interface Api {
  create: (data) => {};
  encode: (data) => ({
    finish: () => Uint8Array;
  });
  decode: (Uint8Array) => {};
  toObject: (any) => {};
}
interface Response {
  RequestID?: string;
}

const SDKErrorDesc = '请先调用 InitSDK';

const { BigInt } = JSBI;
let $WS;
let prevWSParams;

function GetWS() {
  if (!$WS) console.error(SDKErrorDesc);
  return $WS;
}

function WSSend<T extends Api, S>(
  api: T, apiName: string, data?, needAuth = true, requestID = BigInt(UUID(16))
): Promise<S> {
  return new Promise((resolve, reject) => {
    if (!$WS) {
      throw Error(SDKErrorDesc);
    }
    const msgWrite = api.create(data);
    const bufData = api.encode(msgWrite).finish();

    // const finalData = encodeData(apiName, bufData, requestID);
    $WS.send({
      apiName,
      bufData,
      requestID,
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        failResHandler(res);
        reject(res);
      },
      needAuth
    });
  });
}

/**
 * 初始化连接
 */
export function InitConnection() {
  return new Promise((resolve, reject) => {
    // const res = await WSSend(InitConnectionReq, 'InitConnectionReq', null, false);
  // return res;
    const msgWrite = InitConnectionReq.create({});
    const bufData = InitConnectionReq.encode(msgWrite).finish();
    $WS.sendDirect({
      apiName: 'InitConnectionReq',
      bufData,
      requestID: BigInt(UUID(16)),
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        failResHandler(res);
        reject(res);
      },
    });
  });
}

function InitSDK(params: Params = prevWSParams) {
  return new Promise((resolve, reject) => {
  /** 保存上一个参数 */
    if (params) prevWSParams = params;
    const { apiHost } = params;
    $WS = new SocketHelper({
      apiHost
    });
    $WS.on('onOpen', () => {
      InitConnection()
        .then(() => {
          resolve($WS);
        })
        .catch(reject);
    });
    // return $WS;
  });
}

/**
 * 检查是否正常链接
 */
function CheckConnectState() {
  let isConnecting = false;
  if (!$WS) return isConnecting;
  isConnecting = $WS.connected;
  return isConnecting;
}

/**
 * 关闭 websocket 链接
 */
function CloseWS() {
  if ($WS) {
    if ($WS.socket) $WS.socket.close();
    $WS = null;
  }
}

export {
  InitSDK, GetWS, WSSend, CheckConnectState, CloseWS
};
