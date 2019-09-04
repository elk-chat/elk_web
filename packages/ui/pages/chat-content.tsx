import React from 'react';
import JSBI from 'jsbi';
import {
  EventEmitter, DebounceClass, UUID, HasValue
} from 'basic-helper';
import { Icon } from 'ukelli-ui/core/icon';
import {
  ChatItemEntity, ChatContentState, UserInfo, FEContentType,
  FEMessageType, ChatContentStateInfo, ChatContentItem
} from '@little-chat/core/types';
import {
  selectContact, RECEIVE_CHAT_MESSAGE, ON_READ_CHAT_MESSAGE
} from '@little-chat/core/actions';
import { chatContentFilter } from '@little-chat/utils/chat-data-filter';
import {
  UploadFile, ReadMsg, CheckMsgReadState, QueryChatMsgsByCondition,
  SyncChatMessage, SendMsg
} from '@little-chat/sdk';
import { kproto } from '@little-chat/sdk/lib';
import Link from '../components/nav-link';
import Editor from '../components/editor';
import {
  ImageReader,
  GetImgInfo,
} from '../utils/image-reader';
import mergeChatContent from '../utils/merge-chat-content';
import ChatMsgRender from '../components/chat-msg-render';

interface ChatContentProps {
  selectContact: typeof selectContact;
  onQueryHistory: Function;
  selectedChat: ChatItemEntity;
  userInfo: UserInfo;
}

interface State {
  pIdx: number;
  loadingChat: boolean;
  // sendingMsg: {
  //   [msgID: string]: any;
  // };
  readState: any;
  currChatContentData?: ChatContentStateInfo;
  paging: {};
}

interface CacheState {
  [chatID: string]: State;
}

interface SendingMsgItem extends ChatContentItem {
  MessageID?;
  Image?;
  State?;
  msgStatus?: 'sending' | 'done' | 'timeout';
}
interface SendingQueue {
  [requestID: string]: SendingMsgItem;
}

const debounce = new DebounceClass();
const ChatContentCache: ChatContentState = {};

const prevPageSize = 10;
const firstPageIdx = 3;
const firstPageSize = prevPageSize * firstPageIdx;

const CACHE_STATE: CacheState = {};

const DefaultState = {
  pIdx: 0,
  loadingChat: true,
  currChatContentData: undefined,
  // sendingMsg: {},
  paging: {}
};

// eslint-disable-next-line arrow-body-style
const getCacheState = (chatID) => {
  return chatID ? CACHE_STATE[chatID] || DefaultState : DefaultState;
};
const setCacheState = (chatID, nextState) => {
  CACHE_STATE[chatID] = nextState;
};
const GenClientMsgID = () => UUID(16);

export default class ChatContent extends React.PureComponent<ChatContentProps, State> {
  static RightBtns = (props) => {
    const { selectedChat } = props;
    return selectedChat.ChatID && (
      <Link
        Com="ChatDetail"
        Title="聊天详情"
        className="add-btn action"
        params={{
          ChatID: selectedChat.ChatID.toString()
        }}>
        <Icon n="ellipsis-h" />
      </Link>
    );
  }

  isAddDrapListener: boolean = false;

  page: number = 0;

  sendingQueue: SendingQueue = {}

  StateRead;

  lastScrollTop!: number;

  planningImgList = [];

  scrollContent!: HTMLDivElement | null;

  drapPanel!: HTMLElement | null;

  previewGroup!: HTMLElement | null;

  textContent!: HTMLDivElement | null;

  msgPanelContainer!: HTMLDivElement | null;

  editorDOM!: HTMLDivElement | null;

  msgPanel!: HTMLInputElement | null;

  editorPanel!: React.RefObject<HTMLDivElement>;

  prevPadding!: number;

  msgPanelHeight!: number;

  currScrollTop!: number;

  msgHeightInfo: {
    [chatIdx: string]: number;
  } = {};

  __mount = false;

  constructor(props: ChatContentProps) {
    super(props);
    const chatIDStr = props.ChatID.toString();
    this.state = getCacheState(chatIDStr);
    this.editorPanel = React.createRef();
  }

  componentDidMount() {
    this.initData();
    this.__mount = true;
    EventEmitter.on(RECEIVE_CHAT_MESSAGE, this.handleReceiveMsg);
    EventEmitter.on(ON_READ_CHAT_MESSAGE, this.handleReadMsg);
  }

  componentWillUnmount() {
    this.props.selectChat('');
    this.__mount = false;
    EventEmitter.rm(RECEIVE_CHAT_MESSAGE, this.handleReceiveMsg);
    EventEmitter.rm(ON_READ_CHAT_MESSAGE, this.handleReadMsg);
    this.unbindScrolling();
  }

  initData = () => {
    const {
      selectChat, ChatID
    } = this.props;
    const { currChatContentData } = this.state;
    selectChat(ChatID);
    if (!currChatContentData) {
      QueryChatMsgsByCondition({
        Paging: {
          PageSize: firstPageSize,
          PageIndex: 0
        },
        Condition: {
          ChatID,
          MessageTypes: [FEMessageType.SendMessage, FEMessageType.AddMember]
        }
      })
        .then(({ StateUpdates, Paging }) => {
          this.handleReceiveData(StateUpdates, Paging, firstPageIdx);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      SyncChatMessage({
        ChatID,
        State: currChatContentData.lastState
      })
        .then(({ StateUpdates }) => {
          this.handleReceiveData(StateUpdates);
        });
    }
  }

  handleReadMsg = ({ State }) => {
    this.setState({
      readState: State
    });
  }

  handleReceiveData = (
    chatContentData: ChatContentItem[], nextPaging = this.state.paging,
    nextPagIdx = this.state.pIdx, callback?
  ) => {
    const { ChatID, userInfo } = this.props;
    const chatID = ChatID.toString();
    if (!ChatContentCache[chatID]) {
      ChatContentCache[chatID] = {
        lastState: 0,
        lastData: {},
        data: []
      };
    }
    const currChatContent = ChatContentCache[chatID].data;
    const nextContent = mergeChatContent(currChatContent, chatContentData);
    const lastData = nextContent[nextContent.length - 1] || {};
    const lastState = lastData.State;
    ChatContentCache[chatID] = {
      data: nextContent,
      lastState,
      lastData,
    };
    if (this.__mount) {
      CheckMsgReadState({
        ChatID
      }).then((res) => {
        const { StateRead, OwnStateRead } = res;
        const nextState = {
          currChatContentData: ChatContentCache[chatID],
          paging: nextPaging,
          readState: StateRead,
          pIdx: nextPagIdx,
          loadingChat: false,
        };
        this.setState(nextState, callback);
        setCacheState(chatID, nextState);
        /** 过滤自己的信息，不发送已读消息 */
        const isMyMsg = chatContentFilter(lastData).SenderName === userInfo.UserName;
        if (!isMyMsg && HasValue(OwnStateRead)
          && !!lastState
          && +String(OwnStateRead) < +String(lastState)) {
          this.readMsg(lastState);
        }
      });
    }
  }

  handleReceiveMsg = ({ chatID, chatContent }) => {
    const { selectedChat } = this.props;
    const chatIDStr = chatID.toString();
    if ((String(selectedChat.ChatID) !== chatIDStr)) return;
    this.handleReceiveData(chatContent, undefined, undefined, () => {
      setTimeout(() => {
        this.renewMsgPanelHeight();
        this.delayScrollToBottom();
      }, 10);
    });
  }

  readMsg = (StateRead) => {
    const { selectedChat } = this.props;
    const { currChatContentData } = this.state;
    if (!currChatContentData) return;
    const { lastState = 0 } = currChatContentData;
    if (StateRead) {
      ReadMsg({
        ChatID: selectedChat.ChatID,
        StateRead: lastState
      });
    }
  }

  delayScrollToBottom = () => {
    debounce.exec(() => this.scrollToBottom(), 50);
  }

  editorPaste = (event: React.ClipboardEvent<HTMLElement>) => {
    const E = event;
    event.preventDefault();
    const { items } = event.clipboardData || event.originalEvent.clipboardData;

    const text = E.clipboardData.getData('Text');

    this.handlePasteImg(items)
      .then()
      .catch(() => {
        const nextText = this.getTextContent() + text;
        this.setTextContent(nextText);
      });
  }

  scrollToBottom = () => {
    this.scrollTo(this.msgPanelHeight);
  }

  scrollTo = (scrollToTop) => {
    if (this.scrollContent) {
      this.scrollContent.scrollTop = scrollToTop;
    }
  }

  handlePasteImg = (items: DataTransferItemList) => new Promise((resolve, reject) => {
    GetImgInfo(items)
      .then((res) => {
        this.uploadFile(res);
        resolve();
      })
      .catch(reject);
  })

  loadFileFromInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files.length !== 0) {
      ImageReader(e.target.files[0]).then((res) => {
        this.uploadFile(res);
      });
    }
  }

  uploadFile = async (uploadParams: {
    fileInfo: {
      name: string;
      width: number;
      height: number;
    };
    buffer: Uint8Array;
    file: File;
  }) => {
    const { fileInfo, buffer, file } = uploadParams;
    const { selectedChat } = this.props;
    const uint8 = new Uint8Array(buffer);
    const msgClientID = GenClientMsgID();
    /** 把图片设置到正在发送的消息队列中 */
    this.setSendingMsg({
      msgStatus: 'sending',
      Image: URL.createObjectURL(file)
    });
    const { File } = await UploadFile({
      ChatID: selectedChat.ChatID,
      ContentType: FEContentType.Image,
      FileName: fileInfo.name,
      Caption: '',
      Width: fileInfo.width,
      Height: fileInfo.height,
      Data: uint8,
    });
    if (File) this.onSendMsg(File.FileID, FEContentType.Image, msgClientID);
  }

  setSendingMsg = (sendingMsg: SendingMsgItem, callback?) => {
    const { userInfo } = this.props;
    const { ClientMessageID, MessageID } = sendingMsg;
    if (!this.sendingQueue[ClientMessageID]) {
      this.sendingQueue[ClientMessageID] = {};
    }
    Object.assign(this.sendingQueue[ClientMessageID], sendingMsg, {
      SenderName: userInfo.UserName,
      ActionTime: Date.now() / 1000
    });
    const receiveData = this.sendingQueue[ClientMessageID];
    this.handleReceiveData([receiveData]);
  }

  onSendMsg = (
    msg,
    contentType: FEContentType = FEContentType.Text,
    msgClientID = GenClientMsgID()
  ) => {
    const { selectedChat } = this.props;
    const _msg = String(msg).trim();
    const sendMsgData = {
      ChatID: selectedChat.ChatID,
      ContentType: contentType,
      ClientMessageID: msgClientID,
      Message: _msg,
    };
    switch (contentType) {
      case FEContentType.Text:
        if (_msg === '') return;
        /** 设置正在发送的消息队列 */
        const sendingData = Object.assign({}, sendMsgData, {
          msgStatus: 'sending',
          MessageType: FEMessageType.SendMessage,
          State: +this.state.currChatContentData.lastState + 1
        });
        this.setSendingMsg(sendingData);
        break;
      case FEContentType.Image:
        sendMsgData.FileID = _msg;
        break;
    }

    this.delayScrollToBottom();

    SendMsg({ ChatMessage: sendMsgData }, JSBI.BigInt(msgClientID))
      .then(({ RequestID, MessageID, State }) => {
        /** 发送成功后，把正在发送队列消息删除 */
        const nextSendingState = Object.assign({}, this.sendingQueue[RequestID], {
          msgStatus: 'done',
          MessageID
        });
        this.setSendingMsg(nextSendingState, () => this.scrollToBottom());
        // this.scrollToBottom();
      })
      .catch((e) => {
        console.log(e);
      });

    this.setTextContent('');
  }

  saveMsgPanel = (e) => { this.msgPanel = e; };

  setTextContent = (nextContent) => {
    if (this.editorPanel && this.editorPanel.current) {
      this.editorPanel.current.innerHTML = nextContent;
    }
  }

  getTextContent = () => {
    let res = '';
    if (this.editorPanel && this.editorPanel.current) {
      res = this.editorPanel.current.textContent || '';
      res = res.replace(/<div>/gi, '<br>').replace(/<\/div>/gi, '');
    }
    return res;
  }

  editorFocus = e => this.delayScrollToBottom()

  editorDidMount = (editorDOM) => {
    this.editorDOM = editorDOM;
    if (editorDOM) this.delayScrollToBottom();
  }

  editorKeyPress = (e) => {
    // TODO: 实现 command + enter 换行
    if (e.charCode === 13) {
      e.preventDefault();
      this.onSendMsg(this.getTextContent(), FEContentType.Text);
    }
  }

  editorClickToSend = (e) => {
    this.onSendMsg(this.getTextContent(), FEContentType.Text);
  }

  renewMsgPanelHeight = () => {
    if (this.msgPanelContainer) {
      this.msgPanelHeight = this.msgPanelContainer.offsetHeight;
    }
  }

  handleImgLoad = () => {
    this.renewMsgPanelHeight();
    if (this.currScrollTop < this.msgPanelHeight) {
      this.delayScrollToBottom();
    }
  }

  saveScrollContent = (e) => {
    this.scrollContent = e;
    this.bindScrolling();
    if (e) {
      this.scrollToBottom();

      if (!e.classList.contains('ready')) {
        setTimeout(() => {
          e.classList.add('ready');
        }, 100);
      }
    }
  }

  bindScrolling = () => {
    if (!this.scrollContent) return;
    this.scrollContent.addEventListener('scroll', this.handleScrolling);
  }

  unbindScrolling = () => {
    if (!this.scrollContent) return;
    this.scrollContent.removeEventListener('scroll', this.handleScrolling);
  }

  handleScrolling = (e) => {
    const { target } = e;
    if (e.currentTarget !== target) return;
    const currScrollOffset = target.scrollTop;
    if (currScrollOffset === this.lastScrollTop) return;

    this.lastScrollTop = currScrollOffset;

    if (currScrollOffset === 0) {
      // e.stopPropagation();
      // 移动到顶部，获取历史消息
      this.queryHistory();
    }
  }

  queryHistory = () => {
    const { ChatID } = this.props;
    const { pIdx } = this.state;
    const currMsgPanelHeight = this.msgPanelHeight;

    QueryChatMsgsByCondition({
      Paging: {
        PageSize: prevPageSize,
        PageIndex: pIdx
      },
      Condition: {
        ChatID,
        MessageTypes: [FEMessageType.SendMessage, FEMessageType.AddMember]
      }
    })
      .then(({ StateUpdates, Paging }) => {
        const nextPIdx = pIdx + 1;
        this.handleReceiveData(StateUpdates, Paging, nextPIdx, () => {
          // 让滚动条保持在用户浏览加载的部分
          this.renewMsgPanelHeight();
          const scrollDiff = this.msgPanelHeight - currMsgPanelHeight;
          this.scrollTo(scrollDiff);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveMsgPanelContainer = (e) => {
    this.msgPanelContainer = e;
    if (e) {
      this.msgPanelHeight = e.offsetHeight;
    }
  }

  render() {
    const { selectedChat, userInfo } = this.props;
    const { currChatContentData, readState } = this.state;
    if (!currChatContentData) return null;

    return (
      <section className="chat-panel-container">
        <div className="scroll-content" ref={this.saveScrollContent}>
          <div className="msg-panel-container" ref={this.saveMsgPanelContainer}>
            <ChatMsgRender
              readState={readState}
              currChatContentData={currChatContentData}
              selectedChat={selectedChat}
              userInfo={userInfo}
              onImgLoad={this.handleImgLoad} />
          </div>
        </div>
        <Editor
          didMount={this.editorDidMount}
          onPaste={this.editorPaste}
          onFocus={this.editorFocus}
          // onInput={this.editorInput}
          onClickSendBtn={this.editorClickToSend}
          onSelectedImg={this.loadFileFromInput}
          onKeyPress={this.editorKeyPress}
          ref={this.editorPanel} />
      </section>
    );
  }
}
