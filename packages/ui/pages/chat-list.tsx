import React from 'react';
import { Avatar } from 'ukelli-ui/core/avatar';
import { Icon } from 'ukelli-ui/core/icon';
import { ShowModal } from 'ukelli-ui/core/modal';
import { DropdownWrapper } from 'ukelli-ui/core/selector';
import { Menus } from 'ukelli-ui/core/menu';

import {
  UserInfo, ChatItemEntity, ChatListEntity, ChatType
} from '@little-chat/core/types';
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
    <div className="p20">
      <DropdownWrapper
        position="right"
        needAction={false}
        outside
        overlay={({ hide }) => (
          <Menus data={[
            {
              text: '发起群聊',
              id: '1',
              action: () => {
                ShowModal({
                  width: '90%',
                  marginTop: '40px',
                  title: '发起群聊',
                  needMinBtn: false,
                  needMaxBtn: false,
                  children: (
                    <AddChatPanel {...props} />
                  )
                });
                // props.onNavigate({
                //   type: 'PUSH',
                //   route: 'N',
                //   params: {
                //     Com: 'AddChatPanel',
                //     Title: '添加群聊'
                //   }
                // });
              }
            }
          ]} />
        )}>
        <Icon n="plus" />
      </DropdownWrapper>
    </div>
  )

  componentDidMount() {
    this.props.syncContactsAndChats();
  }

  /**
   * 过滤掉 ChatType 为联系人的数据
   */
  chatListFilter = chatList => [...chatList].filter(item => item.ChatType !== ChatType.Contact)

  render() {
    const { chatListData, unreadInfo } = this.props;
    const chatList = this.chatListFilter(chatListData.array);
    const hasChat = chatList.length > 0;
    // console.log(chatList);

    return hasChat ? (
      <div className="chat-list">
        {
          chatList.map((item, idx) => {
            const {
              Title = '', ChatID, LastMsg
            } = item;
            const chatID = ChatID.toString();
            const unreadCount = unreadInfo[chatID];

            return Title && (
              <NavLink
                Title={Title}
                Com="ChatContent"
                params={{
                  ChatID,
                }}
                onClick={() => {
                  this.props.selectChat(item);
                }}
                className="chat-item layout" key={chatID}>
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
