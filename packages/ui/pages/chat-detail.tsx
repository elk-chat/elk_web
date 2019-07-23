import React, { useEffect } from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { Icon } from 'ukelli-ui/core/icon';
import { AddMembersToChat, CreateChatAndAddMember } from '@little-chat/sdk';
import { ChatType } from '@little-chat/core/types';
import { FormLayout } from 'ukelli-ui/core/form-generator';
import AddChatPanel from './add-chat';
import ChatAvatar from '../components/avatar';

interface ChatDetailProps {
  applyAddChat: Function;
}

const ChatDetail: React.SFC<ChatDetailProps> = (props) => {
  const {
    applyAddChat, selectedChat, chatListData, currChatContentData,
    applyFetchChatList, userInfo, ChatID
  } = props;
  if (!ChatID) return null;

  const currChatData = chatListData.obj[ChatID.toString()];
  const { Users } = currChatData;
  const excludeUsers = Users.map(user => user.UserName);
  const isGroupChat = selectedChat.ChatType === ChatType.Group;
  const isOneToOneChat = selectedChat.ChatType === ChatType.OneToOne;

  return (
    <div className="chat-detail-page">
      <div className="group-users">
        {
          (Array.isArray(Users) && Users.length > 0) ? Users.map((user) => {
            const { UserID, UserName, AvatarFileID } = user;
            const userID = UserID.toString();
            return (
              <span className="user-item" key={userID}>
                <ChatAvatar
                  AvatarFileID={AvatarFileID}
                  text={UserName[0]} />
                {/* <Avatar>{UserName[0]}</Avatar> */}
                <div className="name">{UserName}</div>
              </span>
            );
          }) : (
            <span>没有更多联系人了</span>
          )
        }
        <span className="user-item" onClick={(e) => {
          const ModalID = ShowModal({
            width: '90%',
            marginTop: '40px',
            title: '加入群聊',
            type: 'side',
            position: 'bottom',
            needMinBtn: false,
            needMaxBtn: false,
            children: (
              <AddChatPanel
                exclude={excludeUsers}
                needInput={false}
                action={(checkedVal, valObj) => {
                  switch (true) {
                    case isGroupChat:
                      AddMembersToChat({
                        ChatID,
                        UserIDs: checkedVal,
                      })
                        .then(() => {
                          CloseModal(ModalID);
                          applyFetchChatList();
                        });
                      break;
                    case isOneToOneChat:
                      const maxName = 5;
                      CreateChatAndAddMember({
                        UserIDs: checkedVal,
                        Title: `${userInfo.UserName},${Object.values(valObj).slice(0, maxName).join(',')}`
                      })
                        .then(() => {
                          CloseModal(ModalID);
                          applyFetchChatList();
                        });
                      break;
                  }
                }}
                onSuccess={e => CloseModal(ModalID)}
                {...props} />
            )
          });
        }}>
          <div className="add-btn">
            <Icon n="plus" />
          </div>
        </span>
      </div>
    </div>
  );
};

export default ChatDetail;
