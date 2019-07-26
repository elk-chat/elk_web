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
import ChatApp from './chat-app';
import VersionComponent, { VersionChecker } from './components/version-com';
import versionInfo from './version.json';

const versionUrl = './version.json';

interface LoginFilterProps {
}

const BG_URL = 'bg_opt.jpg';

const isMobileFilter = () => /Android|iOS|iPhone/.test(navigator.userAgent);

let chatStore;

class LoginFilter extends React.PureComponent<LoginFilterProps> {
  state = {
    isMobile: isMobileFilter(),
  }

  ChatAPPRef = React.createRef()

  componentDidMount() {
    const { autoLogin } = this.props;
    Call(window.__removeLoading);
    autoLogin();
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    document.addEventListener("resize", this.handleResize);
    EventEmitter.on(SESSION_TIMEOUT, this.reconnect);

    /** 向浏览器申请发送通知的权限 */
    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission((status) => {
        // 这将使我们能在 Chrome/Safari 中使用 Notification.permission
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }
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
    const { isMobile } = this.state;
    const isVisibility = !document.hidden;
    if (isVisibility) {
      const isConnecting = CheckConnectState();
      if (!isConnecting) {
        this.reconnect();
      }
    } else if (isMobile) {
      CloseWS();
    }
  }

  handleResize = () => {
    const isMobile = isMobileFilter();
    if (isMobile === this.state.isMobile) return;
    this.setState({
      isMobile
    });
  }

  reconnect = () => {
    const { autoLogin } = this.props;
    CloseWS();
    InitSDK();
    autoLogin();
  }

  render() {
    const {
      isLogin, applyLogin = true, ...other
    } = this.props;
    const { isMobile } = this.state;
    return (
      <div className={`little-chat-app ${isMobile ? 'mobile' : 'pc'} ${isLogin ? 'logged' : 'unlog'}`}>
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
                      versionInfo={versionInfo}
                      {...this.props} />
                  </ReduxProvider>
                );
              }
            }
          </AuthSelector>
        </div>
        {
          !isMobile && (
            <div className="bg-img fill fixbg" style={{
              backgroundImage: `url(/images/${BG_URL})`
            }}></div>
          )
        }
        <VersionChecker versionUrl={versionUrl} versionInfo={versionInfo} />
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
