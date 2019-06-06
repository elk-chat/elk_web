import React from 'react';
import { UserInfo, ContactEntity } from '@little-chat/core/types';
import { Avatar } from 'ukelli-ui/core/avatar';
import { Link } from 'react-multiple-router';

interface ContactDetailProps extends UserInfo {
  selectedContact: ContactEntity;
  onNavigate: Function;
}

export default class ContactDetail extends React.Component<ContactDetailProps, {}> {
  render() {
    const {
      selectedContact, NavRouterMark, selectChat, onNavigate
    } = this.props;
    console.log(this.props)
    const { UserName } = selectedContact;
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
          <Link to={NavRouterMark}
            params={{
              Com: 'ChatContent',
              Title: UserName
            }} onClick={(e) => {
              selectChat();
            }}>
            发信息
          </Link>
        </div>
      </div>
    );
  }
}
