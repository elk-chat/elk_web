import React from 'react';
import {
  EventEmitter, DebounceClass
} from 'basic-helper';
import { Icon } from 'ukelli-ui/core/icon';
import { Loading } from 'ukelli-ui/core/loading';
import {
  ChatItemEntity, ChatContentState, UserInfo, FEContentType,
  FEMessageType, ChatContentStateInfo
} from '@little-chat/core/types';
import {
  selectContact, applySendMsg,
  RECEIVE_CHAT_MESSAGE
} from '@little-chat/core/actions';
import {
  UploadFile, ReadMsg, CheckMsgReadState, QueryChatMsgsByCondition,
  SyncChatMessage
} from '@little-chat/sdk';
import Link from '../components/nav-link';
import Editor from '../components/editor';
import {
  ImageReader,
  GetImgInfo,
} from '../utils/image-reader';
import mergeChatContent from '../utils/merge-chat-content';
import ChatMsgRender from '../components/chat-msg-render';

interface ChatContentProps {
  applySendMsg: typeof applySendMsg;
  selectContact: typeof selectContact;
  onQueryHistory: Function;
  selectedChat: ChatItemEntity;
  userInfo: UserInfo;
}

interface State {
  page: number;
  limit: number;
  msgPanelHeight: number;
  loadingChat: boolean;
  currChatContentData: ChatContentStateInfo;
  paging: {};
}

const debounce = new DebounceClass();
const ChatContentCache: ChatContentState = {};

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

  constructor(props: ChatContentProps) {
    super(props);
    this.page = 0;
    const chatIDStr = props.ChatID.toString();
    this.state = {
      page: 0,
      limit: 12,
      loadingChat: true,
      currChatContentData: ChatContentCache[chatIDStr],
      paging: {}
    };
    this.editorPanel = React.createRef();
  }

  componentDidMount() {
    this.initData();
    EventEmitter.on(RECEIVE_CHAT_MESSAGE, this.handleReceiveMsg);
  }

  componentWillUnmount() {
    this.props.selectChat('');
    EventEmitter.rm(RECEIVE_CHAT_MESSAGE, this.handleReceiveMsg);
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
          PageSize: 100,
          PageIndex: 0
        },
        Condition: {
          ChatID,
          MessageTypes: [FEMessageType.SendMessage, FEMessageType.AddMember]
        }
      })
        .then(({ StateUpdates, Paging }) => {
          this.handleReceiveData(StateUpdates, Paging);
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

  handleReceiveData = (chatContentData, nextPaging = this.state.paging) => {
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
    this.setState({
      currChatContentData: ChatContentCache[chatID],
      paging: nextPaging,
      loadingChat: false,
    });
    CheckMsgReadState({
      ChatID
    }).then((res) => {
      const { StateRead } = res;
      if (StateRead && lastState && +StateRead.toString() < +lastState.toString()) {
        this.readMsg(lastState);
      }
    });
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
        this.handleScroll();
      }, 10);
    });
  }

  handleScroll = () => {
    debounce.exec(() => this.scrollToBottom(this.scrollContent), 100);
  }

  handlePasteImg = (items: DataTransferItemList) => new Promise((resolve, reject) => {
    GetImgInfo(items).then(({ buffer, fileInfo }) => {
      this.uploadFile({
        buffer,
        fileInfo
      });
      resolve();
    }).catch(reject);
  })

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

  readMsg = (StateRead) => {
    const { selectedChat } = this.props;
    const { currChatContentData } = this.state;
    if (!currChatContentData) return;
    const { lastState = 0 } = currChatContentData;
    if (StateRead) {
      // const readStateNum = +(StateRead.toString());
      // const lastStateNum = +(lastState.toString());
      // console.log('ReadMsg');
      // console.log(readStateNum, 'readStateNum');
      // console.log(lastStateNum, 'lastStateNum');
      ReadMsg({
        ChatID: selectedChat.ChatID,
        StateRead: lastState
      });
    }
  }

  scrollToBottom = (e: HTMLDivElement | null) => {
    this.scrollContent = this.scrollContent || e;
    if (e) {
      setTimeout(() => {
        this.currScrollTop = this.msgPanelHeight;
        e.scrollTop = this.msgPanelHeight;
        if (!e.classList.contains('ready')) {
          setTimeout(() => {
            e.classList.add('ready');
          }, 100);
        }
      }, 10);
    }
  }

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
  }) => {
    const { fileInfo, buffer } = uploadParams;
    const { selectedChat } = this.props;
    const uint8 = new Uint8Array(buffer);
    const { File } = await UploadFile({
      ChatID: selectedChat.ChatID,
      ContentType: FEContentType.Image,
      FileName: fileInfo.name,
      Caption: '',
      Width: fileInfo.width,
      Height: fileInfo.height,
      Data: uint8,
    });
    this.onSendMsg(File.FileID, FEContentType.Image);
  }

  onSendMsg = (msg, contentType: FEContentType = FEContentType.Text) => {
    let _msg;
    switch (contentType) {
      case FEContentType.Text:
        _msg = msg.trim();
        break;
      case FEContentType.Image:
        _msg = msg;
        break;
    }
    if (_msg === '') return;
    const { selectedChat } = this.props;
    const { currChatContentData } = this.state;

    const sendMsgData = Object.assign({}, {
      ChatID: selectedChat.ChatID,
      ContentType: contentType,
      Message: _msg,
      lastState: currChatContentData.lastState
    }, contentType === FEContentType.Image ? {
      FileID: _msg,
    } : null);

    this.props.applySendMsg(sendMsgData);

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
      res = this.editorPanel.current.innerHTML;
    }
    return res;
  }

  editorFocus = e => this.scrollToBottom(this.scrollContent)

  editorDidMount = (editorDOM) => {
    this.editorDOM = editorDOM;
    if (editorDOM) this.scrollToBottom(this.scrollContent);
  }

  editorInput = (e) => {
    this.scrollToBottom(this.scrollContent);
  }

  editorKeyPress = (e) => {
    // TODO: 实现 command + enter 换行
    if (e.charCode === 13) {
      e.preventDefault();
      let { textContent } = e.target;
      // let val = e.target.innerHTML;
      textContent = textContent.replace(/<div>/gi, '<br>').replace(/<\/div>/gi, '');
      this.onSendMsg(textContent, FEContentType.Text);
    }
  }

  editorClickToSend = (e) => {
    this.onSendMsg(this.editorPanel.current.innerHTML, FEContentType.Text);
  }

  renewMsgPanelHeight = () => {
    if (this.msgPanelContainer) {
      this.msgPanelHeight = this.msgPanelContainer.offsetHeight;
    }
  }

  handleImgLoad = () => {
    this.renewMsgPanelHeight();
    if (this.currScrollTop < this.msgPanelHeight) {
      this.scrollToBottom(this.scrollContent);
    }
  }

  render() {
    const { selectedChat, userInfo } = this.props;
    const { currChatContentData, loadingChat } = this.state;
    if (!currChatContentData) return null;
    const chatPanelContainer = (
      <div className="msg-panel-container" ref={(e) => {
        this.msgPanelContainer = e;
        if (e) {
          this.msgPanelHeight = e.offsetHeight;
        }
      }}>
        <ChatMsgRender
          currChatContentData={currChatContentData}
          selectedChat={selectedChat}
          userInfo={userInfo}
          onImgLoad={this.handleImgLoad} />
      </div>
    );

    return (
      <section className="chat-panel-container">
        <div className="scroll-content" ref={this.scrollToBottom}>
          {chatPanelContainer}
        </div>
        <Editor
          didMount={this.editorDidMount}
          onPaste={this.editorPaste}
          onFocus={this.editorFocus}
          onInput={this.editorInput}
          onClickSendBtn={this.editorClickToSend}
          onSelectedImg={this.loadFileFromInput}
          onKeyPress={this.editorKeyPress}
          ref={this.editorPanel} />
      </section>
    );
  }
}
