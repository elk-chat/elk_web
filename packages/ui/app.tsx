import React, { Component } from "react";

import { AuthState } from '@little-chat/core/types';
import * as ChatActions from '@little-chat/core/actions';
import { withRouter, HashRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AutoSelector from './auth';
import pageRoutersConfig from './config/page-routers';
import getTabRouteConfig from './config/tab-routers';
import { TabBar } from './components';
import { RouteEntity } from '../types';

import "./style/style.scss";

const mapStateToProps = state => state;
const isMobile = true;

export interface ChatAppProps {
  authState: AuthState;
  applyLogin: Function;
}

const RouterRender = (propsOfRouterRender) => {
  const { routeConfig, ...other } = propsOfRouterRender;
  return routeConfig.map((route: RouteEntity) => {
    const { path, exact, props } = route;
    const obj: RouteEntity = { path };
    if (exact) obj.exact = true;
    return (
      <Route
        key={path}
        {...obj}
        render={(_props) => {
          const initConfig = _props.history.location.state || {};
          const { key } = _props.location;
          return (
            <div className={route.noPadding ? "" : "pb60"}>
              <route.component
                {..._props}
                {...props}
                {...other}
                key={key}
                isMobile={isMobile}
                initConfig={initConfig}/>
            </div>
          );
        }}/>
    );
  });
};

class ChatApp extends Component<ChatAppProps> {
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
  }

  render() {
    // console.log(this.props);
    const { authState, applyLogin } = this.props;
    // return (
    //   <AutoSelector
    //     applyLogin={applyLogin}
    //     {...authState}>
    //     {
    //       () => (
    //         <div>
    //           <div>laft</div>
    //           <div>right</div>
    //         </div>
    //       )
    //     }
    //   </AutoSelector>
    // );
    return (
      <div>
        <div className="main-container">
          <RouterRender routeConfig={pageRoutersConfig} />
        </div>
        <Route exact path="/" render={() => <Redirect to="/Chat" />} />
        <TabBar
          RNW={this.RNW}
          routes={getTabRouteConfig({
            unreadCount: 0
          })}/>
      </div>
    );
  }
}

const MainApp = withRouter(connect(mapStateToProps, ChatActions)(ChatApp));

const RouterWrapper = () => (
  <HashRouter>
    <MainApp />
  </HashRouter>
);

export default RouterWrapper;
