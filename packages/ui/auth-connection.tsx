import React, { useEffect } from 'react';
import { Provider as UnistoreProvider, connect as connectUnistore } from 'unistore/react';
import createChatStore from '@little-chat/core/store';
import { Call } from "basic-helper";
import { Provider as ReduxProvider } from 'react-redux';

import { authStore, authActions } from '@little-chat/core/actions/auth-action';
import AuthSelector from './auth';
import ChatApp from './app';

const isMobile = /Android|iOS|iPhone/.test(navigator.userAgent);

let chatStore = null;

class LoginFilter extends React.PureComponent {
  componentDidMount() {
    Call(window.__removeLoading);
    this.props.autoLogin();
  }

  render() {
    const {
      isLogin, applyLogin = true, ...other
    } = this.props;
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


export default () => (
  <UnistoreProvider store={authStore}>
    <LoginFilterWithStore/>
  </UnistoreProvider>
);
