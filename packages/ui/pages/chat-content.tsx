import React from 'react';
import { HasValue, DateFormat, UUID } from 'basic-helper';
import { Avatar, Icon } from 'ukelli-ui';
import {
  ChatItemEntity, ChatContentState, UserInfo, MsgType
} from '@little-chat/core/types';
import {
  selectContact, sendMsg
} from '@little-chat/core/actions';
import Link from '../components/nav-link';

interface ChatContentProps {
  onQueryHistory: Function;
  sendMsg: typeof sendMsg;
  selectContact: typeof selectContact;
  selectedChat: ChatItemEntity;
  chatContentData: ChatContentState;
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

    const currChart = this.getActiveChatContent();
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
    const currMsgLen = this.getActiveChatContent().length;
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
    this.props.sendMsg(reSendMsgData);
  }

  onSendMsg = (msg, msgType: MsgType = MsgType.Text) => {
    const _msg = msg.trim();
    if (_msg === '') return;
    const { selectedChat, sendMsg } = this.props;

    const MsgID = UUID();

    const sendMsgData = {
      FromUserType: 'user',
      MsgType: msgType,
      Message: _msg,
      ChatID: selectedChat.ID || '',
      SendTime: Date.now(),
      MsgID,
    };

    sendMsg(sendMsgData);
  }

  _onSendImage = () => {
    const { selectedChat } = this.props;

    if (!selectedChat.ID || this.planningImgList.length === 0) return;

    this.planningImgList.forEach(imgData => this.onSendMsg(imgData, MsgType.Image));
    // this.onClearAllPic();
    // this.onCancelPic();
  }

  getActiveChatContent() {
    const { chatContentData, selectedChat } = this.props;
    return chatContentData[selectedChat.ID] || [];
  }

  renderChatMsgs() {
    const {
      chatContentData, userInfo, selectedChat, selectContact, contactData
    } = this.props;
    const isGroupChat = selectedChat.ChatType === 1;
    const myName = userInfo.UserName;
    let prevTime = 0;
    // let prevUsername = '';
    const selectedChatContent = this.getActiveChatContent();
    // let _selectedChatContent = [...selectedChatContent].reverse();

    const msgBubbleClass = 'msg-bubble';
    const { FAIL_MSG_QUEUE = {} } = chatContentData;

    return Object.keys(selectedChatContent).map((msgID, idx) => {
      const currMsg = selectedChatContent[msgID];
      const {
        FromUser, MsgType, UpdatedAt, SendTime, Message
      } = currMsg;

      const isMe = FromUser === myName;
      const displayName = isMe ? myName : FromUser;

      // const isSameUserMsg = prevUsername === FromUser;
      const timeout = SendTime - prevTime > timeDisplayDelay;

      let timeElem;
      let statusDOM;
      let msgUnit;

      // if (!isSameUserMsg) prevUsername = FromUser;
      if (timeout) {
        prevTime = SendTime;
        timeElem = (
          <div className="time-devide">
            <time>{DateFormat(SendTime, 'YYYY-MM-DD hh:mm:ss')}</time>
            <div className="divide"></div>
          </div>
        );
      }

      // const userAvatarElem = (timeout || !isSameUserMsg) && (
      //   <div className="user-mark">
      //     <Avatar size={30}>
      //       {displayName[0]}
      //     </Avatar>
      //   </div>
      // );

      // switch (true) {
      //   case FAIL_MSG_QUEUE[msgID]:
      //     statusDOM = (
      //       <span className="fail-msg">发送失败, 请稍候再发</span>
      //     );
      //     break;
      // }

      switch (MsgType) {
        case 0:
          msgUnit = (
            <span className="msg">{statusDOM}{Message}</span>
          );
          break;
        case 1:
          msgUnit = (
            <img src={Message} alt="" />
          );
          break;
        default:
          return '';
      }

      let bubbleClass = msgBubbleClass;
      if (isMe) bubbleClass += ' me';
      if (timeout) bubbleClass += ' divide';

      const itemElem = (
        <div
          className={bubbleClass} key={idx}>
          {timeElem}
          {/* {userAvatarElem} */}
          <div className={`msg-item ${msgTypeMapper[MsgType]}`}>
            <Link
              onClick={(e) => {
                selectContact(contactData[selectedChat.ContactID]);
              }}
              Com="ContactDetail"
              Title={displayName}>
              <Avatar size={30}>
                {displayName[0]}
              </Avatar>
            </Link>
            <div className="unit">
              {
                !isMe && isGroupChat && <div className="username">{displayName}</div>
              }
              {msgUnit}
            </div>
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
              this.onSendMsg(val, MsgType.Text);
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
