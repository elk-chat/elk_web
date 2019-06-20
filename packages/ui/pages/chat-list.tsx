import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { UserInfo, ChatItemEntity, ChatListEntity } from '@little-chat/core/types';
import Link from '../components/nav-link';

// interface ChatEntity extends ChatItemEntity {
//   Title: string;
//   ID: string;
// }

interface ChatListProps extends UserInfo {
  chatListData: ChatListEntity;
  selectChat: Function;
  applyFetchChatList: Function;
}

export default class ChatList extends React.Component<ChatListProps, {}> {
  componentDidMount() {
    this.props.applyFetchChatList();
  }

  render() {
    const { chatListData, selectChat } = this.props;
    const chatIDs = Object.keys(chatListData);
    const hasChat = chatIDs.length > 0;

    return hasChat ? (
      <div className="chat-list">
        {
          Object.keys(chatListData).map((chatID) => {
            const item = chatListData[chatID];
            const { Title, ID, LastMsg } = item;
            return (
              <Link
                Title={Title}
                Com="ChatContent"
                params={{
                  ChatID: ID,
                }}
                onClick={() => {
                  selectChat(item);
                }}
                className="chat-item layout" key={ID}>
                <Avatar text={Title[0]} size={46} />
                <div className="content">
                  <div className="chat-title">
                    {Title}
                  </div>
                  <div className="last-msg">
                    {LastMsg}
                  </div>
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
