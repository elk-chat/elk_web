import React from 'react';
import { Icon } from 'ukelli-ui/core/icon';
import { Avatar } from 'ukelli-ui/core/avatar';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { DropdownWrapper } from 'ukelli-ui/core/selector';
import { Menus } from 'ukelli-ui/core/menu';
import { chatContentFilter } from '@little-chat/utils/chat-data-filter';

import {
  UserInfo, LastMsgInfo, ChatListEntity, ChatType, FEContentType, FEMessageType
} from '@little-chat/core/types';
// import { selectChat } from '@little-chat/core/actions';
import NavLink from '../components/nav-link';
import AddChatPanel from './add-chat';
import {
  CONTACT
} from '../config/path-mapper';
import ChatAvatar from '../components/avatar';

interface ChatListProps extends UserInfo {
  chatListData: ChatListEntity;
  lastMsgInfo: LastMsgInfo;
  selectChat: Function;
  syncContactsAndChats: Function;
}

const msgFilter = (ChatEntity) => {
  let str = '';
  if (!ChatEntity) return '「暂无内容」';
  switch (ChatEntity.MessageType) {
    case FEMessageType.AddMember:
      str = `${ChatEntity.AddedMemeberName}加入了聊天`;
      break;
    case FEMessageType.SendMessage:
      switch (ChatEntity.ContentType) {
        case FEContentType.Text:
          const { SenderName, Message } = ChatEntity;
          str = `${SenderName}: ${Message}`;
          break;
        case FEContentType.Image:
          str = '「图片」';
          break;
      }
      break;
  }
  return str;
};

export default class ChatList extends React.PureComponent<ChatListProps, {}> {
  static RightBtns = props => (
    <DropdownWrapper
      position="right"
      outside
      overlay={({ hide }) => (
        <Menus data={[
          {
            text: '发起群聊',
            id: '1',
            action: () => {
              const ModalID = ShowModal({
                width: '90%',
                marginTop: '40px',
                title: '发起群聊',
                type: 'side',
                position: 'bottom',
                needMinBtn: false,
                needMaxBtn: false,
                children: (
                  <AddChatPanel {...props} onSuccess={e => CloseModal(ModalID)} />
                )
              });
            }
          }
        ]} />
      )}>
      <Icon n="plus" classNames={["p15"]} />
    </DropdownWrapper>
  )

  /**
   * 过滤掉 ChatType 为联系人的数据
   */
  chatListFilter = (chatList) => {
    const { lastMsgInfo } = this.props;
    const nextLit = [...chatList]
      .filter(item => item.ChatType !== ChatType.Contact)
      .sort((f, s) => {
        const FChatID = f.ChatID.toString();
        const SChatID = s.ChatID.toString();
        const FLastInfo = lastMsgInfo[FChatID];
        const SLastInfo = lastMsgInfo[SChatID];
        if (!FLastInfo || !FLastInfo.ActionTime) {
          return 1;
        }
        if (!SLastInfo || !SLastInfo.ActionTime) {
          return -1;
        }

        const result = +SLastInfo.ActionTime.toString() - +FLastInfo.ActionTime.toString();

        return result;
        // return -1;
      });
    return nextLit;
  }

  render() {
    const {
      chatListData, unreadInfo, lastMsgInfo, selectedChat,
    } = this.props;
    const chatList = this.chatListFilter(chatListData.array);
    const hasChat = chatList.length > 0;
    // console.log(chatList);

    return hasChat ? (
      <div className="chat-list">
        {
          chatList.map((item, idx) => {
            const {
              Title = '', ChatID, Users = []
            } = item;
            const chatID = ChatID.toString();
            const unreadCount = unreadInfo[chatID];
            const currLastMsg = chatContentFilter(lastMsgInfo[chatID]);
            const isActive = selectedChat.ChatID && (selectedChat.ChatID.toString() === chatID);
            const isOneToOneChat = item.ChatType === ChatType.OneToOne;

            return Title && (
              <NavLink
                Title={Title}
                Com="ChatContent"
                params={{
                  ChatID,
                }}
                onClick={() => {
                  this.props.selectChat(ChatID);
                }}
                isActive={isActive}
                className="chat-item layout"
                key={chatID}>
                {
                  isOneToOneChat ? (
                    <ChatAvatar
                      AvatarFileID={Users[0] ? Users[0].AvatarFileID : ''}
                      text={Title[0]}
                      size={46}
                      tip={unreadCount} />
                  ) : (
                    <Avatar text={Title[0]} size={46} tip={unreadCount} />
                  )
                }
                <div className="content">
                  <div className="chat-title">
                    {Title}
                    {
                      process.env.NODE_ENV === 'development' && ` ChatID: ${chatID}`
                    }
                  </div>
                  <div className="last-msg">
                    {msgFilter(currLastMsg)}
                  </div>
                </div>
              </NavLink>
            );
          })
        }
      </div>
    ) : (
      <NavLink
        Com="SearchContact" Title="搜索联系人" className="link">
        <div className="no-chat-tip p20">
          请添加一个联系人开始聊天
        </div>
      </NavLink>
    );
  }
}
