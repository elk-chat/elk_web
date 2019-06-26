import React from 'react';
import {
  HasValue, DateFormat, UUID, EventEmitter
} from 'basic-helper';
import { Avatar } from 'ukelli-ui/core/avatar';
import {
  ChatItemEntity, ChatContentState, UserInfo, ContentType,
  MessageType, ChatContentStateInfo
} from '@little-chat/core/types';
import {
  selectContact, applySendMsg, applySyncChatMessage, readMsg,
  RECEIVE_CHAT_MESSAGE
} from '@little-chat/core/actions';
import Link from '../components/nav-link';

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

export default class ChatContent extends React.PureComponent<ChatContentProps, {}> {
  isAddDrapListener: boolean = false;

  page: number = 0;

  planningImgList: string[] = [];

  scrollContent!: HTMLDivElement | null;

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
    EventEmitter.on(RECEIVE_CHAT_MESSAGE, this.handleScroll);
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

  onSendMsg = (msg, contentType: ContentType = ContentType.Text) => {
    const _msg = msg.trim();
    if (_msg === '') return;
    const { selectedChat, currChatContentData } = this.props;

    const sendMsgData = {
      ChatID: selectedChat.ChatID,
      ContentType: contentType,
      Message: msg,
      lastState: currChatContentData.lastState
    };

    this.props.applySendMsg(sendMsgData);
  }

  _onSendImage = () => {
    const { selectedChat } = this.props;

    if (!selectedChat.ChatID || this.planningImgList.length === 0) return;

    this.planningImgList.forEach(imgData => this.onSendMsg(imgData, ContentType.Image));
    // this.onClearAllPic();
    // this.onCancelPic();
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
          const { Message, SenderName, ActionTime } = UpdateMessage.UpdateMessageChatSendMessage;
          actionTime = ActionTime;
          isMe = SenderName === myName;
          msgUnit = (
            <React.Fragment>
              <Link
                onClick={(e) => {
                  // selectContact(contactData[selectedChat.ContactID]);
                }}
                Com="ContactDetail"
                Title={SenderName}>
                <Avatar size={30}>
                  {SenderName[0]}
                </Avatar>
              </Link>
              <div className="unit">
                {
                  !isMe && isGroupChat && <div className="username">{SenderName}</div>
                }
                <span className="msg">{Message}</span>
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
          className={bubbleClass} key={MessageID}>
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
      <section className="chat-panel-container">
        <div className="scroll-content" ref={this.scrollToBottom}>
          {chatPanelContainer}
        </div>
        {textPanel}
      </section>
    );
  }
}
