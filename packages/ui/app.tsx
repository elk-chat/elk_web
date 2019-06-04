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
import { TabBar, RouterRender } from './components';

import "./style/style.scss";

const mapStateToProps = state => state;

export interface ChatAppProps {
  authState: AuthState;
  applyLogin: Function;
  isMobile: boolean;
}

class ChatApp extends RouterMultiple<ChatAppProps, {}> {
  static defaultProps = {
    isMobile: true
  }

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

  render() {
    // console.log(this.props);
    const { authState, applyLogin, ...other } = this.props;
    const { activeRoute } = this.state;
    return (
      <React.Fragment>
        <AutoSelector
          applyLogin={applyLogin}
          {...authState}>
          {
            () => (
              <div>
                <div className="main-container">
                  <RouterRender
                    activeRoute={activeRoute}
                    routeConfig={pageRoutersConfig}
                    {...other} />
                </div>
                <TabBar
                  RNW={this.RNW}
                  routes={getTabRouteConfig({
                    unreadCount: 0
                  })}/>
              </div>
            )
          }
        </AutoSelector>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, ChatActions)(ChatApp);
