import React, { Component } from "react";

import { AuthState } from '@little-chat/core/types';
import * as ChatActions from '@little-chat/core/actions';
import {
  RouterMultiple, RouterHelperProps, RouterState,
  RouterEntity
} from 'react-multiple-router';
import { connect } from 'react-redux';

import AutoSelector from './auth';
import pageRoutersConfig from './config/page-routers';
import getTabRouteConfig from './config/tab-routers';
import navRoutersConfig from './config/navigator-routers';
import { TabBar, RouterRender, Navigator } from './components';
import { CHAT, CONTACT } from './config/path-mapper';
import { NavRouterMark } from './config/app-config';

import { NavParams } from './components/navigator/navigator';

import "./style/style.scss";

export interface ChatAppProps extends RouterHelperProps {
  authState: AuthState;
  applyLogin: Function;
  isMobile?: boolean;
}

export interface ChatState extends RouterState {
  routerInfo: {
    [propName: string]: {
      params: NavParams;
    };
  };
}

declare global {
  interface Window { INIT_NATIVE_FUNC: Function }
}

const mapStateToProps = state => state;

class ChatApp extends RouterMultiple<ChatAppProps, ChatState> {
  static defaultProps = {
    isMobile: /Android|iOS|iPhone/.test(navigator.userAgent),
  }

  /** 默认跳转的路由 */
  defaultPath = CONTACT;

  isNative = false;

  componentDidMount() {
    // window.INIT_NATIVE_FUNC = (RNW: object | null) => {
    //   if (!this.isNative) {
    //     this.isNative = true;
    //     this.RNW = RNW;
    //     document.body.classList.add("inNative");
    //   }
    // };

    this.initRoute();
  }

  getProps = () => ({
    ...this.props,
    ...this.state,
    onNavigate: this.onNavigate,
  })

  render() {
    // console.log(this.props);
    const {
      authState, applyLogin, isMobile, ...other
    } = this.props;
    const { activeRoute, routerInfo } = this.state;
    return (
      <div className={`little-chat-app ${isMobile ? 'mobile' : 'pc'}`}>
        <div className="container">
          <AutoSelector
            applyLogin={applyLogin}
            {...authState}>
            {
              () => (
                <div>
                  <RouterRender
                    {...this.getProps()}
                    activeRoute={activeRoute}
                    routeConfig={pageRoutersConfig}
                    navRouterMark={NavRouterMark} />
                  <TabBar
                    routes={getTabRouteConfig({
                      unreadCount: 0
                    })} />
                  <Navigator
                    {...this.getProps()}
                    activeRoute={activeRoute}
                    NavRouterMark={NavRouterMark}
                    navRoutersConfig={navRoutersConfig}
                    currRouterConfig={routerInfo[NavRouterMark]} />
                </div>
              )
            }
          </AutoSelector>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, ChatActions)(ChatApp);
