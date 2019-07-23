import React, { useState } from 'react';
import {
  UserInfo, ContactEntity, ChatListEntity, ContactState
} from '@little-chat/core/types';
import { Avatar } from 'ukelli-ui/core/avatar';
import { Button } from 'ukelli-ui/core/button';
import { ShowModal, CloseModal } from 'ukelli-ui/core/modal';
import { selectChat } from '@little-chat/core/actions';
import { AddContact, InitPeerChat, GetFullUser } from '@little-chat/sdk';
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

const AddConfirm = (props) => {
  const { UserName, onSure } = props;
  const [loading, setLoading] = useState(false);
  return (
    <div className="sure-add-panel p20">
      <h4>将要添加用户 {UserName}</h4>
      <Button text="添加" loading={loading} onClick={(e) => {
        setLoading(true);
        onSure();
      }} />
    </div>
  );
};

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
    const contactDetail = await this.getContactInfo();
    this.setState({
      contactDetail
    });
    const isMyContact = this.isMyContact();
    if (isMyContact) {
      this.peerContactToChat(UserID);
    }
  }

  getContactInfo = async () => {
    const { UserID } = this.props;
    const { User } = await GetFullUser({ UserID });
    return User;
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
    if (this.adding) return;
    this.adding = true;
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
      chatListData, onNavigate, contactData,
    } = this.props;
    const { contactDetail } = this.state;
    const { UserID, UserName = '' } = contactDetail;
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
                  const chatIDStr = chatID.toString();
                  const chatEntity = chatListData.obj[chatIDStr];
                  if (chatEntity) {
                    this.props.selectChat(chatIDStr);
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
                    <AddConfirm UserName={UserName} onSure={(e) => {
                      this.addToContact(UserID, () => {
                        CloseModal(ModalID);
                        this.props.onNavigate({
                          type: 'PUSH',
                          route: CONTACT
                        });
                      });
                    }} />
                  ),
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
