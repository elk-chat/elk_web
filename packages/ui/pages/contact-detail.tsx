import React from 'react';
import {
  UserInfo, ContactEntity, ChatListEntity, ContactState
} from '@little-chat/core/types';
import { Avatar } from 'ukelli-ui/core/avatar';
import { Button } from 'ukelli-ui/core/button';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { selectChat } from '@little-chat/core/actions';
import { AddContact, InitPeerChat } from '@little-chat/sdk';
import { CONTACT } from '../config/path-mapper';

import Link from '../components/nav-link';

interface ContactDetailProps extends UserInfo {
  selectedContact: ContactEntity;
  chatListData: ChatListEntity;
  onNavigate: Function;
  selectChat: typeof selectChat;
  contactData: ContactState;
}

interface ContactCacheState {
  [ContactID: string]: {};
}

const CONTACT_CACHE_STATE: ContactCacheState = {};

export default class ContactDetail extends React.PureComponent<ContactDetailProps, {}> {
  connectChat: {
    ChatID: number;
  } = {
    ChatID: -1
  };

  state = {
    contactDetail: {}
  }

  componentDidMount = async () => {
    /** 根据 props 传入的 UserID 获取用户的详细信息 */
    const { UserID } = this.props;
    const isMyContact = this.isMyContact();
    if (isMyContact) {
      this.peerContactToChat(UserID);
    }
  }

  peerContactToChat = async (UserID) => {
    try {
      const { Chat } = await InitPeerChat({
        PeerID: UserID
      });
      this.connectChat = Chat;
    } catch (e) {
      console.log(e);
    }
  }

  addToContact = async (UserID, callback) => {
    const res = await AddContact({
      UserID
    });
    await this.peerContactToChat(UserID);
    this.props.applyGetContacts();
    this.props.applyFetchChatList();
    callback(res);
  }

  isMyContact = () => {
    const { UserID, contactData } = this.props;
    return !!contactData.obj[UserID];
  }

  render() {
    const {
      chatListData, onNavigate, contactData, UserID, UserName = '',
    } = this.props;
    const { contactDetail } = this.state;
    const userAvatar = contactDetail.Avatar;
    const isMyContact = this.isMyContact();

    return (
      <div className="contact-detail">
        <div className="contact-info">
          <Avatar size={50}>
            {userAvatar || UserName[0]}
          </Avatar>
          <span className="username">{UserName}</span>
        </div>
        <div className="action-group">
          {
            isMyContact ? (
              <div
                className="action-item"
                onClick={(e) => {
                  const chatID = this.connectChat.ChatID || '';
                  const chatEntity = chatListData.obj[chatID.toString()];
                  if (chatEntity) {
                    this.props.selectChat(chatEntity);
                    onNavigate({
                      type: 'PUSH',
                      route: 'N',
                      params: {
                        Com: 'ChatContent',
                        Title: UserName
                      }
                    });
                  }
                }}>
                发信息
              </div>
            ) : (
              <div className="action-item" onClick={(e) => {
                const ModalID = ShowModal({
                  marginTop: 0,
                  title: '添加确定',
                  needMaxBtn: false,
                  needMinBtn: false,
                  type: 'side',
                  position: 'top',
                  children: (
                    <div className="sure-add-panel p20">
                      <h4>将要添加用户 {UserName}</h4>
                      <Button text="添加" onClick={(e) => {
                        this.addToContact(UserID, () => {
                          CloseModal(ModalID);
                          this.props.onNavigate({
                            type: 'PUSH',
                            route: CONTACT
                          });
                        });
                      }} />
                    </div>
                  ),
                  // onConfirm: () => {
                  //   this.addToContact(UserID, () => {
                  //     CloseModal(ModalID);
                  //   });
                  // }
                });
              }}>
                添加到通讯录
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
