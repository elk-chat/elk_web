import React, { Component } from "react";
import { Icon } from 'ukelli-ui/core/icon';
import { RouterEntity } from 'react-multiple-router';

import NavHeader from "./nav-header";
import MobileCoverHead from "./mobile-cover-head";

import { RouteEntity } from '../../types';

interface NavigatorConfigEntity {
  rightBtns?: [];
  title?: string;
  noHead?: boolean;
  coverHead?: boolean;
  component: React.ElementType;
}

interface Params {
  /** 对应 navRoutersConfig 中的 path 的 component */
  Com: string;
  /** 该页面的名字 */
  Name: string;
}

interface NavigatorProps {
  /** 导航配置，对应的 currRouterConfig 中的配置 */
  navRoutersConfig: {
    [pathName: string]: NavigatorConfigEntity;
  };
  onNavigate: Function;
  /** 当前激活的路由配置 */
  routerInfo: RouterEntity;
  NavRouterMark: string;
}

interface RouteCacheEntity {
  [componentName: string]: {
    params: Params;
  };
}

/**
 * 路由缓存，把打开过的页面信息保存，保证页面数据正确。
 */
let RouteCache: RouteCacheEntity = {};

/**
 * 多级页面渲染导航器，可以让多个页面共存的机制，保证返回前进都在正确位置。
 */
const Navigator: React.SFC<NavigatorProps> = (props) => {
  const {
    currRouterConfig, navRoutersConfig, activeRoute, NavRouterMark
  } = props;
  const isNavRouterActive = activeRoute === NavRouterMark;
  if (!currRouterConfig || !isNavRouterActive) {
    /** 当激活的路由不在 NavRouterMark 下时，清空缓存信息 */
    RouteCache = {};
    return <span />;
  }
  const activeComponentName = currRouterConfig.params.Com;

  /** 将 currRouterConfig 缓存到 RouteCache */
  RouteCache[activeComponentName] = currRouterConfig;

  return Object.keys(RouteCache).map((comName) => {
    const currCacheRouterConfig = RouteCache[comName];
    const { Com, Name } = currCacheRouterConfig.params;
    /** 保证每个页面都正确渲染 */
    const key = JSON.stringify(currCacheRouterConfig.params);
    const currConfig = navRoutersConfig[Com] || {};
    const { component } = currConfig;
    const C = component;
    const isActive = activeComponentName === Com;
    return C && (
      <div
        key={key}
        className={`navigator-page${isActive ? ' active' : ''}`}>
        <NavHeader
          {...props}
          back
          title={Name} />
        <div className="navigator-content">
          <C {...props} />
        </div>
        {/* {routesNav}
          {routes} */}
      </div>
    );
  });
};

export default Navigator;

// export default class Navigator extends Component<NavigatorProps, {}> {
//   render() {

//   }
// }
