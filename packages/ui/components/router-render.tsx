import React from "react";
// import { Route } from 'react-router-dom';
import NavHeader from "./navigator/nav-header";

import { RouteEntity } from '../types';

interface RouteEntityEx extends RouteEntity {
  props?: object;
  title?: string;
  header?: boolean;
}

interface RouterRenderProps {
  routeConfig: RouteEntityEx[];
  activeRoute: string;
  /** 导航器的标志 */
  navRouterMark: string;
  /** onNavigate */
  onNavigate: Function;
}

const RouterRender: React.SFC<RouterRenderProps> = (propsOfRouterRender: RouterRenderProps) => {
  const { routeConfig, activeRoute, ...other } = propsOfRouterRender;
  return (
    <div className="main-container">
      {
        routeConfig.map((route) => {
          const {
            path, props, component, title, header = true
          } = route;
          const isActive = activeRoute === path;
          const C = component;
          const hasNavHeader = !!header;
          return (
            <div
              key={path}
              className={`page-item ${isActive ? 'active' : ''} ${hasNavHeader ? 'has-header' : ''}`}>
              {
                hasNavHeader && (
                  <NavHeader
                    onNavigate={propsOfRouterRender.onNavigate}
                    title={title} />
                )
              }
              <div className="page-content">
                <C
                  {...props}
                  {...other} />
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default RouterRender;
