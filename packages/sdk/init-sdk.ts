import JSBI from 'jsbi';
import { UUID } from 'basic-helper';
import SocketHelper from './socket';
import { encodeData } from './handler/date-buffer';

const { BigInt } = JSBI;

interface Params {
  apiHost: string;
}
interface Api {
  create: ({}) => {};
  encode: ({}) => ({
    finish: () => Uint8Array;
  });
  decode: (Uint8Array) => {};
  toObject: (any) => {};
}

let $WS: SocketHelper;

function GetWS() {
  if (!$WS) console.error('请先调用 InitSDK');
  return $WS;
}

function WSSend<T extends Api, S>(api: T, apiName: string, data?, needAuth = true): Promise<S> {
  if (!$WS) console.error('请先调用 InitSDK');
  return new Promise((resolve, reject) => {
    const requestID = BigInt(UUID(16));
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
        reject(res);
      },
      needAuth
    });
  });
}

function InitSDK(params: Params) {
  const { apiHost } = params;
  $WS = new SocketHelper({
    apiHost
  });
  return $WS;
}

export {
  InitSDK, GetWS, WSSend
};
