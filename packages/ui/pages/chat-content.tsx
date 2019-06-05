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

  planningImgList: [] = [];

  scrollContent: HTMLElement | null = null;

  constructor(props: {}) {
    super(props);
    this.page = 0;
    this.state = {
      page: 0,
      limit: 12
    };
  }

  componentDidMount() {
    this.addDropEvent(this.scrollContent);
  }

  addFile() {
    this.addClassToDrapElem(this.scrollContent);
  }

  addFileFromInput(e) {
    // console.log(e.target.files);
    if (e.target.files.length === 0) return;
    this.chooseFile(e.target.files);
  }

  addClassToDrapElem = (elem: HTMLElement) => {
    elem.classList.add('drapping');
  }

  removeClassToDrapElem = (elem: HTMLElement) => {
    elem.classList.remove('drapping');
  }

  componentWillUnmount() {
    this.removeDropEvent(this.scrollContent);
  }

  addDropEvent(elem) {
    const { drapPanel } = this;
    if (!drapPanel) return;
    elem.addEventListener('dragenter', this.dragenterEvent.bind(this, elem), false);
    drapPanel.addEventListener('dragleave', this.dragleaveEvent.bind(this, elem), false);
    drapPanel.addEventListener('dragover', this.dragoverEvent.bind(this), false);
    drapPanel.addEventListener('drop', this.drogEvent.bind(this), false);
  }

  removeDropEvent(elem) {
    const { drapPanel } = this;
    if (!drapPanel) return;
    elem.removeEventListener('dragenter', this.dragenterEvent.bind(this), false);
    drapPanel.removeEventListener('dragleave', this.dragleaveEvent.bind(this), false);
    drapPanel.removeEventListener('dragover', this.dragoverEvent.bind(this), false);
    drapPanel.removeEventListener('drop', this.drogEvent.bind(this), false);
  }

  dragenterEvent = (elem, e) => {
    e.preventDefault();
    this.addClassToDrapElem(elem);
  }

  dragleaveEvent = (elem, e) => {
    e.preventDefault();
    this.removeClassToDrapElem(elem);
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
          const base64Data = event.target.result;
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

  convertBase64ToImg = (base64Data) => {
    const img = document.createElement('img');
    img.src = base64Data;
    img.classList.add('preview');

    return img;
  }

  addImgToPanel(img) {
    if (!img) return;
    const { drapPanelContainer } = this;
    drapPanelContainer.querySelector('#previewGroup').appendChild(img);
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

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.activeChat.ID === nextProps.activeChat.ID) {
  //     const thisChatId = this.props.activeChat.ID;
  //     const { chatContentData } = this.props;
  //     const nextChatContent = nextProps.chatContentData[thisChatId] || [];
  //     const thisChatContent = chatContentData[thisChatId] || [];
  //     if (nextChatContent.length !== thisChatContent.length) {
  //       if (nextChatContent.length - thisChatContent.length === 1) {
  //         this.setScrollContent();
  //       }
  //     }
  //   }
  //   if (this.props.activeChat.touid !== nextProps.activeChat.touid) {
  //     this.initActiveChatHistory(nextProps);
  //   }
  // }

  initActiveChatHistory(nextProps) {
    const {
      chatContentData, activeChat, onQueryHistory
    } = nextProps;
    if (chatContentData.hasOwnProperty(activeChat.ID)) {
      this.setScrollContent();
    } else {
      this.queryHistory(nextProps);
    }
  }

  queryHistory(nextProps, skip, scrollToBtn = true) {
    const { limit } = this.state;
    const { activeChat, onQueryHistory } = nextProps;

    const currChart = this.getActiveChatContent();
    const lastId = currChart.length > 0 ? currChart[0].Id : 0;

    const self = this;
    if (activeChat.touid == CS_CHAT_ID) return;

    const queryData = {
      ToUserType: activeChat.ToUserType,
      ToUserName: activeChat.ToUserName,
      FromUserType: 'user',
      chatId: activeChat.ID,
      lastId,
      limit,
      skip: HasValue(skip) ? skip : this.page * limit
    };

    onQueryHistory(queryData, () => {
      if (!scrollToBtn) return;
      self.setScrollContent();
    });
  }

  queryNext() {
    const currMsgLen = this.getActiveChatContent().length;
    this.queryHistory(this.props, currMsgLen, false);
    ++this.page;
  }

  setScrollContent = (e) => {
    this.scrollingContent = e;
    if (!e) return;
    setTimeout(() => {
      const { scrollingContent, msgPanel } = this;
      scrollingContent.scrollTop = msgPanel.offsetHeight;
      scrollingContent.classList.add('ready');
    });
  }

  onCancelPic() {
    const { scrollContent, drapPanel } = this;
    this.removeClassToDrapElem(scrollContent);
    this.onClearAllPic();
  }

  onClearAllPic() {
    const { drapPanelContainer } = this;
    drapPanelContainer.querySelector('#previewGroup').innerHTML = '';
    this.planningImgList = [];
    generateThumb.clearFileList();
  }

  reSendMsg(reSendMsgData) {
    this.props.onSendMsg(reSendMsgData);
  }

  sendMsg(msg, msgType = 'txt') {
    msg = msg.trim();
    if (msg == '') return;
    const { activeChat, onSendMsg } = this.props;
    const { textContent } = this;

    const msgID = Date.now();

    const sendMsgData = {
      FromUserType: 'user',
      ToUserName: activeChat.ToUserName,
      ToUserType: activeChat.ToUserType,
      MsgType: msgType,
      Message: msg,
      chatId: activeChat.ID || '',
      SendTime: msgID,
      msgID,
    };
    textContent.value = '';

    onSendMsg(sendMsgData);
  }

  _onSendImage() {
    const { activeChat, onSendMsg } = this.props;

    if (!activeChat.ID || this.planningImgList === 0) return;

    this.planningImgList.forEach(imgData => this.sendMsg(imgData, 'img'));
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
        case FAIL_MSG_QUEUE.hasOwnProperty(msgID):
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
    const chatPanelContainer = (
      <div className="msg-panel-container" ref={e => this.msgPanel = e}>
        <div className="msg-panel">
          {this.getAllChatItems()}
        </div>
      </div>
    );

    const textPanel = (
      <div className="editor-panel">
        <input type="text" ref={e => this.textContent = e}
          onPaste={e => this.onPasteInput(e)}
          contentEditable
          onKeyPress={(e) => {
            if (e.charCode === 13) this.sendMsg(this.textContent.value);
          }}/>
        <span className="file-btn item" onClick={e => this.addFile()}>
          <Icon n="file"/>
        </span>
      </div>
    );

    // const drapArea = (
    //   <div className="drap-panel" ref={e => this.drapPanelContainer = e}>
    //     <div className="drap-area" ref={e => this.drapPanel = e}></div>
    //     <span className="tip">将图片拖到此区域</span>
    //     <div id="previewGroup" ref={e => this.previewGroup = e}></div>
    //     <div className="action">
    //       <span className="btn hola primary" onClick={e => this._onSendImage()}
    //         disabled={!activeChat.ID}>发送</span>
    //       <span className="btn hola default" onClick={e => this.onCancelPic()}>取消</span>
    //       <span className="btn hola default" onClick={e => this.onClearAllPic()}>清空</span>
    //       <span className="image-button btn hola default">
    //         选择文件
    //         <input className="btn hola default" type="file" onChange={e => this.addFileFromInput(e)}/>
    //       </span>
    //     </div>
    //   </div>
    // );

    return (
      <section className="chat-panel-container" ref={e => this.scrollContent = e}>
        {/* {drapArea} */}
        <div className="scroll-content" ref={this.setScrollContent}>
          {chatPanelContainer}
        </div>
        {textPanel}
      </section>
    );
  }
}
