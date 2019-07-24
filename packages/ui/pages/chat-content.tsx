import React from 'react';
import {
  HasValue, DateFormat, UUID, EventEmitter, DebounceClass
} from 'basic-helper';
import { Icon } from 'ukelli-ui/core/icon';
import * as ChatSDK from '@little-chat/sdk/lib';
// import { VariableSizeList as List } from 'react-window';
import {
  ChatItemEntity, ChatContentState, UserInfo, FEContentType,
  FEMessageType, ChatContentStateInfo
} from '@little-chat/core/types';
import {
  selectContact, applySendMsg, applySyncChatMessage,
  RECEIVE_CHAT_MESSAGE
} from '@little-chat/core/actions';
import {
  UploadFile, ReadMsg, CheckMsgReadState, QueryChatMsgsByCondition
} from '@little-chat/sdk';
import { chatContentFilter } from '@little-chat/utils/chat-data-filter';
import Link from '../components/nav-link';
import Editor from '../components/editor';
import Image from '../components/image';
import {
  ImageReader,
  GetImgInfo,
} from '../utils/image-reader';
import ChatAvatar from '../components/avatar';
import mergeChatContent from '../utils/merge-chat-content';

interface ChatContentProps {
  applySendMsg: typeof applySendMsg;
  selectContact: typeof selectContact;
  applySyncChatMessage: typeof applySyncChatMessage;
  onQueryHistory: Function;
  selectedChat: ChatItemEntity;
  // chatContentData: ChatContentState;
  // currChatContentData: ChatContentStateInfo;
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

const timeDisplayDelay = 5 * 60;

/** 对应 MessageType */
const MsgTypeClass = {
  1: 'send-msg',
  2: 'add-member',
};

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

  readState;

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
    selectChat(ChatID);
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
        const nextContent = mergeChatContent(currChatContent, StateUpdates);
        const lastData = nextContent[nextContent.length - 1] || {};
        ChatContentCache[chatID] = {
          data: nextContent,
          lastState: lastData.State,
          lastData,
        };
        this.setState({
          currChatContentData: ChatContentCache[chatID],
          paging: Paging,
          loadingChat: false,
        });
      });
    CheckMsgReadState({
      ChatID
    }).then((res) => {
      const { State } = res;
      this.readState = State;
    });
  }

  handleReceiveMsg = ({ chatID, chatContent }) => {
    const { selectedChat } = this.props;
    const chatIDStr = chatID.toString();
    if (selectedChat.ChatID && (selectedChat.ChatID.toString() !== chatIDStr)) return;
    const { currChatContentData } = this.state;
    const lastData = chatContent[0];
    this.setState({
      currChatContentData: {
        lastData,
        lastState: lastData.State,
        data: [...currChatContentData.data, ...chatContent],
      }
    }, () => {
      setTimeout(() => {
        this.renewMsgPanelHeight();
        this.handleScroll();
      }, 10);
    });
  }

  handleScroll = () => {
    debounce.exec(() => this.scrollToBottom(this.scrollContent), 300);
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

  readMsg = () => {
    const { selectedChat } = this.props;
    const { currChatContentData } = this.state;
    const { lastState = '' } = currChatContentData;
    if (this.readState) {
      const readStateNum = +(this.readState.State.toString());
      const lastStateNum = +(lastState.toString());
      if (readStateNum < lastStateNum) {
        ReadMsg({
          ChatID: selectedChat.ChatID,
          StateRead: lastState
        });
      }
    }
  }

  scrollToBottom = (e: HTMLDivElement | null) => {
    this.scrollContent = this.scrollContent || e;
    if (e) {
      setTimeout(() => {
        e.scrollTop = this.msgPanelHeight;
        if (!e.classList.contains('ready')) {
          setTimeout(() => {
            e.classList.add('ready');
          }, 100);
        }
      }, 10);
    }
    this.readMsg();
  }

  loadFileFromInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files.length !== 0) {
      ImageReader(files[0]).then((res) => {
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
    if (this.editorDOM) this.setMsgPanelPadding(this.editorDOM.offsetHeight);
  }

  getChatMsgs = () => {
    const {
      userInfo, selectedChat
    } = this.props;
    const { currChatContentData } = this.state;
    const { UsersRef } = selectedChat;
    const isGroupChat = selectedChat.ChatType === 1;
    const myName = userInfo.UserName;
    let prevTime = 0;
    const { data = [] } = currChatContentData;

    const msgRow: any[] = [];
    data.forEach((currMsg, idx) => {
      const currMsgRes = chatContentFilter(currMsg);
      const {
        MessageID, Message, SenderName, FileID, ActionTime,
        AddedMemeberName
      } = currMsgRes;

      let timeElem;
      let msgUnit;
      let isMe;
      let actionTime;

      switch (currMsg.MessageType) {
        case FEMessageType.SendMessage:
          let message;
          actionTime = ActionTime;
          isMe = SenderName === myName;
          switch (currMsgRes.ContentType) {
            case FEContentType.Image:
              message = (
                <Image FileID={FileID}
                  onLoad={(e) => {
                    this.renewMsgPanelHeight();
                    this.scrollToBottom(this.scrollContent);
                  }}/>
              );
              break;
            case FEContentType.Text:
              message = Message;
              break;
          }
          const C = isMe ? 'div' : Link;
          const currUser = isMe ? userInfo : UsersRef[SenderName];
          const propForC = isMe ? {} : {
            Com: 'ContactDetail',
            Title: SenderName,
            params: currUser ? {
              UserID: currUser.UserID.toString()
            } : {}
          };
          msgUnit = (
            <React.Fragment>
              <C
                onClick={(e) => {
                  // selectContact(contactData[selectedChat.ContactID]);
                }}
                {...propForC}>
                <ChatAvatar
                  AvatarFileID={currUser ? currUser.AvatarFileID : ''}
                  text={SenderName[0]}
                  size={30} />
                {/* <Avatar size={30}>
                  {SenderName[0]}
                </Avatar> */}
              </C>
              <div className="unit">
                {
                  !isMe && isGroupChat && <div className="username">{SenderName}</div>
                }
                <span className="msg">{message}</span>
              </div>
            </React.Fragment>
          );
          break;
        case FEMessageType.AddMember:
          // const { AddedMemeberName, ActionTime } = UpdateMessage.UpdateMessageChatAddMember;
          actionTime = ActionTime;
          msgUnit = (
            <span className="msg">{AddedMemeberName} 加入了聊天</span>
          );
          break;
        default:
          return;
      }

      const timeout = actionTime - prevTime > timeDisplayDelay;
      if (timeout) {
        prevTime = actionTime;
        timeElem = (
          <div className="time-devide">
            <time>{DateFormat(actionTime * 1000, 'YYYY-MM-DD hh:mm:ss')}</time>
            {/* <div className="divide"></div> */}
          </div>
        );
      }

      const msgBubbleClass = 'bubble';
      let bubbleClass = msgBubbleClass;
      if (isMe) bubbleClass += ' me';
      if (timeout) bubbleClass += ' divide';

      const itemElem = (
        <div
          className={bubbleClass} key={MessageID.toString()}>
          {timeElem}
          <div className={`msg-item ${MsgTypeClass[currMsg.MessageType]}`}>
            {msgUnit}
          </div>
        </div>
      );

      msgRow.push(itemElem);
    });

    return msgRow;
  }

  renderChatMsgs() {
    const msgRow = this.getChatMsgs();
    return msgRow;
  }

  saveMsgPanel = (e) => { this.msgPanel = e; };

  // saveEditprPanel = (e) => {
  //   this.editorPanel = e;
  //   if (e) this.setMsgPanelPadding(e.offsetHeight);
  // };

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

  setMsgPanelPadding = (paddingBottom: number) => {
    if (this.prevPadding === paddingBottom) return;
    if (this.msgPanel) {
      this.msgPanel.style.paddingBottom = `${paddingBottom}px`;
      this.prevPadding = paddingBottom;
      this.scrollToBottom(this.scrollContent);
    }
  }

  editorFocus = e => this.scrollToBottom(this.scrollContent)

  editorDidMount = (editorDOM) => {
    this.editorDOM = editorDOM;
    if (editorDOM) this.setMsgPanelPadding(editorDOM.offsetHeight);
  }

  editorInout = (e) => {
    if (this.editorDOM) {
      const { offsetHeight } = this.editorDOM;
      this.setMsgPanelPadding(offsetHeight);
    }
  }

  editorKeyPress = (e) => {
    // TODO: 实现 command + enter 换行
    if (e.charCode === 13) {
      e.preventDefault();
      let val = e.target.innerHTML;
      val = val.replace(/<div>/gi, '<br>').replace(/<\/div>/gi, '');
      this.onSendMsg(val, FEContentType.Text);
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

  render() {
    const { currChatContentData } = this.state;
    if (!currChatContentData) return null;
    const chatPanelContainer = (
      <div className="msg-panel-container" ref={(e) => {
        this.msgPanelContainer = e;
        if (e) {
          this.msgPanelHeight = e.offsetHeight;
        }
      }}>
        <div className="msg-panel" ref={this.saveMsgPanel}>
          {this.renderChatMsgs()}
        </div>
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
          onInput={this.editorInout}
          onClickSendBtn={this.editorClickToSend}
          onSelectedImg={this.loadFileFromInput}
          onKeyPress={this.editorKeyPress}
          ref={this.editorPanel} />
      </section>
    );
  }
}
