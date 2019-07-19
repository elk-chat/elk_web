import React from 'react';
import {
  HasValue, DateFormat, UUID, EventEmitter, DebounceClass
} from 'basic-helper';
import { Avatar } from 'ukelli-ui/core/avatar';
import { Icon } from 'ukelli-ui/core/icon';
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
  UploadFile, ReadMsg, CheckMsgReadState
} from '@little-chat/sdk';
import { chatContentFilter } from '@little-chat/utils/chat-data-filter';
import Link from '../components/nav-link';
import Editor from '../components/editor';
import Image from '../components/image';
import ImageReader from '../utils/image-reader';

interface ChatContentProps {
  applySendMsg: typeof applySendMsg;
  selectContact: typeof selectContact;
  applySyncChatMessage: typeof applySyncChatMessage;
  onQueryHistory: Function;
  selectedChat: ChatItemEntity;
  chatContentData: ChatContentState;
  currChatContentData: ChatContentStateInfo;
  userInfo: UserInfo;
}

interface State {
  page: number;
  limit: number;
  msgPanelHeight: number;
  showDragArea: boolean;
}

const debounce = new DebounceClass();

const timeDisplayDelay = 5 * 60;

/** 对应 MessageType */
const MsgTypeClass = {
  1: 'send-msg',
  2: 'add-member',
};

export default class ChatContent extends React.PureComponent<ChatContentProps, State> {
  static RightBtns = (props) => {
    const { selectedChat } = props;
    return (
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

  planningImgList: string[] = [];

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

  readState!: {};

  msgHeightInfo: {
    [chatIdx: string]: number;
  } = {};

  constructor(props: ChatContentProps) {
    super(props);
    this.page = 0;
    this.state = {
      page: 0,
      limit: 12,
      msgPanelHeight: 0,
      showDragArea: false,
    };
    EventEmitter.on(RECEIVE_CHAT_MESSAGE, this.handleScroll);
    this.editorPanel = React.createRef();
  }

  componentDidMount() {
    const { currChatContentData, selectedChat } = this.props;
    const { ChatID } = selectedChat;
    this.props.applySyncChatMessage({
      ChatID,
      State: currChatContentData.lastState
    });
    CheckMsgReadState({
      ChatID
    }).then((res) => {
      const { States } = res;
      this.readState = States;
    });
  }

  componentWillUnmount() {
    EventEmitter.rm(RECEIVE_CHAT_MESSAGE, this.handleScroll);
    this.props.selectChat({
      ChatID: ''
    });
  }

  handleScroll = () => {
    // console.log('123')
    debounce.exec(() => this.scrollToBottom(this.scrollContent), 300);
  }

  toggleDragArea = (isShow: boolean) => {
    this.setState({
      showDragArea: !!isShow
    });
  }

  handlePasteText = () => {

  }

  handlePasteImg = (items) => {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (loadEvent: ProgressEvent) => {
          const base64Data: string = loadEvent.target.result;
          const img = this.convertBase64ToImg(base64Data);
          this.addImgToPanel(img);
          this.toggleDragArea(true);
          this.planningImgList.push(base64Data);
          // console.log(event.target.result)
        }; // data url!
        blob && reader.readAsDataURL(blob);
      }
    }
  }

  onPasteInput = (event: React.ClipboardEvent<HTMLElement>) => {
    event.preventDefault();
    const { items } = event.clipboardData || event.originalEvent.clipboardData;
    switch (true) {
      case items.length > 2:
        this.handlePasteImg(items);
        break;
      default:
        const text = event.clipboardData.getData('Text');
        const nextText = this.getTextContent() + text;
        this.setTextContent(nextText);
        break;
    }
  }

  convertBase64ToImg = (base64Data: string) => {
    const img = document.createElement('img');
    img.src = base64Data;
    img.classList.add('preview');

    return img;
  }

  addImgToPanel(img) {
    if (!img) return;
    const { previewGroup } = this;
    previewGroup && previewGroup.appendChild(img);
  }

  queryHistory(nextProps, skip, scrollToBtn = true) {
    const { limit } = this.state;
    const { selectedChat, onQueryHistory } = nextProps;

    const currChart = this.props.currChatContentData.data;
    const lastId = currChart.length > 0 ? currChart[0].ChatID : 0;

    const queryData = {
      ToUserType: selectedChat.ToUserType,
      ToUserName: selectedChat.ToUserName,
      FromUserType: 'user',
      chatId: selectedChat.ID,
      lastId,
      limit,
      skip: HasValue(skip) ? skip : this.page * limit
    };

    onQueryHistory(queryData);
  }

  queryNext() {
    const currMsgLen = this.props.currChatContentData.data.length;
    this.queryHistory(this.props, currMsgLen, false);
    ++this.page;
  }

  readMsg = () => {
    const { selectedChat, currChatContentData } = this.props;
    const { lastData, lastState } = currChatContentData;
    const { MessageID } = lastData;
    if (this.readState) {
      const readState = this.readState.StateRead.toString();
      if (readState < lastState) {
        ReadMsg({
          ChatID: selectedChat.ChatID,
          MessageID,
          MessageType: lastData.MessageType,
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
        e.classList.add('ready');
      });
    }
    this.readMsg();
  }

  addFileFromInput = async (e) => {
    // console.log(e.target.files);
    if (e.target.files.length === 0) return;
    // console.log(e.target.files);
    this.loadFile(e.target.files);
  }

  loadFile = async (files) => {
    ImageReader(files[0]).then((res) => {
      this.uploadFile(res);
    });
    // files.forEach((file) => {
    //   ImageReader(file).then((res) => {
    //     this.uploadFile(res);
    //   });
    // });
  }

  uploadFile = async ({ fileInfo, buffer }) => {
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
    const { selectedChat, currChatContentData } = this.props;

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
      currChatContentData, userInfo, selectedChat
    } = this.props;
    const isGroupChat = selectedChat.ChatType === 1;
    const myName = userInfo.UserName;
    let prevTime = 0;
    const { data } = currChatContentData;

    const msgRow = [];
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
                    this.scrollToBottom(this.scrollContent);
                  }}/>
              );
              break;
            case FEContentType.Text:
              message = Message;
              break;
          }
          const C = isMe ? 'div' : Link;
          const propForC = isMe ? {} : {
            Com: 'ContactDetail',
            Title: SenderName
          };
          msgUnit = (
            <React.Fragment>
              <C
                onClick={(e) => {
                  // selectContact(contactData[selectedChat.ContactID]);
                }}
                {...propForC}>
                <Avatar size={30}>
                  {SenderName[0]}
                </Avatar>
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
    const { msgPanelHeight } = this.state;
    const msgRow = this.getChatMsgs();
    return msgRow;
    // return msgPanelHeight && (
    //   <List
    //     height={msgPanelHeight}
    //     itemCount={msgRow.length}
    //     itemSize={(idx) => {
    //       return this.msgHeightInfo[idx] || 44;
    //     }}>
    //     {
    //       ({ index }) => msgRow[index]
    //     }
    //   </List>
    // );
  }

  saveMsgPanel = (e) => { this.msgPanel = e; };

  // saveEditprPanel = (e) => {
  //   this.editorPanel = e;
  //   if (e) this.setMsgPanelPadding(e.offsetHeight);
  // };

  setTextContent = (nextContent) => {
    if (this.editorPanel) this.editorPanel.current.innerHTML = nextContent;
  }

  getTextContent = () => {
    let res = '';
    if (this.editorPanel) res = this.editorPanel.current.innerHTML;
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
    const { offsetHeight } = this.editorDOM;
    this.setMsgPanelPadding(offsetHeight);
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

  render() {
    // const { selectedChat } = this.props;
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
          onPaste={this.onPasteInput}
          onFocus={this.editorFocus}
          onInput={this.editorInout}
          onClickSendBtn={this.editorClickToSend}
          onSelectedImg={this.addFileFromInput}
          onKeyPress={this.editorKeyPress}
          ref={this.editorPanel} />
      </section>
    );
  }
}
