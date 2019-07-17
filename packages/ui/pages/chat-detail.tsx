import React, { useEffect } from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { Icon } from 'ukelli-ui/core/icon';
import { AddMembersToChat } from '@little-chat/sdk';
import { FormLayout } from 'ukelli-ui/core/form-generator';
import AddChatPanel from './add-chat';

interface ChatDetailProps {
  applyAddChat: Function;
}

const ChatDetail: React.SFC<ChatDetailProps> = (props) => {
  const {
    applyAddChat, selectedChat, chatListData, currChatContentData
  } = props;
  const { ChatID } = selectedChat;
  const currChatData = chatListData.obj[ChatID.toString()];
  const { Users } = currChatData;
  const excludeUsers = Users.map(user => user.UserName);
  return (
    <div className="chat-detail-page">
      <div className="group-users">
        {
          Array.isArray(Users) && Users.map((user) => {
            const { UserID, UserName } = user;
            const userID = UserID.toString();
            return (
              <span className="user-item" key={userID}>
                <Avatar>{UserName[0]}</Avatar>
                <div className="name">{UserName}</div>
              </span>
            );
          })
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
                action={(checkedVal) => {
                  AddMembersToChat({
                    ChatID,
                    UserIDs: checkedVal,
                  })
                    .then(() => {
                      CloseModal(ModalID);
                      props.applyFetchChatList();
                    });
                }}
                {...props} onSuccess={e => CloseModal(ModalID)} />
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
