import React from 'react';
import {
  HasValue, DateFormat, UUID, EventEmitter
} from 'basic-helper';
import { Avatar } from 'ukelli-ui/core/avatar';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { Icon } from 'ukelli-ui/core/icon';
import {
  ChatItemEntity, ChatContentState, UserInfo, ContentType,
  MessageType, ChatContentStateInfo
} from '@little-chat/core/types';
import {
  selectContact, applySendMsg, applySyncChatMessage, readMsg,
  RECEIVE_CHAT_MESSAGE
} from '@little-chat/core/actions';
import {
  UploadFile, GetFileState, AddMemberToChat
} from '@little-chat/sdk';
import Link from '../components/nav-link';
import Editor from '../components/editor';
import Image from '../components/image';
import ImageReader from '../utils/image-reader';
import AddMember from './add-member';
import SearchUser from './search-contact';

interface ChatContentProps {
  applySendMsg: typeof applySendMsg;
  selectContact: typeof selectContact;
  applySyncChatMessage: typeof applySyncChatMessage;
  onQueryHistory: Function;
  readMsg: typeof readMsg;
  selectedChat: ChatItemEntity;
  chatContentData: ChatContentState;
  currChatContentData: ChatContentStateInfo;
  userInfo: UserInfo;
}

const timeDisplayDelay = 5 * 60;

/** 对应 MessageType */
const MsgTypeClass = {
  1: 'send-msg',
  2: 'add-member',
};

interface State {
  page: number;
  limit: number;
  showDragArea: boolean;
}

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

  msgPanel!: HTMLInputElement | null;

  editorPanel!: React.RefObject<HTMLDivElement>;

  msgPanelHeight!: number;

  prevPadding!: number;

  constructor(props: ChatContentProps) {
    super(props);
    this.page = 0;
    this.state = {
      page: 0,
      limit: 12,
      showDragArea: false,
    };
    EventEmitter.on(RECEIVE_CHAT_MESSAGE, this.handleScroll);
    this.editorPanel = React.createRef();
  }

  componentDidMount() {
    const { currChatContentData, selectedChat } = this.props;
    this.props.applySyncChatMessage({
      ChatID: selectedChat.ChatID,
      State: currChatContentData.lastState
    });
  }

  componentWillUnmount() {
    EventEmitter.rm(RECEIVE_CHAT_MESSAGE, this.handleScroll);
  }

  handleScroll = () => {
    // console.log('123')
    this.scrollToBottom(this.scrollContent);
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
    // console.log(this.props)
    this.props.readMsg({
      ChatID: selectedChat.ChatID,
      MessageID,
      MessageType: lastData.MessageType,
      StateRead: lastState
    });
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
      ContentType: ContentType.Image,
      FileName: fileInfo.name,
      Caption: '',
      Width: fileInfo.width,
      Height: fileInfo.height,
      Data: uint8,
    });
    this.onSendMsg(File.FileID, ContentType.Image);
  }

  onSendMsg = (msg, contentType: ContentType = ContentType.Text) => {
    let _msg;
    switch (contentType) {
      case ContentType.Text:
        _msg = msg.trim();
        break;
      case ContentType.Image:
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
    }, contentType === ContentType.Image ? {
      FileID: _msg,
    } : null);

    this.props.applySendMsg(sendMsgData);

    this.setTextContent('');
    if (this.editorPanel) this.setMsgPanelPadding(this.editorPanel.current.offsetHeight);
  }

  renderChatMsgs() {
    const {
      currChatContentData, userInfo, selectedChat
    } = this.props;
    const isGroupChat = selectedChat.ChatType === 1;
    const myName = userInfo.UserName;
    let prevTime = 0;
    const { data } = currChatContentData;

    return data.map((currMsg, idx) => {
      const {
        UpdateMessage, MessageID
      } = currMsg;

      let timeElem;
      let msgUnit;
      let isMe;
      let actionTime;

      switch (currMsg.MessageType) {
        case MessageType.SendMessage:
          const {
            Message, SenderName, ActionTime, FileID
          } = UpdateMessage.UpdateMessageChatSendMessage;
          let message;
          actionTime = ActionTime;
          isMe = SenderName === myName;
          switch (UpdateMessage.UpdateMessageChatSendMessage.ContentType) {
            case ContentType.Image:
              message = (
                <Image FileID={FileID}
                  onLoad={(e) => {
                    this.scrollToBottom(this.scrollContent);
                  }}/>
              );
              break;
            case ContentType.Text:
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
        case MessageType.AddMember:
          const { AddedMemeberName, ActionTime } = UpdateMessage.UpdateMessageChatAddMember;
          actionTime = ActionTime;
          msgUnit = (
            <span className="msg">{AddedMemeberName} 加入了聊天</span>
          );
          break;
        default:
          return '';
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

      return itemElem;
    });
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

  render() {
    // const { selectedChat } = this.props;
    const chatPanelContainer = (
      <div className="msg-panel-container" ref={(e) => {
        if (e) this.msgPanelHeight = e.offsetHeight;
      }}>
        <div className="msg-panel" ref={this.saveMsgPanel}>
          {this.renderChatMsgs()}
        </div>
      </div>
    );

    const textPanel = (
      <Editor
        didMount={(e) => {
          const { offsetHeight } = this.editorPanel.current;
          this.setMsgPanelPadding(offsetHeight);
        }}
        onPaste={e => this.onPasteInput(e)}
        onFocus={e => this.scrollToBottom(this.scrollContent)}
        onInput={(e) => {
          const { offsetHeight } = this.editorPanel.current;
          this.setMsgPanelPadding(offsetHeight);
        }}
        onClickSendBtn={(e) => {
          this.onSendMsg(this.editorPanel.current.innerHTML, ContentType.Text);
        }}
        onSelectedImg={this.addFileFromInput}
        onKeyPress={(e) => {
          // TODO: 实现 command + enter 换行
          if (e.charCode === 13) {
            e.preventDefault();
            let val = e.target.innerHTML;
            val = val.replace(/<div>/gi, '<br>').replace(/<\/div>/gi, '');
            this.onSendMsg(val, ContentType.Text);
          }
        }}
        ref={this.editorPanel} />
    );

    return (
      <section className="chat-panel-container">
        <div className="scroll-content" ref={this.scrollToBottom}>
          {chatPanelContainer}
        </div>
        {textPanel}
      </section>
    );
  }
}
