import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { UserInfo } from '@little-chat/core/types';

interface AccountProps {
  userInfo: UserInfo;
}

export default class Account extends React.Component<AccountProps> {
  render() {
    const { userInfo } = this.props;
    const { avatar, UserName } = userInfo;

    return (
      <div className="account-page">
        <div className="contact-info user-info-c">
          <Avatar scale={50}>
            {UserName[0]}
          </Avatar>
          {UserName}
        </div>
      </div>
    );
  }
}
