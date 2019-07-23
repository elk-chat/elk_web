import React from 'react';
import { Icon } from 'ukelli-ui/core/icon';
import { Avatar } from 'ukelli-ui/core/avatar';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { DropdownWrapper } from 'ukelli-ui/core/selector';
import { Menus } from 'ukelli-ui/core/menu';
import { chatContentFilter } from '@little-chat/utils/chat-data-filter';

import {
  UserInfo, ChatItemEntity, ChatListEntity, ChatType, FEContentType, FEMessageType
} from '@little-chat/core/types';
// import { selectChat } from '@little-chat/core/actions';
import { Link } from 'react-multiple-router';
import NavLink from '../components/nav-link';
import AddChatPanel from './add-chat';
import {
  CONTACT
} from '../config/path-mapper';
import ChatAvatar from '../components/avatar';

interface ChatListProps extends UserInfo {
  chatListData: ChatListEntity;
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
          str = ChatEntity.Message;
          break;
        case FEContentType.Image:
          str = '「图片」';
          break;
      }
      break;
  }
  return str;
};

const avatarGroup = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const avatarSrcFilter = (chatID) => {
  const remainder = chatID % avatarGroup.length;
  return `/face/${avatarGroup[remainder]}.jpg`;
};

export default class ChatList extends React.PureComponent<ChatListProps, {}> {
  static RightBtns = props => (
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
      <Icon n="plus" className={["p20"]} />
    </DropdownWrapper>
  )

  componentDidMount() {
    this.props.syncContactsAndChats(() => {
      const { chatListData, applySyncChatMessages } = this.props;
      applySyncChatMessages({
        ChatIDs: Object.keys(chatListData.obj),
        Limit: 1
      });
    });
  }

  /**
   * 过滤掉 ChatType 为联系人的数据
   */
  chatListFilter = (chatList) => {
    const { lastMsgInfo } = this.props;
    const nextLit = [...chatList]
      .filter(item => item.ChatType !== ChatType.Contact)
      .sort((f, s) => {
        const FChatID = f.ChatID;
        const SChatID = s.ChatID;
        const FLastInfo = lastMsgInfo[FChatID];
        const SLastInfo = lastMsgInfo[SChatID];
        if (!FLastInfo || !SLastInfo || SLastInfo.length < 1 || FLastInfo.length < 1) {
          return 1;
        }
        if (SLastInfo.ActionTime && FLastInfo.ActionTime) {
          return +SLastInfo.ActionTime.toString() - +FLastInfo.ActionTime.toString();
        }
        return 1;
      });
    return nextLit;
  }

  render() {
    const {
      chatListData, unreadInfo, lastMsgInfo, chatContentData, selectedChat,
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
      <Link
        to={CONTACT}>
        <div className="no-chat-tip p20">
          请添加一个联系人开始
        </div>
      </Link>
    );
  }
}
