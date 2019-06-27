import React from 'react';
import { CallFunc, IsFunc } from 'basic-helper';
import { Tabs, Tab } from 'ukelli-ui/core/tabs';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import LoginPanel, { LoginPanelProps } from './login-panel';
import RegisterPanel, { RegisterPanelProps } from './registe-panel';

export interface LoginSelectorProps {
  isLogin?: boolean;
  children: React.ReactElement | Function;
}

const LoginSelector: React.SFC<LoginSelectorProps & (LoginPanelProps | RegisterPanelProps)> = (props) => {
  const { children, isLogin } = props;

  let container;
  switch (true) {
    case isLogin:
      container = IsFunc(children) ? CallFunc(children)(props) : children;
      break;
      // case autoLoging:
      //   container = (
      //     <div className="auto-loging-tip">自动登陆中，请稍后...</div>
      //   );
      //   break;
    default:
      container = (
        <Tabs className="tabs-container login-tabs">
          <Tab label="登陆">
            <LoginPanel
              {...props}/>
          </Tab>
          <Tab label="注册">
            <RegisterPanel
              {...props}/>
          </Tab>
        </Tabs>
      );
  }
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={isLogin ? 'LOGIN_SUCCESS' : 'NO_LOGIN_YET'}
        classNames="fade"
        timeout={200}>
        {container}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default LoginSelector;
