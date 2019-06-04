import React, { Component } from "react";

import MobileHeadBar from "./mobile-head-bar";
import MobileCoverHead from "./mobile-cover-head";

import { RouteEntity } from '../../types';

interface NavigatorConfigEntity {
  rightBtns?: [];
  title?: string;
  noHead?: boolean;
  coverHead?: boolean;
}

interface NavigatorProps {
  navigatorConfig: (NavigatorConfigEntity & RouteEntity)[];
  getRedirectCount: Function;
}

export default class Navigator extends Component<NavigatorProps> {
  render() {
    const { getRedirectCount, navigatorConfig } = this.props;
    // const routes = navigatorConfig.map(route => (
    //   <Route
    //     key={route.path}
    //     path={route.path}
    //     render={() => <route.component {...this.props} {...route} />}/>
    // ));
    // const routesNav = navigatorConfig.map(route => (
    //   <Route
    //     key={route.path}
    //     path={route.path}
    //     render={() => {
    //       if (route.noHead) return null;
    //       const Com = route.coverHead ? MobileCoverHead : MobileHeadBar;
    //       return (
    //         <Com
    //           {...this.props}
    //           title={route.title}
    //           getRedirectCount={getRedirectCount}
    //           RightBtns={route.rightBtns}
    //           NavTabs={route.NavTabs}
    //           back={1}/>
    //       );
    //     }}/>
    // ));
    return (
      <div>
        {/* {routesNav}
        {routes} */}
      </div>
    );
  }
}
