import SocketHelper from './socket';

interface Params {
  apiHost: string;
}

let $WS: SocketHelper;

function GetWS() {
  if (!$WS) console.error('请先调用 InitSDK');
  return $WS;
}

function WSSend(buf: Uint8Array) {
  if (!$WS) console.error('请先调用 InitSDK');
  $WS.send(buf);
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
