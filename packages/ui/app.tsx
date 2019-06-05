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
import { CHAT } from './config/path-mapper';

import "./style/style.scss";

export interface ChatAppProps {
  authState: AuthState;
  applyLogin: Function;
  isMobile: boolean;
}

declare global {
  interface Window { INIT_NATIVE_FUNC: Function }
}

const mapStateToProps = state => state;
const NavRouterMark = "N";

class ChatApp extends RouterMultiple<ChatAppProps, {}> {
  static defaultProps = {
    isMobile: true,
  }

  defaultPath = CHAT;

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
    onNavigate: this.onNavigate,
  })

  render() {
    // console.log(this.props);
    const { authState, applyLogin, ...other } = this.props;
    const { activeRoute, routerInfo } = this.state;
    const RouterConfigForNavigator = (activeRoute === NavRouterMark) && routerInfo[NavRouterMark];
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
                {
                  RouterConfigForNavigator && (
                    <Navigator
                      {...this.getProps()}
                      navRoutersConfig={navRoutersConfig}
                      currRouterConfig={RouterConfigForNavigator} />
                  )
                }
              </div>
            )
          }
        </AutoSelector>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, ChatActions)(ChatApp);
