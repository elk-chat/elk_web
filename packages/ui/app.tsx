import React, { Component } from "react";

import * as ChatActions from '@little-chat/core/actions';
import {
  RouterMultiple, RouterHelperProps, RouterState,
} from 'react-multiple-router';
import { connect } from 'react-redux';
import { Call, EventEmitter } from "basic-helper";

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
}

export interface ChatState extends RouterState {
  routerInfo: {
    [propName: string]: {
      params: NavParams;
    };
  };
  activeMainRoute: string;
}

declare global {
  interface Window { __removeLoading: Function }
}

const getTotalUnreadCount = (unreadInfo) => {
  let res = 0;
  Object.keys(unreadInfo).forEach((chatID) => {
    res += (+unreadInfo[chatID] || 0);
  });
  return +res;
};

const mapStateToProps = (state) => {
  const { chatContentData, selectedChat, unreadInfo } = state;
  const totalUnreadCount = getTotalUnreadCount(unreadInfo);
  const chatID = selectedChat.ChatID || '';
  const currChatContentData = chatContentData[chatID.toString()];
  return {
    ...state,
    totalUnreadCount,
    currChatContentData
  };
};

class ChatApp<P, S> extends RouterMultiple<ChatAppProps, ChatState> {
  /** 默认跳转的路由 */
  // defaultPath = CONTACT;
  defaultPath = CHAT;

  isNative = false;

  state = {
    ...this.state,
    activeMainRoute: this.defaultPath
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.init(dispatch);
    this.initRoute();
  }

  getProps = () => ({
    ...this.props,
    ...this.state,
    onNavigate: this.onNavigate,
  })

  render() {
    const {
      isMobile, totalUnreadCount, ...other
    } = this.props;
    const { activeRoute, activeMainRoute, routerInfo } = this.state;
    return (
      <React.Fragment>
        <RouterRender
          {...this.getProps()}
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
