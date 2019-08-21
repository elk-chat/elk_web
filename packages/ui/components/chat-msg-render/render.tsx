/* eslint-disable no-empty */
import React from 'react';
import { FEMessageType, FEContentType } from '@little-chat/core/types';
import { chatContentFilter } from '@little-chat/utils/chat-data-filter';
import {
  DateFormat
} from 'basic-helper';
import { Icon } from 'ukelli-ui/core/icon';
import ChatAvatar from '../avatar';
import Image from '../image';
import Link from '../nav-link';

interface ChatMsgRenderProps {
  userInfo;
  selectedChat;
  sendingMsg;
  currChatContentData;
  readState: any;
  onImgLoad: () => void;
}

const timeDisplayDelay = 5 * 60;

/** 对应 MessageType */
const MsgTypeClass = {
  1: 'send-msg',
  2: 'add-member',
};

const today = Date.now();
const todayDate = new Date();
const oneDayTime = 86400 * 1000;
const timeFilter = (time) => {
  const _time = time * 1000;
  const currTimeDate = new Date(_time);
  const isTodayTime = currTimeDate.getDate() - todayDate.getDate() === 0;
  const dateDiff = today - _time;
  let format = 'hh:mm';
  let prefix = '';
  if (isTodayTime && dateDiff < oneDayTime) {
    prefix = '今天';
  } else if (dateDiff < oneDayTime * 2) {
    prefix = '昨天';
  } else if (dateDiff < oneDayTime * 3) {
    prefix = '前天';
  } else if (dateDiff >= oneDayTime * 3) {
    format = 'YYYY-MM-DD hh:mm';
  }
  return `${prefix ? `${prefix} ` : ''}${DateFormat(_time, format)}`;
};

const ChatMsgRender: React.SFC<ChatMsgRenderProps> = (props) => {
  const {
    userInfo, selectedChat, currChatContentData, sendingMsg, readState,
    onImgLoad
  } = props;
  const { UsersRef } = selectedChat;
  const isGroupChat = selectedChat.ChatType === 1;
  const myName = userInfo.UserName;
  let prevTime = 0;
  const { data = [] } = currChatContentData;

  const msgRow: React.ReactElement[] = [];
  // eslint-disable-next-line consistent-return
  data.forEach((currMsg, idx) => {
    const currMsgRes = chatContentFilter(currMsg);
    const {
      MessageID, Message, SenderName, FileID, ActionTime, State,
      AddedMemeberName
    } = currMsgRes;

    let timeElem;
    let msgUnit;
    let isMe;
    let msgType;
    let actionTime;

    switch (currMsg.MessageType) {
      case FEMessageType.SendMessage:
        let message;
        actionTime = ActionTime;
        isMe = SenderName === myName;
        switch (currMsgRes.ContentType) {
          case FEContentType.Image:
            msgType = 'img';
            message = (
              <Image FileID={FileID}
                onLoad={onImgLoad}/>
            );
            break;
          case FEContentType.Text:
            msgType = 'txt';
            message = Message;
            break;
        }
        const currUser = isMe ? userInfo : UsersRef[SenderName];
        const avatar = (
          <ChatAvatar
            AvatarFileID={currUser ? currUser.AvatarFileID : ''}
            text={SenderName[0]}
            size={30} />
        );
        const isRead = +String(State) <= +String(readState);
        msgUnit = (
          <React.Fragment>
            {
              isMe ? (
                <div>
                  {avatar}
                </div>
              ) : (
                <Link Com="ContactDetail" Title={SenderName}
                  params={{
                    UserID: currUser ? currUser.UserID.toString() : ''
                  }}>
                  {avatar}
                </Link>
              )
            }
            {
              isMe && (
                <span className="read-tip">
                  <Icon n={isRead ? 'check-double' : 'check'} />
                </span>
              )
            }
            <div className="unit">
              {
                !isMe && isGroupChat && <div className="username">{SenderName}</div>
              }
              <span className={`msg ${msgType}`}>
                {message}
              </span>
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
        return null;
    }

    const timeout = actionTime - prevTime > timeDisplayDelay;
    if (timeout) {
      prevTime = actionTime;
      timeElem = (
        <div className="time-devide">
          <time>{timeFilter(actionTime)}</time>
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
  // eslint-disable-next-line guard-for-in
  for (const msgID in sendingMsg) {
    // eslint-disable-next-line no-prototype-builtins
    if (sendingMsg.hasOwnProperty(msgID)) {
      const msgItem = sendingMsg[msgID];
      const { Image, Message } = msgItem;
      const isImage = !!Image;
      msgRow.push((
        <div
          className="bubble me" key={msgID}>
          <div className={`msg-item ${MsgTypeClass[1]}`}>
            <ChatAvatar
              AvatarFileID={userInfo.AvatarFileID}
              text={myName[0]}
              size={30} />
            <div className="unit">
              <Icon n="spinner" classNames={['btn-loading']}/>
              <span className={`msg ${isImage ? 'img' : 'txt'}`}>
                {
                  isImage ? (
                    <div
                      className="img-wrapper">
                      <img className="_img" alt="" src={Image} />
                    </div>
                  ) : String(Message)
                }
              </span>
            </div>
          </div>
        </div>
      ));
    }
  }

  return msgRow;
};

export default ChatMsgRender;
