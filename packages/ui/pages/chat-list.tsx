import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { UserInfo } from '@little-chat/core/types';
import * as ChatSDK from '@little-chat/sdk/lib';

interface ChatEntity extends ChatSDK.kproto.IChat {
}

interface ChatListProps extends UserInfo {
  chatListData: ChatEntity[];
  selectChat: Function;
}

export default class ChatList extends React.Component<ChatListProps> {
  render() {
    const { chatListData, selectChat } = this.props;
    const hasChat = chatListData && chatListData.length > 0;
    console.log(this.props);

    return hasChat ? (
      <div className="chat-list">
        {
          chatListData.map((item) => {
            const { Title, ID } = item;
            return (
              <div
                onClick={(e) => {
                  selectChat(ID);
                }}
                className="chat-item layout" key={ID}>
                <Avatar text={Title[0]} />
                <div className="content">
                  {Title}
                </div>
              </div>
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
