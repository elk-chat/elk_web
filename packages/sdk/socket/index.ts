import { EventEmitterClass } from 'basic-helper';

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
const onOpenMark = 'onOpen';
const onMessageMark = 'onMessage';

function wrapWSUrl(hostname) {
  return `ws://${hostname}`;
}

class SocketHelper extends EventEmitterClass {
  socket!: WebSocket;

  params!: SocketParams;

  connecting: boolean = false;

  constructor(params: SocketParams) {
    super();
    const { apiHost } = params;
    this.params = params;
    if (apiHost) {
      this.initWS(apiHost);
    } else {
      console.error('请传入 apiHost');
    }
  }

  initWS = (apiHost) => {
    const wsApiHost = wrapWSUrl(apiHost);
    this.socket = new WebSocket(wsApiHost);
    // this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onErr;
    this.socket.onclose = this.onClose;
  }

  before = data => data;

  after = data => data;

  send = (data: any) => {
    if (!this.connecting) {
      console.error('链接已中断');
    } else {
      const wrapData = this.before(data);
      this.socket.send(wrapData);
    }
  }

  onOpen = () => {
    // this.params.onOpen();
    this.connecting = true;
    this.emit(onOpenMark, {});
  }

  onMessage = (event) => {
    console.log(event, 'onMessage');
    // this.params.onMessage(event);
    const nextData = this.after(event);
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
