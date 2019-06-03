import React from 'react';

interface ChatEntity {
  username: string;
  avatar: string;
}

interface ChatListProps {
  chatListData: ChatEntity[];
}

export default class ChatList extends React.Component<ChatListProps> {
  render() {
    const { chatListData } = this.props;
    return (
      <div className="chat-list">
        {
          chatListData.map((item) => {
            const { username } = item;
            return (
              <div className="chat-item">
                {username}
              </div>
            );
          })
        }
      </div>
    );
  }
}
