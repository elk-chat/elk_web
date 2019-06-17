import React from 'react';
import { UserInfo } from '@little-chat/core/types';

interface MomentProps {
  userInfo: UserInfo;
}

export default class Moment extends React.Component<MomentProps> {
  render() {
    return (
      <div className="moment-page">
        朋友圈
      </div>
    );
  }
}
