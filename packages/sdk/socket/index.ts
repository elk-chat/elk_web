import JSBI from 'jsbi';
import { EventEmitter, EventEmitterClass, Call } from 'basic-helper';
import { decodeData, encodeData, messageResHandler } from '../handler';
import { RECEIVE_STATE_UPDATE, CONNECT_READY, ON_CONNECT_CLOSE } from '../constant';

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
  apiName: string;
  bufData: Uint8Array;
  requestID: typeof JSBI.BigInt;
  success: Function;
  fail: Function;
  needAuth: boolean;
}

interface UnSendEntity {
  [requestID: string]: SendOptions;
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

  isClosed: boolean = true;

  permissions: boolean = false;

  reqQueue: {} = {};

  unSendQueue: UnSendEntity = {};

  permissionsQueue: UnSendEntity = {};

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

  setPermissions = (permissions) => {
    this.permissions = permissions;
    if (permissions) {
      this.sendNotComplete(this.permissionsQueue);
    }
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

  clearQueue = () => {
    this.reqQueue = {};
    this.permissionsQueue = {};
  }

  getReqQueue = requestID => this.reqQueue[requestID.toString()] || {}

  send = (sendOptions: SendOptions) => {
    const {
      apiName, bufData, requestID,
      success, fail, needAuth
    } = sendOptions;
    if (needAuth && !this.permissions) {
      /**
       * 如果改 api 需要通过权限验证后才能发送的
       * 但是实际还没有通过权限验证的时候，把发送实体放入待验证权限队列中
       */
      this.permissionsQueue[requestID.toString()] = sendOptions;
    } else if (!this.connected) {
      /**
       * 如果还没 onOpen 打开的，放入待发送队列中
       */
      // console.error('尚未连接');
      this.unSendQueue[requestID.toString()] = sendOptions;
      if (!this.isClosed) this.initWS();
    } else if (this.socket) {
      const buffer = encodeData(apiName, bufData, requestID);
      const wrapData = this.before(buffer);
      this.socket.send(wrapData);
      this.setReqQuquq(requestID, success, fail);
    }
  }

  sendDirect = (sendOptions: SendOptions) => {
    const {
      apiName, bufData, requestID,
      success, fail
    } = sendOptions;
    if (this.socket) {
      const buffer = encodeData(apiName, bufData, requestID);
      const wrapData = this.before(buffer);
      this.socket.send(wrapData);
      this.setReqQuquq(requestID, success, fail);
    }
  }

  /**
   * 在 onopen 的时候发送在未 open 时候发送请求
   */
  sendNotComplete = (queue: UnSendEntity) => {
    const unSendList = Object.keys(queue);
    if (unSendList.length === 0) return;
    unSendList.forEach((requestID) => {
      const sendOptions = queue[requestID];
      this.send(sendOptions);
      delete queue[requestID];
    });
  }

  onOpen = () => {
    // this.params.onOpen();
    this.connected = true;
    this.connecting = false;
    this.emit(onOpenMark, {});
    this.emit(CONNECT_READY, {});
    this.sendNotComplete(this.unSendQueue);
    this.isClosed = false;
  }

  onMessage = (event) => {
    const { data } = event;
    const decodedData = decodeData(data);
    const { RequestID } = decodedData;
    const finalData = messageResHandler(decodedData);
    const emitData = this.after(finalData);
    emitData.RequestID = String(RequestID);
    if (String(RequestID) === '0') {
      /** 消息处理错误 */
      if (emitData.Code) {
        throw Error(emitData.Message);
      } else {
        /** 来自推送的消息 */
        EventEmitter.emit(RECEIVE_STATE_UPDATE, emitData);
      }
    } else {
      const currReq = this.getReqQueue(RequestID);
      const { success, fail } = currReq;
      const isSuccess = this.resStatusFilter(finalData);
      Call(isSuccess ? success : fail, emitData);
      this.emit(onMessageMark, emitData);
    }
  }

  onErr = (e) => {
    console.log('onErr');
    /** 如果发生错误，则主动关闭 websocket 链接 */
    this.socket && this.socket.close();
  }

  onClose = (e) => {
    console.log('onClose');
    this.handleException(e);
  }

  handleException = (event) => {
    this.connected = false;
    this.permissions = false;
    this.socket = null;
    this.isClosed = true;
    this.clearQueue();
    EventEmitter.emit(ON_CONNECT_CLOSE, event);
  }
}

export default SocketHelper;
