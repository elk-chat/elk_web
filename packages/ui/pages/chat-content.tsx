import React from 'react';
import { HasValue, DateFormat, UUID } from 'basic-helper';
import { Avatar, Icon } from 'ukelli-ui';
import {
  ChatItemEntity, ChatContentState, UserInfo, ContentType,
  MessageType, ChatContentStateInfo
} from '@little-chat/core/types';
import {
  selectContact, applySendMsg, applySyncChatMessage
} from '@little-chat/core/actions';
import Link from '../components/nav-link';

interface ChatContentProps {
  onQueryHistory: Function;
  applySendMsg: typeof applySendMsg;
  selectContact: typeof selectContact;
  applySyncChatMessage: typeof applySyncChatMessage;
  selectedChat: ChatItemEntity;
  chatContentData: ChatContentState;
  currChatContentData: ChatContentStateInfo;
  userInfo: UserInfo;
}

const timeDisplayDelay = 5 * 60 * 1000;
const msgTypeMapper = ['text', 'img'];

export default class ChatContent extends React.PureComponent<ChatContentProps, {}> {
  isAddDrapListener: boolean = false;

  page: number = 0;

  planningImgList: string[] = [];

  scrollContent!: HTMLElement | null;

  drapPanel!: HTMLElement | null;

  previewGroup!: HTMLElement | null;

  textContent!: HTMLDivElement | null;

  editorPanel!: HTMLDivElement | null;

  msgPanel!: HTMLInputElement | null;

  msgPanelHeight!: number;

  prevPadding!: number;

  constructor(props: ChatContentProps) {
    super(props);
    this.page = 0;
    this.state = {
      page: 0,
      limit: 12,
      showDragArea: false
    };
  }

  componentDidMount() {
    const { currChatContentData, selectedChat } = this.props;
    this.props.applySyncChatMessage({
      ChatID: selectedChat.ID,
      State: currChatContentData.lastState
    });
  }

  toggleDragArea = (isShow: boolean) => {
    this.setState({
      showDragArea: !!isShow
    });
  }

  onPasteInput = (event: React.ClipboardEvent<HTMLElement>) => {
    const { items } = event.clipboardData || event.originalEvent.clipboardData;
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
    const lastId = currChart.length > 0 ? currChart[0].Id : 0;

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

  scrollToBottom = (e: HTMLDivElement | null): void => {
    this.scrollContent = this.scrollContent || e;
    if (e) {
      setTimeout(() => {
        e.scrollTop = this.msgPanelHeight;
        e.classList.add('ready');
      });
    }
  }

  reSendMsg(reSendMsgData) {
    this.props.applySendMsg(reSendMsgData);
  }

  onSendMsg = (msg, contentType: ContentType = ContentType.Text) => {
    const _msg = msg.trim();
    if (_msg === '') return;
    const { selectedChat } = this.props;

    const sendMsgData = {
      ChatID: selectedChat.ID,
      ContentType: contentType,
      Message: msg
    };

    this.props.applySendMsg(sendMsgData);
  }

  _onSendImage = () => {
    const { selectedChat } = this.props;

    if (!selectedChat.ID || this.planningImgList.length === 0) return;

    this.planningImgList.forEach(imgData => this.onSendMsg(imgData, ContentType.Image));
    // this.onClearAllPic();
    // this.onCancelPic();
  }

  renderChatMsgs() {
    const {
      currChatContentData, chatContentData, userInfo, selectedChat, selectContact, contactData
    } = this.props;
    const isGroupChat = selectedChat.ChatType === 1;
    const myName = userInfo.UserName;
    let prevTime = 0;
    const { data } = currChatContentData;

    return data.map((currMsg, idx) => {
      const {
        ContentType, UpdateMessage, SendTime,
        MessageID
      } = currMsg;

      const timeout = SendTime - prevTime > timeDisplayDelay;

      let timeElem;
      let statusDOM;
      let msgUnit;
      let message;
      let senderName;
      let isMe;

      if (timeout) {
        prevTime = SendTime;
        timeElem = (
          <div className="time-devide">
            <time>{DateFormat(SendTime, 'YYYY-MM-DD hh:mm:ss')}</time>
            <div className="divide"></div>
          </div>
        );
      }

      switch (currMsg.MessageType) {
        case MessageType.SendMessage:
          message = UpdateMessage.UpdateMessageChatSendMessage.Message;
          senderName = UpdateMessage.UpdateMessageChatSendMessage.SenderName;
          isMe = senderName === myName;
          msgUnit = (
            <React.Fragment>
              <Link
                onClick={(e) => {
                  selectContact(contactData[selectedChat.ContactID]);
                }}
                Com="ContactDetail"
                Title={senderName}>
                <Avatar size={30}>
                  {senderName[0]}
                </Avatar>
              </Link>
              <div className="unit">
                {
                  !isMe && isGroupChat && <div className="username">{senderName}</div>
                }
                <span className="msg">{statusDOM}{message}</span>
              </div>
            </React.Fragment>
          );
          break;
        case MessageType.AddMember:
          message = UpdateMessage.UpdateMessageChatAddMember.Message;
          senderName = UpdateMessage.UpdateMessageChatAddMember.SenderName;
          isMe = senderName === myName;
          msgUnit = (
            <span className="msg">{statusDOM}{message}</span>
          );
          break;
        default:
          return '';
      }

      const msgBubbleClass = 'msg-bubble';
      let bubbleClass = msgBubbleClass;
      if (isMe) bubbleClass += ' me';
      if (timeout) bubbleClass += ' divide';

      const itemElem = (
        <div
          className={bubbleClass} key={MessageID}>
          {timeElem}
          <div className={`msg-item text`}>
            {msgUnit}
          </div>
        </div>
      );

      return itemElem;
    });
  }

  saveMsgPanel = (e) => { this.msgPanel = e; };

  saveEditprPanel = (e) => {
    this.editorPanel = e;
    if (e) this.setMsgPanelPadding(e.offsetHeight);
  };

  setMsgPanelPadding = (paddingBottom: number) => {
    if (this.prevPadding === paddingBottom) return;
    if (this.msgPanel) {
      this.msgPanel.style.paddingBottom = `${paddingBottom}px`;
      this.prevPadding = paddingBottom;
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
      <div className="editor-panel" ref={this.saveEditprPanel}>
        <div
          contentEditable
          className="typing-area"
          ref={(e) => {
            this.textContent = e;
          }}
          onPaste={e => this.onPasteInput(e)}
          onInput={(e) => {
            const { target } = e;
            const { offsetHeight } = this.editorPanel;
            this.setMsgPanelPadding(offsetHeight);
            const value = target.innerHTML;
          }}
          onKeyPress={(e) => {
            // TODO: 实现 command + enter 换行
            if (e.charCode === 13) {
              e.preventDefault();
              let val = e.target.innerHTML;
              val = val.replace(/<div>/gi, '<br>').replace(/<\/div>/gi, '');
              this.onSendMsg(val, ContentType.Text);
              if (this.textContent) this.textContent.innerHTML = '';
              this.setMsgPanelPadding(this.editorPanel.offsetHeight);
            }
          }} />
        {/* <span className="file-btn item" onClick={e => this.addFile()}>
          <Icon n="file"/>
        </span> */}
      </div>
    );

    return (
      <section className="chat-panel-container" ref={(e) => { this.scrollContent = e; }}>
        <div className="scroll-content" ref={this.scrollToBottom}>
          {chatPanelContainer}
        </div>
        {textPanel}
      </section>
    );
  }
}
