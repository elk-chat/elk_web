import React, { Component } from "react";

import { AuthState } from '@little-chat/core/types';
import * as ChatActions from '@little-chat/core/actions';
import {
  RouterMultiple
} from 'react-multiple-router';
import { connect } from 'react-redux';

import AutoSelector from './auth';
import pageRoutersConfig from './config/page-routers';
import getTabRouteConfig from './config/tab-routers';
import navRoutersConfig from './config/navigator-routers';
import { TabBar, RouterRender, Navigator } from './components';
import { CHAT, CONTACT } from './config/path-mapper';
import { NavRouterMark } from './config/app-config';

import "./style/style.scss";

export interface ChatAppProps {
  authState: AuthState;
  applyLogin: Function;
  isMobile?: boolean;
}

declare global {
  interface Window { INIT_NATIVE_FUNC: Function }
}

const mapStateToProps = state => state;

class ChatApp extends RouterMultiple<ChatAppProps, {}> {
  static defaultProps = {
    isMobile: true,
  }

  /** 默认跳转的路由 */
  defaultPath = CONTACT;

  isNative = false;

  RNW: object | null = {};

  componentDidMount() {
    window.INIT_NATIVE_FUNC = (RNW: object | null) => {
      if (!this.isNative) {
        this.isNative = true;
        this.RNW = RNW;
        document.body.classList.add("inNative");
      }
    };
    setTimeout(() => this.clickLoginBtn(), 100);

    this.initRoute();
  }

  clickLoginBtn = () => {
    /** 自动点击登陆按钮完成登陆操作，方便开发 */
    document.querySelector('.login-btn').click();
  }

  getProps = () => ({
    ...this.props,
    ...this.state,
    onNavigate: this.onNavigate,
  })

  render() {
    // console.log(this.props);
    const { authState, applyLogin, ...other } = this.props;
    const { activeRoute, routerInfo } = this.state;
    return (
      <React.Fragment>
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
                  RNW={this.RNW}
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
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, ChatActions)(ChatApp);
