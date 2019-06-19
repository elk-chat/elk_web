import { EventEmitterClass, Call } from 'basic-helper';
import { decodeAgent } from '../lib';

interface SocketParams {
  /** 链接的 apiHost */
  apiHost: string;
  /** ws 发送请求前的 hook */
  beforeWSHook?: (any) => any;
  /** ws onmessage 时的 hook */
  afterWSHook?: (any) => any;
  /** 打开 socket 链接 */
  onOpen?: () => void;
  /** 失败 */
  onErr?: () => void;
  onMessage?: (event: MessageEvent) => void;
}
interface SendOptions {
  requestID: number;
}

const onOpenMark = 'onOpen';
const onMessageMark = 'onMessage';

function wrapWSUrl(hostname) {
  return `ws://${hostname}`;
}

class SocketHelper extends EventEmitterClass {
  socket!: WebSocket;

  params!: SocketParams;

  connecting: boolean = false;

  reqQueue: {} = {};

  constructor(params: SocketParams) {
    super();
    const { apiHost } = params;
    this.params = params;
    if (apiHost) {
      this.initWS(apiHost);
    } else {
      console.error('请传入 apiHost');
    }
    // this.send = this.send.bind(this);
  }

  initWS = (apiHost: string) => {
    const wsApiHost = wrapWSUrl(apiHost);
    this.socket = new WebSocket(wsApiHost);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onErr;
    this.socket.onclose = this.onClose;
  }

  before = data => data;

  after = data => data;

  send = (buffer: ArrayBuffer, requestID: number, api, callback: Function) => {
    if (!this.connecting) {
      console.error('链接已中断');
    } else {
      const wrapData = this.before(buffer);
      this.socket.send(wrapData);
      this.reqQueue[requestID] = {
        callback,
        api
      };
    }
    // this.socket.send(finalData);
    // return finalData;
  }

  onOpen = () => {
    // this.params.onOpen();
    this.connecting = true;
    this.emit(onOpenMark, {});
  }

  onMessage = (event) => {
    const { data } = event;
    const decodeResData = decodeAgent(data);
    const { RequestID } = decodeResData;
    const currReq = this.reqQueue[RequestID];
    const { api, callback } = currReq;
    const dataFromProtobuf = api.decode(decodeResData.data);
    // console.log(decodeResData, event, 'onMessage');
    // this.params.onMessage(event);
    const nextData = this.after(dataFromProtobuf);
    Call(callback, nextData);
    this.emit(onMessageMark, nextData);
  }

  onErr = (e) => {
    this.connecting = false;
    console.log(e, 'onErr');
  }

  onClose = (e) => {
    this.connecting = false;
    console.log(e, 'onClose');
  }
}

export default SocketHelper;
