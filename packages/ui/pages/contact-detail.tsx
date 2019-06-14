import React from 'react';
import { UserInfo, ContactEntity, ChatListEntity } from '@little-chat/core/types';
import { Avatar } from 'ukelli-ui/core/avatar';
import Link from '../components/nav-link';

interface ContactDetailProps extends UserInfo {
  selectedContact: ContactEntity;
  chatListData: ChatListEntity;
  onNavigate: Function;
  selectChat: Function;
}

export default class ContactDetail extends React.Component<ContactDetailProps, {}> {
  render() {
    const {
      selectedContact, selectChat, chatListData, onNavigate
    } = this.props;
    const { UserName = '', ChatID } = selectedContact;
    const userAvatar = selectedContact.Avatar;

    return (
      <div className="contact-detail">
        <div className="contact-info">
          <Avatar size={50}>
            {userAvatar || UserName[0]}
          </Avatar>
        </div>
        {UserName}
        <div className="action-group">
          <Link
            className="action-item"
            Com="ChatContent"
            Title={UserName}
            onClick={(e) => {
              selectChat(chatListData[ChatID]);
            }}>
            发信息
          </Link>
        </div>
      </div>
    );
  }
}
