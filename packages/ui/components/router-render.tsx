import React from "react";
import { Route } from 'react-router-dom';

import { RouteEntity } from '../types';

interface RouteEntityEx extends RouteEntity {
  props?: object;
}

interface RouterRenderProps {
  routeConfig: RouteEntityEx[];
}

const RouterRender: React.SFC<RouterRenderProps> = (propsOfRouterRender) => {
  const { routeConfig, ...other } = propsOfRouterRender;
  return routeConfig.map((route) => {
    const { path, exact, props } = route;
    const obj: RouteEntityEx = { path };
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
                initConfig={initConfig}/>
            </div>
          );
        }}/>
    );
  });
};

export default RouterRender;
