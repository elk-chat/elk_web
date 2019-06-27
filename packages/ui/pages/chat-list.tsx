import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { Icon } from 'ukelli-ui/core/icon';
import { ShowModal } from 'ukelli-ui/core/modal';
import { UserInfo, ChatItemEntity, ChatListEntity } from '@little-chat/core/types';
// import { selectChat } from '@little-chat/core/actions';
import { Link } from 'react-multiple-router';
import NavLink from '../components/nav-link';
import AddChatPanel from './add-chat';
import {
  CONTACT
} from '../config/path-mapper';

// interface ChatEntity extends ChatItemEntity {
//   Title: string;
//   ID: string;
// }

interface ChatListProps extends UserInfo {
  chatListData: ChatListEntity;
  selectChat: Function;
  syncContactsAndChats: Function;
}

export default class ChatList extends React.Component<ChatListProps, {}> {
  static RightBtns = props => (
    <span className="add-btn action" onClick={(e) => {
      // console.log(props)
      // props.applyAddChat();
      ShowModal({
        width: '90%',
        marginTop: '40px',
        title: '添加聊天',
        needMinBtn: false,
        needMaxBtn: false,
        children: (
          <AddChatPanel {...props} />
        )
      });
    }}>
      <Icon n="plus" />
    </span>
  )

  componentDidMount() {
    this.props.syncContactsAndChats();
  }

  chatListFilter = chatList => [...chatList].filter(item => [1, 2].indexOf(item) !== -1)

  render() {
    const { chatListData, unreadInfo } = this.props;
    const chatList = this.chatListFilter(chatListData.array);
    const hasChat = chatList.length > 0;
    console.log(chatList);
    // console.log(chatList);

    return hasChat ? (
      <div className="chat-list">
        {
          chatList.map((item, idx) => {
            const {
              Title = '', ChatID, LastMsg, ChatType
            } = item;
            const unreadCount = unreadInfo[ChatID];
            return (
              <NavLink
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
              </NavLink>
            );
          })
        }
      </div>
    ) : (
      <Link
        to={CONTACT}>
        <div className="no-chat-tip p20">
          请添加一个联系人开始
        </div>
      </Link>
    );
  }
}
