import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { Icon } from 'ukelli-ui/core/icon';
import { ShowModal } from 'ukelli-ui/core/modal';
import { UserInfo, ChatItemEntity, ChatListEntity } from '@little-chat/core/types';
import { selectChat } from '@little-chat/core/actions';
import Link from '../components/nav-link';
import AddChatPanel from './add-chat';

// interface ChatEntity extends ChatItemEntity {
//   Title: string;
//   ID: string;
// }

interface ChatListProps extends UserInfo {
  chatListData: ChatItemEntity[];
  selectChat: typeof selectChat;
  applyFetchChatList: Function;
}

export default class ChatList extends React.Component<ChatListProps, {}> {
  static RightBtns = props => (
    <span className="add-btn action" onClick={(e) => {
      // console.log(props)
      // props.applyAddChat();
      ShowModal({
        width: '90%',
        title: '添加聊天',
        children: (
          <AddChatPanel {...props} />
        )
      });
    }}>
      <Icon n="plus" />
    </span>
  )

  componentDidMount() {
    this.props.applyFetchChatList();
  }

  chatListFilter = ChatType => [1, 2].indexOf(ChatType) !== -1

  render() {
    const { chatListData, unreadInfo } = this.props;
    const hasChat = chatListData.length > 0;
    console.log(chatListData);

    return hasChat ? (
      <div className="chat-list">
        {
          chatListData.map((item, idx) => {
            const {
              Title, ChatID, LastMsg, ChatType
            } = item;
            const unreadCount = unreadInfo[ChatID];
            const isDisplay = this.chatListFilter(ChatType);
            return isDisplay && (
              <Link
                Title={Title}
                Com="ChatContent"
                params={{
                  ChatID,
                }}
                onClick={() => {
                  this.props.selectChat(item);
                }}
                className="chat-item layout" key={ChatID}>
                <Avatar text={Title[0]} size={46} tip={unreadCount} />
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
