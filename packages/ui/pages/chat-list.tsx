import React from 'react';
import { UserInfo } from '@little-chat/core/types';

interface ChatEntity {
  UserName: string;
  Avatar: string;
}

interface ChatListProps extends UserInfo {
  chatListData: ChatEntity[];
}

export default class ChatList extends React.Component<ChatListProps> {
  render() {
    const { chatListData } = this.props;
    const hasChat = chatListData && chatListData.length > 0;

    return hasChat ? (
      <div className="chat-list">
        {
          chatListData.map((item) => {
            const { UserName } = item;
            return (
              <div className="chat-item">
                {UserName}
              </div>
            );
          })
        }
      </div>
    ) : (
      <div>
        请选择一个联系人开始
      </div>
    );
  }
}
