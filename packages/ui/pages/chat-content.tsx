import React from 'react';
import JSBI from 'jsbi';
import {
  EventEmitter, DebounceClass, UUID
} from 'basic-helper';
import { Icon } from 'ukelli-ui/core/icon';
import {
  ChatItemEntity, ChatContentState, UserInfo, FEContentType,
  FEMessageType, ChatContentStateInfo
} from '@little-chat/core/types';
import {
  selectContact, RECEIVE_CHAT_MESSAGE
} from '@little-chat/core/actions';
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
  sendingMsg: {
    [msgID: string]: any;
  };
  currChatContentData: ChatContentStateInfo;
  paging: {};
}

const debounce = new DebounceClass();
const ChatContentCache: ChatContentState = {};

const prevPageSize = 10;
const firstPageIdx = 3;
const firstPageSize = prevPageSize * firstPageIdx;

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
    this.state = {
      pIdx: 0,
      loadingChat: true,
      currChatContentData: ChatContentCache[chatIDStr],
      sendingMsg: {},
      paging: {}
    };
    this.editorPanel = React.createRef();
  }

  componentDidMount() {
    this.initData();
    this.__mount = true;
    EventEmitter.on(RECEIVE_CHAT_MESSAGE, this.handleReceiveMsg);
  }

  componentWillUnmount() {
    this.props.selectChat('');
    this.__mount = false;
    EventEmitter.rm(RECEIVE_CHAT_MESSAGE, this.handleReceiveMsg);
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

  handleReceiveData = (
    chatContentData, nextPaging = this.state.paging, nextPagIdx = this.state.pIdx, callback?
  ) => {
    const { ChatID } = this.props;
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
      this.setState({
        currChatContentData: ChatContentCache[chatID],
        paging: nextPaging,
        pIdx: nextPagIdx,
        loadingChat: false,
      }, callback);
      CheckMsgReadState({
        ChatID
      }).then((res) => {
        const { StateRead } = res;
        if (StateRead && lastState && +StateRead.toString() < +lastState.toString()) {
          this.readMsg(lastState);
        }
      });
    }
  }

  handleReceiveMsg = ({ chatID, chatContent }) => {
    const { selectedChat } = this.props;
    const chatIDStr = chatID.toString();
    if (selectedChat.ChatID && (selectedChat.ChatID.toString() !== chatIDStr)) return;
    /** 如果该页面在激活状态，则发送已读请求 */
    const { currChatContentData } = this.state;
    const lastData = chatContent[0];
    const lastState = lastData.State;
    this.readMsg(lastState);

    /** 设置最后消息的状态 */
    this.setState({
      currChatContentData: {
        lastData,
        lastState,
        data: [...currChatContentData.data, ...lastData],
      }
    }, () => {
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
    const msgClientID = UUID();
    /** 把图片设置到正在发送的消息队列中 */
    this.setSendingMsg({
      [msgClientID]: { Image: URL.createObjectURL(file) },
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
    this.onSendMsg(File.FileID, FEContentType.Image, msgClientID);
  }

  setSendingMsg = (sendingMsg, callback?) => {
    this.setState({
      sendingMsg
    }, callback);
  }

  onSendMsg = (msg, contentType: FEContentType = FEContentType.Text, msgClientID = UUID()) => {
    const { selectedChat } = this.props;
    const _msg = String(msg).trim();
    const sendMsgData: kproto.IChatSendMessageResp = {
      ChatID: selectedChat.ChatID,
      ContentType: contentType,
      Message: _msg,
    };
    switch (contentType) {
      case FEContentType.Text:
        if (_msg === '') return;
        /** 设置正在发送的消息队列 */
        const { sendingMsg } = this.state;
        const nextSendingState = Object.assign({}, sendingMsg, {
          [msgClientID]: sendMsgData
        });
        this.setSendingMsg(nextSendingState);
        break;
      case FEContentType.Image:
        sendMsgData.FileID = _msg;
        break;
    }

    this.delayScrollToBottom();

    SendMsg(sendMsgData, JSBI.BigInt(msgClientID))
      .then(({ RequestID }) => {
        /** 发送成功后，把正在发送队列消息删除 */
        const { sendingMsg } = this.state;
        const nextSendingState = Object.assign({}, sendingMsg);
        delete nextSendingState[msgClientID];
        this.setSendingMsg(nextSendingState, () => this.scrollToBottom());
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
    const { currChatContentData, loadingChat, sendingMsg } = this.state;
    if (!currChatContentData) return null;

    return (
      <section className="chat-panel-container">
        <div className="scroll-content" ref={this.saveScrollContent}>
          <div className="msg-panel-container" ref={this.saveMsgPanelContainer}>
            <ChatMsgRender
              sendingMsg={sendingMsg}
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
