import React from 'react';
import { UserInfo } from '@little-chat/core/types';

interface ContactEntity {
  UserName: string;
  Avatar: string;
}

interface ContactProps extends UserInfo {
  contactData: ContactEntity[];
}

export default class Contact extends React.Component<ContactProps> {
  render() {
    const { contactData } = this.props;
    const hasChat = contactData && contactData.length > 0;

    return hasChat ? (
      <div className="contact-list">
        {
          contactData.map((item) => {
            const { UserName } = item;
            return (
              <div className="contact-item">
                {UserName}
              </div>
            );
          })
        }
      </div>
    ) : (
      <div>
        还没有联系人，添加一个试试
      </div>
    );
  }
}
