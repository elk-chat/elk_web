import React from "react";
// import { Route } from 'react-router-dom';

import { RouteEntity } from '../types';

interface RouteEntityEx extends RouteEntity {
  props?: object;
}

interface RouterRenderProps {
  routeConfig: RouteEntityEx[];
  activeRoute: string;
  /** 导航器的标志 */
  navRouterMark: string;
}

const RouterRender: React.SFC<RouterRenderProps> = (propsOfRouterRender: RouterRenderProps) => {
  const { routeConfig, activeRoute, ...other } = propsOfRouterRender;
  return (
    <div className="main-container">
      {
        routeConfig.map((route) => {
          const {
            path, props, component
          } = route;
          const isActive = activeRoute === path;
          const C = component;
          return (
            <div
              key={path}
              className={`route-item ${isActive ? 'active' : ''}`}>
              <C
                {...props}
                {...other} />
            </div>
          );
        })
      }
    </div>
  );
};

export default RouterRender;
