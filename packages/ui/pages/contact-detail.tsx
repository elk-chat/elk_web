import React from 'react';
import { UserInfo } from '@little-chat/core/types';

interface ContactEntity {
  UserName: string;
  Avatar: string;
}

interface ContactDetailProps extends UserInfo {
  contact: ContactEntity;
}

export default class ContactDetail extends React.Component<ContactDetailProps, {}> {
  render() {
    const { contact } = this.props;
    // const { UserName, Avatar } = contact;

    return (
      <div className="contact-detail">
        {'UserName'}
      </div>
    );
  }
}
