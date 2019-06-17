import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { UserInfo, ContactEntity, ContactList } from '@little-chat/core/types';
import {
  selectContact
} from '@little-chat/core/actions';
import Link from '../components/nav-link';

interface ContactProps extends UserInfo {
  contactData: ContactList;
  selectContact: typeof selectContact;
}

export default class Contact extends React.PureComponent<ContactProps, {}> {
  render() {
    const { contactData, selectContact } = this.props;
    const contactIDs = Object.keys(contactData);
    const hasContact = contactData && contactIDs.length > 0;

    return hasContact ? (
      <div className="contact-list">
        {
          contactIDs.map((contactID) => {
            const item = contactData[contactID];
            const { UserName, ID } = item;
            const contactAvatar = item.Avatar;
            return (
              <Link
                key={ID}
                Com="ContactDetail"
                Title={UserName}
                onClick={() => {
                  selectContact(item);
                }}>
                <div className="c-item">
                  <Avatar src={contactAvatar || null} size={30}>
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
