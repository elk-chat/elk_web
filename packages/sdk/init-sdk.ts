import { UUID } from 'basic-helper';
import SocketHelper from './socket';
import { encodeData, decodeData } from './lib/date-buffer';

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

function WSSend<T extends Api>(api: T, data: {}, apiName: string) {
  if (!$WS) console.error('请先调用 InitSDK');
  return new Promise((resolve) => {
    const RequestID = +UUID(16);
    const msgWrite = api.create(data);
    const bufData = api.encode(msgWrite).finish();
    console.log(bufData)
    // console.log(api.decode(bufData))

    const finalData = encodeData(apiName, bufData, RequestID);
    $WS.send(finalData, RequestID, api, (res) => {
      resolve(res);
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
