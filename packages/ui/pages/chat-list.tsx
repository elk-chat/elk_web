import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { UserInfo, ChatItemEntity } from '@little-chat/core/types';
import { Link } from 'react-multiple-router';

interface ChatEntity extends ChatItemEntity {
  Title: string;
  ID: string;
}

interface ChatListProps extends UserInfo {
  chatListData: ChatEntity[];
  selectChat: Function;
  navRouterMark: string;
}

export default class ChatList extends React.Component<ChatListProps, {}> {
  render() {
    const { chatListData, selectChat, navRouterMark } = this.props;
    const hasChat = chatListData && chatListData.length > 0;

    return hasChat ? (
      <div className="chat-list">
        {
          chatListData.map((item) => {
            const { Title, ID } = item;
            return (
              <Link
                to={navRouterMark}
                params={{
                  ChatID: ID,
                  Title,
                  Com: 'ChatContent'
                }}
                onClick={(e) => {
                  selectChat(item);
                }}
                className="chat-item layout" key={ID}>
                <Avatar text={Title[0]} size={30} />
                <div className="content">
                  {Title}
                </div>
              </Link>
            );
          })
        }
      </div>
    ) : (
      <div className="no-chat-tip">
        请选择一个联系人开始
      </div>
    );
  }
}
