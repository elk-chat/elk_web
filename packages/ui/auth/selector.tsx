import React from 'react';
import { Call, IsFunc } from 'basic-helper';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import LoginPanel, { LoginPanelProps } from './login-panel';

export interface LoginSelectorProps {
  isLogin?: boolean;
  didMount?: () => void;
  children?: React.ReactElement | Function;
}

const LoginSelector: React.SFC<LoginSelectorProps & LoginPanelProps> = (props) => {
  const { children, isLogin } = props;
  console.log(props.logging)

  let container;
  switch (true) {
    case isLogin:
      container = IsFunc(children) ? children(props) : children;
      break;
      // case autoLoging:
      //   container = (
      //     <div className="auto-loging-tip">自动登陆中，请稍后...</div>
      //   );
      //   break;
    default:
      container = (
        <LoginPanel
          {...props}/>
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
