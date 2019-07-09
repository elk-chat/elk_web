import { EventEmitter, EventEmitterClass, Call } from 'basic-helper';
import { decodeData, messageResHandler } from '../handler';
import { RECEIVE_STATE_UPDATE, CONNECT_READY } from '../constant';

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

interface UnSendEntity {
  [requestID: string]: {
    success: Function;
    fail: Function;
    buffer: ArrayBuffer;
  };
}

const onOpenMark = 'onOpen';
const onMessageMark = 'onMessage';

function wrapWSUrl(hostname) {
  if (!/wss?:\/\//.test(hostname)) {
    console.warn('websocket host 不正确', hostname);
  }
  return hostname;
}

class SocketHelper extends EventEmitterClass {
  socket!: WebSocket | null;

  params!: SocketParams;

  connected: boolean = false;

  connecting: boolean = false;

  reqQueue: {} = {};

  sendQueue: UnSendEntity = {};

  constructor(params: SocketParams) {
    super();
    this.params = params;
    this.initWS();
  }

  initWS = () => {
    if (this.connecting) return;
    this.connecting = true;
    const { apiHost } = this.params;
    if (!apiHost) {
      console.error('请传入 apiHost');
      return;
    }
    const wsApiHost = wrapWSUrl(apiHost);
    this.socket = new WebSocket(wsApiHost);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onErr;
    this.socket.onclose = this.onClose;
  }

  before = data => data;

  after = data => data.Data;

  resStatusFilter = data => !data.Data.Code

  setReqQuquq = (requestID, success, fail) => {
    this.reqQueue[requestID.toString()] = {
      success,
      fail,
    };
  }

  getReqQueue = requestID => this.reqQueue[requestID.toString()] || {}

  send = (
    buffer: ArrayBuffer, requestID: BigInt,
    success: Function, fail: Function
  ) => {
    if (!this.connected) {
      console.error('尚未连接');
      this.sendQueue[requestID.toString()] = {
        buffer, success, fail
      };
      this.initWS();
    } else {
      const wrapData = this.before(buffer);
      this.socket.send(wrapData);
      this.setReqQuquq(requestID, success, fail);
    }
  }

  /**
   * 在 onopen 的时候发送在未 open 时候发送请求
   */
  sendNotCom = () => {
    const unSendList = Object.keys(this.sendQueue);
    if (unSendList.length === 0) return;
    unSendList.forEach((requestID) => {
      const item = this.sendQueue[requestID];
      const {
        buffer, success, fail
      } = item;
      this.send(buffer, BigInt(requestID), success, fail);
      delete this.sendQueue[requestID];
    });
  }

  onOpen = () => {
    // this.params.onOpen();
    this.connected = true;
    this.connecting = false;
    this.emit(onOpenMark, {});
    this.emit(CONNECT_READY, {});
    this.sendNotCom();
  }

  onMessage = (event) => {
    const { data } = event;
    const decodedData = decodeData(data);
    const { RequestID } = decodedData;
    const finalData = messageResHandler(decodedData);
    if (RequestID === BigInt(0)) {
      /** 来自推送的消息 */
      EventEmitter.emit(RECEIVE_STATE_UPDATE, finalData.Data);
    } else {
      const currReq = this.getReqQueue(RequestID);
      const { success, fail } = currReq;
      const isSuccess = this.resStatusFilter(finalData);
      const nextData = this.after(finalData);
      Call(isSuccess ? success : fail, nextData);
      this.emit(onMessageMark, nextData);
    }
  }

  onErr = (e) => {
    this.connected = false;
    console.log(e, 'onErr');
  }

  onClose = (e) => {
    this.connected = false;
    this.socket = null;
    console.log(e, 'onClose');
  }
}

export default SocketHelper;
