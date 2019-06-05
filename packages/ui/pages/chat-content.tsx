import React from 'react';
import { HasValue, DateFormat } from 'basic-helper';

import { Avatar, Icon } from 'ukelli-ui';

import { ChatItemEntity, ChatContentState } from '@little-chat/core/types';

import { GenerateThumbs } from '../utils/thumb-img-generator';

const generateThumb = new GenerateThumbs();

const timeDisplayDelay = 5 * 60 * 1000;

interface ChatContentProps {
  onQueryHistory: Function;
  onSendMsg: Function;
  activeChat: ChatItemEntity;
  chatContentData: ChatContentState;
  userInfo: {};
}

export default class ChatContent extends React.PureComponent<ChatContentProps, {}> {
  isAddDrapListener: boolean = false;

  page: number = 0;

  planningImgList: string[] = [];

  scrollContent!: HTMLElement | null;

  drapPanel!: HTMLElement | null;

  previewGroup!: HTMLElement | null;

  textContent!: HTMLInputElement | null;

  msgPanelHeight!: number;

  bindDragEnevt: boolean = false;

  constructor(props: {}) {
    super(props);
    this.page = 0;
    this.state = {
      page: 0,
      limit: 12
    };
  }

  addFile() {
    this.addClassToDrapElem(this.scrollContent);
  }

  addFileFromInput = (e) => {
    // console.log(e.target.files);
    if (e.target.files.length === 0) return;
    this.chooseFile(e.target.files);
  }

  addClassToDrapElem = (elem: HTMLElement | null) => {
    elem && elem.classList.add('drapping');
  }

  removeClassToDrapElem = (elem: HTMLElement | null) => {
    elem && elem.classList.remove('drapping');
  }

  componentWillUnmount() {
    this.removeDropEvent();
  }

  addDropEvent = (elem: HTMLElement) => {
    if (!elem || this.bindDragEnevt) return;
    elem.addEventListener('dragenter', this.dragenterEvent, false);
    elem.addEventListener('dragleave', this.dragleaveEvent, false);
    elem.addEventListener('dragover', this.dragoverEvent, false);
    elem.addEventListener('drop', this.drogEvent, false);
    this.drapPanel = elem;
    this.bindDragEnevt = true;
  }

  removeDropEvent = () => {
    const elem = this.drapPanel;
    if (!elem || !this.bindDragEnevt) return;
    elem.removeEventListener('dragenter', this.dragenterEvent, false);
    elem.removeEventListener('dragleave', this.dragleaveEvent, false);
    elem.removeEventListener('dragover', this.dragoverEvent, false);
    elem.removeEventListener('drop', this.drogEvent, false);
    this.bindDragEnevt = false;
  }

  dragenterEvent = (e) => {
    e.preventDefault();
    this.addClassToDrapElem(this.scrollContent);
  }

  dragleaveEvent = (e) => {
    e.preventDefault();
    this.removeClassToDrapElem(this.scrollContent);
  }

  dragoverEvent = (e) => {
    e.preventDefault();
  }

  drogEvent = (e) => {
    e.preventDefault();

    const fileList = e.dataTransfer.files;

    this.chooseFile(fileList);
  }

  onPasteInput = (event) => {
    const { items } = event.clipboardData || event.originalEvent.clipboardData;
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (item.kind === 'file') {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data: string = event.target.result;
          const img = this.convertBase64ToImg(base64Data);
          this.addImgToPanel(img);
          this.addClassToDrapElem(this.scrollContent);
          this.planningImgList.push(base64Data);
          // console.log(event.target.result)
        }; // data url!
        reader.readAsDataURL(blob);
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
    previewGroup.appendChild(img);
  }

  chooseFile(fileList) {
    if (!fileList && fileList[0].type.indexOf('image') === -1) return;

    generateThumb.onLoad = (base64Data, fileId) => {
      this.planningImgList.push(base64Data);
      const img = this.convertBase64ToImg(base64Data);
      this.addImgToPanel(img);
    };
    generateThumb.addFileList(fileList);
    generateThumb.generates();
  }

  queryHistory(nextProps, skip, scrollToBtn = true) {
    const { limit } = this.state;
    const { activeChat, onQueryHistory } = nextProps;

    const currChart = this.getActiveChatContent();
    const lastId = currChart.length > 0 ? currChart[0].Id : 0;

    const queryData = {
      ToUserType: activeChat.ToUserType,
      ToUserName: activeChat.ToUserName,
      FromUserType: 'user',
      chatId: activeChat.ID,
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

  setScrollContent = (e: HTMLElement) => {
    if (e) {
      setTimeout(() => {
        e.scrollTop = this.msgPanelHeight;
        e.classList.add('ready');
      });
    }
  }

  onCancelPic = () => {
    const { scrollContent, drapPanel } = this;
    this.removeClassToDrapElem(scrollContent);
    this.onClearAllPic();
  }

  onClearAllPic = () => {
    const { previewGroup } = this;
    previewGroup.innerHTML = '';
    this.planningImgList = [];
    generateThumb.clearFileList();
  }

  reSendMsg(reSendMsgData) {
    this.props.onSendMsg(reSendMsgData);
  }

  sendMsg = (msg, msgType = 0) => {
    const _msg = msg.trim();
    if (_msg === '') return;
    const { activeChat, onSendMsg } = this.props;

    const msgID = Date.now();

    const sendMsgData = {
      FromUserType: 'user',
      ToUserName: activeChat.ToUserName,
      ToUserType: activeChat.ToUserType,
      MsgType: msgType,
      Message: _msg,
      chatId: activeChat.ID || '',
      SendTime: msgID,
      msgID,
    };
    this.textContent.value = '';

    onSendMsg(sendMsgData);
  }

  _onSendImage = () => {
    const { activeChat } = this.props;

    if (!activeChat.ID || this.planningImgList.length === 0) return;

    this.planningImgList.forEach(imgData => this.sendMsg(imgData, 1));
    this.onClearAllPic();
    this.onCancelPic();
  }

  getActiveChatContent() {
    const { chatContentData, activeChat } = this.props;
    return chatContentData[activeChat.ID] || [];
  }

  getAllChatItems() {
    const { chatContentData, userInfo } = this.props;
    const myName = userInfo.UserName;
    let prevTime = 0;
    let prevUsername = '';
    const activeChatContent = this.getActiveChatContent();
    // let _activeChatContent = [...activeChatContent].reverse();

    const msgBubbleClass = 'msg-bubble';
    const { FAIL_MSG_QUEUE = {} } = chatContentData;

    return Object.keys(activeChatContent).map((msgID, idx) => {
      const currMsg = activeChatContent[msgID];
      const {
        FromUser, MsgType, UpdatedAt, SendTime, Message
      } = currMsg;

      const isMe = FromUser === myName;
      const displayName = isMe ? myName : FromUser;

      const isSameUserMsg = prevUsername === FromUser;
      const timeout = SendTime - prevTime > timeDisplayDelay;

      let timeElem;
      let statusDOM;
      let msgUnit;

      if (!isSameUserMsg) prevUsername = FromUser;
      if (timeout) {
        prevTime = SendTime;
        timeElem = (
          <div className="time-devide">
            <time>{DateFormat(SendTime, 'YYYY-MM-DD hh:mm:ss')}</time>
            <div className="divide"></div>
          </div>
        );
      }

      const userAvatarElem = timeout || !isSameUserMsg && (
        <div className="user-mark">
          <Avatar size={30}>
            {displayName[0]}
          </Avatar>
          <span className="username">{(displayName).replace('cs_', '')}</span>
        </div>
      );

      switch (true) {
        case FAIL_MSG_QUEUE[msgID]:
          statusDOM = (
            <span className="fail-msg">发送失败, 请稍候再发</span>
          );
          break;
      }

      switch (MsgType) {
        case 0:
          msgUnit = (
            <div className="msg-c">
              <span className="msg">{statusDOM}{Message}</span>
            </div>
          );
          break;
        case 1:
          msgUnit = (
            <div className="msg-img">
              <img src={Message} alt="" />
            </div>
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
          {userAvatarElem}
          {msgUnit}
        </div>
      );

      return itemElem;
    });
  }

  render() {
    const { activeChat } = this.props;
    const chatPanelContainer = (
      <div className="msg-panel-container" ref={(e) => {
        if (e) this.msgPanelHeight = e.offsetHeight;
      }}>
        <div className="msg-panel">
          {this.getAllChatItems()}
        </div>
      </div>
    );

    const textPanel = (
      <div className="editor-panel">
        <input className="typing-area" type="text" ref={e => this.textContent = e}
          onPaste={e => this.onPasteInput(e)}
          contentEditable
          onKeyPress={(e) => {
            if (e.charCode === 13) this.sendMsg(e.target.value);
          }}/>
        <span className="file-btn item" onClick={e => this.addFile()}>
          <Icon n="file"/>
        </span>
      </div>
    );

    const drapArea = (
      <div className="drap-panel">
        <div className="drap-area" ref={this.addDropEvent} />>
        <span className="tip">将图片拖到此区域</span>
        <div id="previewGroup" ref={e => this.previewGroup = e} />
        <div className="action">
          <button className="btn hola primary" onClick={this._onSendImage}
            disabled={!activeChat.ID}>
            发送
          </button>
          <span className="btn hola default" onClick={this.onCancelPic}>取消</span>
          <span className="btn hola default" onClick={this.onClearAllPic}>清空</span>
          <span className="image-button btn hola default">
            选择文件
            <input className="btn hola default" type="file" onChange={this.addFileFromInput}/>
          </span>
        </div>
      </div>
    );

    return (
      <section className="chat-panel-container" ref={e => this.scrollContent = e}>
        {drapArea}
        <div className="scroll-content" ref={this.setScrollContent}>
          {chatPanelContainer}
        </div>
        {textPanel}
      </section>
    );
  }
}
