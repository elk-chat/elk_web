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
  // sendingMsg;
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

const MsgTip = ({ isRead, status }) => {
  let icon = 'check';
  if (isRead) {
    icon = 'check-double';
  } else if (status) {
    switch (status) {
      case 'sending':
        icon = 'redo-alt';
        break;
      case 'timeout':
        icon = 'exclamation';
        break;
    }
  }
  return (
    <span className="status-tip">
      <Icon n={icon} />
    </span>
  );
};

const ChatMsgRender: React.SFC<ChatMsgRenderProps> = (props) => {
  const {
    userInfo, selectedChat, currChatContentData,
    // sendingMsg,
    readState,
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
    // const currMsgRes = chatContentFilter(currMsg);
    const {
      ClientMessageID, MessageID, Message, SenderName, ContentType,
      FileID, ActionTime, State, msgStatus, MessageType,
      AddedMemeberName
    } = currMsg;

    let timeElem;
    let msgUnit;
    let isMe;
    let msgType;
    let actionTime;

    switch (MessageType) {
      case FEMessageType.SendMessage:
        let message;
        actionTime = ActionTime;
        isMe = SenderName === myName;
        switch (ContentType) {
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
              isMe && <MsgTip isRead={isRead} status={msgStatus} />
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
        className={bubbleClass} key={String(ClientMessageID || MessageID)}>
        {timeElem}
        <div className={`msg-item ${MsgTypeClass[MessageType]}`}>
          {msgUnit}
        </div>
      </div>
    );

    msgRow.push(itemElem);
  });

  return msgRow;
};

export default ChatMsgRender;
