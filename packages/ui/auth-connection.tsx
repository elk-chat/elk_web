import React from 'react';
import { Provider as UnistoreProvider, connect as connectUnistore } from 'unistore/react';
import createChatStore from '@little-chat/core/store';
import { Call, EventEmitter } from "basic-helper";
import { Provider as ReduxProvider } from 'react-redux';
import {
  CheckConnectState, InitSDK, CloseWS, SESSION_TIMEOUT
} from '@little-chat/sdk';

import { authStore, authActions } from '@little-chat/core/actions/auth-action';
import AuthSelector from './auth';
import ChatApp from './app';

interface LoginFilterProps {
}

const isMobileFilter = () => /Android|iOS|iPhone/.test(navigator.userAgent);

let chatStore;

class LoginFilter extends React.PureComponent<LoginFilterProps> {
  state = {
    isMobile: isMobileFilter()
  }

  componentDidMount() {
    const { autoLogin } = this.props;
    Call(window.__removeLoading);
    autoLogin();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    document.addEventListener("resize", this.handleResize);
    EventEmitter.on(SESSION_TIMEOUT, this.reconnect);
  }

  componentWillUnmount() {
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    document.removeEventListener("resize", this.handleResize);
    EventEmitter.rm(SESSION_TIMEOUT, this.reconnect);
  }

  /**
   * 检测页面激活的状态的改变
   * 1. 如果页面不激活，则主动断开 websocket，并且在下一次激活页面时重新链接 websocket
   * 2. 如果页面激活了，检查是否正常链接
   *   2-1. 如果已断开链接，再调用自动登陆
   */
  handleVisibilityChange = () => {
    const isVisibility = !document.hidden;
    if (isVisibility) {
      const isConnecting = CheckConnectState();
      if (!isConnecting) {
        this.reconnect();
      }
    } else {
      CloseWS();
    }
  }

  handleResize = () => {
    const isMobile = isMobileFilter();
    console.log(isMobile)
    if (isMobile === this.state.isMobile) return;
    this.setState({
      isMobile
    });
  }

  reconnect = () => {
    CloseWS();
    InitSDK();
    this.props.autoLogin();
  }

  render() {
    const {
      isLogin, applyLogin = true, ...other
    } = this.props;
    const { isMobile } = this.state;
    return (
      <div className={`little-chat-app ${isMobile ? 'mobile' : 'pc'}`}>
        <div className="container">
          <AuthSelector
            applyLogin={applyLogin}
            isLogin={isLogin}
            {...other}>
            {
              () => {
                if (!chatStore) chatStore = createChatStore({});
                return (
                  <ReduxProvider store={chatStore}>
                    <ChatApp
                      isMobile={isMobile}
                      dispatch={chatStore.dispatch}
                      {...this.props} />
                  </ReduxProvider>
                );
              }
            }
          </AuthSelector>
        </div>
      </div>
    );
  }
}

function selector(state) {
  return state;
}


const LoginFilterWithStore = connectUnistore(selector, authActions)(userStore => (
  <LoginFilter {...userStore}/>
));


export default props => (
  <UnistoreProvider store={authStore}>
    <LoginFilterWithStore {...props} />
  </UnistoreProvider>
);
