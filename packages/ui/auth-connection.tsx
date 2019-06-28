import React from 'react';
import { Provider as UnistoreProvider, connect as connectUnistore } from 'unistore/react';
import createChatStore from '@little-chat/core/store';
import { Call } from "basic-helper";
import { Provider as ReduxProvider } from 'react-redux';

import { authStore, authActions } from '@little-chat/core/actions/auth-action';
import AuthSelector from './auth';
import ChatApp from './app';


class LoginFilter extends React.PureComponent<{}, {}> {
  static defaultProps = {
    isMobile: /Android|iOS|iPhone/.test(navigator.userAgent),
  }

  componentDidMount() {
    Call(window.__removeLoading);
  }

  render() {
    const {
      isLogin, applyLogin, isMobile = true, ...other
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
                const chatStore = createChatStore({});
                return (
                  <ReduxProvider store={chatStore}>
                    <ChatApp
                      dispatch={chatStore.dispatch}
                      {...this.props}
                      {...this.state} />
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
