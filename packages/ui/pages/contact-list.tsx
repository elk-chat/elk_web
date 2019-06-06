import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { UserInfo, ContactEntity } from '@little-chat/core/types';
import { Link } from 'react-multiple-router';

interface ContactProps extends UserInfo {
  contactData: ContactEntity[];
  NavRouterMark: string;
  selectContact: Function;
}

export default class Contact extends React.PureComponent<ContactProps, {}> {
  render() {
    const { contactData, selectContact } = this.props;
    const hasChat = contactData && contactData.length > 0;

    return hasChat ? (
      <div className="contact-list">
        {
          contactData.map((item) => {
            const { UserName, ID } = item;
            const contactAvatar = item.Avatar;
            return (
              <Link
                className=""
                key={ID}
                to={this.props.NavRouterMark}
                onClick={() => {
                  selectContact(item);
                }}
                params={{
                  Com: 'ContactDetail',
                  Title: UserName
                }}>
                <div className="c-item">
                  <Avatar src={contactAvatar || null} size={26}>
                    {contactAvatar || UserName[0]}
                  </Avatar>
                  {UserName}
                </div>
              </Link>
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
