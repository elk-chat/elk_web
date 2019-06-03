import React from 'react';
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
        <div className="user-info-c">
          {UserName}
        </div>
      </div>
    );
  }
}
