import { UUID } from 'basic-helper';
import SocketHelper from './socket';
import { encodeData } from './handler/date-buffer';

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

function WSSend<T extends Api, S>(api: T, apiName: string, data?): Promise<S> {
  if (!$WS) console.error('请先调用 InitSDK');
  return new Promise((resolve, reject) => {
    const RequestID = BigInt(UUID(16));
    const msgWrite = api.create(data);
    const bufData = api.encode(msgWrite).finish();

    const finalData = encodeData(apiName, bufData, RequestID);
    $WS.send(finalData, RequestID, (res) => {
      resolve(res);
    }, (res) => {
      reject(res);
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
