import React from 'react';
import { FEMessageType, FEContentType } from '@little-chat/core/types';
import { chatContentFilter } from '@little-chat/utils/chat-data-filter';
import {
  DateFormat
} from 'basic-helper';
import ChatAvatar from '../avatar';
import Image from '../image';
import Link from '../nav-link';

interface ChatMsgRenderProps {
  userInfo;
  selectedChat;
  currChatContentData;
  onImgLoad: () => void;
}

const timeDisplayDelay = 5 * 60;

/** 对应 MessageType */
const MsgTypeClass = {
  1: 'send-msg',
  2: 'add-member',
};

const ChatMsgRender: React.SFC<ChatMsgRenderProps> = (props): JSX.Element[] => {
  const {
    userInfo, selectedChat, currChatContentData,
    onImgLoad
  } = props;
  const { UsersRef } = selectedChat;
  const isGroupChat = selectedChat.ChatType === 1;
  const myName = userInfo.UserName;
  let prevTime = 0;
  const { data = [] } = currChatContentData;

  const msgRow: JSX.Element[] = [];
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
                onLoad={onImgLoad}/>
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
};

export default ChatMsgRender;
