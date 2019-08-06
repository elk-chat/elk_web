import React, { Component } from "react";

import * as ChatActions from '@little-chat/core/actions';
import * as ChatStateTypes from '@little-chat/core/types';
import {
  RouterMultiple, RouterHelperProps, RouterState,
} from 'react-multiple-router';
import { LOGIN_SUCCESS } from '@little-chat/core/constant';
import { connect } from 'react-redux';
import { Call, EventEmitter } from "basic-helper";

import { chatContentFilter } from '@little-chat/utils/chat-data-filter';
import pageRoutersConfig from './config/page-routers';
import getTabRouteConfig from './config/tab-routers';
import navRoutersConfig from './config/navigator-routers';
import { TabBar, RouterRender, Navigator } from './components';
import { CHAT, CONTACT } from './config/path-mapper';
import { NavRouterMark } from './config/app-config';

import { NavParams } from './components/navigator/navigator';

import "./style/style.scss";

export interface ChatAppProps extends RouterHelperProps {
  dispatch: Function;
  isMobile?: boolean;
  syncContactsAndChats: typeof ChatActions.syncContactsAndChats;
  initChat: typeof ChatActions.initChat;
  chatListData: ChatStateTypes.ChatListEntity;
}

export interface ChatState extends RouterState {
  routerInfo: {
    [propName: string]: {
      params: NavParams;
    };
  };
  activeMainRoute: string;
  totalUnreadCount: number;
  unreadInfo: {
    [chatID: string]: number;
  };
  selectedChat: {};
}

declare global {
  interface Window { __removeLoading: Function }
}

const { RECEIVE_CHAT_MESSAGE, RECEIVE_UNREAD_DATA } = ChatActions;

const getTotalUnreadCount = (unreadInfo) => {
  let res = 0;
  Object.keys(unreadInfo).forEach((chatID) => {
    res += (+unreadInfo[chatID] || 0);
  });
  return +res;
};

const mapStateToProps = state => state;

class ChatApp<P, S> extends RouterMultiple<ChatAppProps, ChatState> {
  /** 默认跳转的路由 */
  // defaultPath = CONTACT;
  defaultPath = CHAT;

  isNative = false;

  isFetchingData = true;

  state = {
    ...this.state,
    activeMainRoute: this.defaultPath,
    totalUnreadCount: 0,
    unreadInfo: {},
    selectedChat: {}
  }

  componentDidMount() {
    const { initChat, syncContactsAndChats, dispatch } = this.props;

    this.initRoute();

    initChat(dispatch);
    // syncContactsAndChats();
    /** 订阅登陆成功 */
    EventEmitter.on(LOGIN_SUCCESS, this.handleLogin);
    /** 接收消息 */
    EventEmitter.on(RECEIVE_CHAT_MESSAGE, this.handleReceiveMsg);
    /** 接收最后未读消息 */
    EventEmitter.on(RECEIVE_UNREAD_DATA, this.handleReceiveUnreadData);
  }

  componentWillUnmount() {
    EventEmitter.rm(LOGIN_SUCCESS, this.handleLogin);
    EventEmitter.rm(RECEIVE_CHAT_MESSAGE, this.handleReceiveMsg);
    EventEmitter.rm(RECEIVE_UNREAD_DATA, this.handleReceiveUnreadData);
  }

  handleLogin = () => {
    this.props.syncContactsAndChats();
    this.isFetchingData = false;
  }

  handleReceiveMsg = ({ chatID, chatContent }) => {
    const { selectedChat } = this.state;
    const chatIDStr = chatID.toString();
    if (selectedChat.ChatID && (selectedChat.ChatID.toString() === chatIDStr)) return;
    this.setState(({ unreadInfo }) => {
      const nextUnreadInfo = {
        ...unreadInfo,
        [chatIDStr]: (unreadInfo[chatIDStr] || 0) + chatContent.length
      };
      return {
        unreadInfo: nextUnreadInfo,
        totalUnreadCount: getTotalUnreadCount(nextUnreadInfo)
      };
    });
    this.notifyMsg(chatContent[0]);
  }

  notifyMsg = (chatContent) => {
    const chatContentRes = chatContentFilter(chatContent);
    if (window.Notification && Notification.permission === 'granted') {
      const { SenderName, Message } = chatContentRes;
      const NotifyObj = new Notification('新消息', {
        body: Message
      });
    }
  }

  handleReceiveUnreadData = (unreadData) => {
    this.setState({
      unreadInfo: unreadData,
      totalUnreadCount: getTotalUnreadCount(unreadData)
    });
  }

  selectChat = (chatID) => {
    const { chatListData } = this.props;
    this.setState(({ unreadInfo }) => {
      const nextUnreadInfo = {
        ...unreadInfo,
        [chatID]: 0,
      };
      return {
        unreadInfo: nextUnreadInfo,
        totalUnreadCount: getTotalUnreadCount(nextUnreadInfo),
        selectedChat: chatID ? chatListData.obj[chatID] : { ChatID: -1 }
      };
    });
    // this.props.selectChat(chatID);
  }

  getProps = () => ({
    ...this.props,
    ...this.state,
    selectChat: this.selectChat,
    onNavigate: this.onNavigate,
  })

  render() {
    const { isMobile } = this.props;
    const {
      activeRoute, activeMainRoute, routerInfo,
      totalUnreadCount, unreadInfo
    } = this.state;
    return (
      <React.Fragment>
        <RouterRender
          {...this.getProps()}
          isFetchingData={this.isFetchingData}
          unreadInfo={unreadInfo}
          activeRoute={isMobile ? activeRoute : activeMainRoute}
          routeConfig={pageRoutersConfig}
          navRouterMark={NavRouterMark} />
        <TabBar
          isMobile={isMobile}
          onChange={(path) => {
            if (!isMobile) {
              this.setState({
                activeMainRoute: path
              });
            }
          }}
          activeMainRoute={activeMainRoute}
          routes={getTabRouteConfig({
            unreadCount: totalUnreadCount
          })} />
        <Navigator
          {...this.getProps()}
          activeRoute={activeRoute}
          NavRouterMark={NavRouterMark}
          navRoutersConfig={navRoutersConfig}
          currRouterConfig={routerInfo[NavRouterMark]} />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, ChatActions)(ChatApp);
