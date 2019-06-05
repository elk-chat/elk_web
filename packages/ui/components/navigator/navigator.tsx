import React, { Component } from "react";
import { Icon } from 'ukelli-ui/core/icon';

import MobileHeadBar from "./mobile-head-bar";
import MobileCoverHead from "./mobile-cover-head";

import { RouteEntity } from '../../types';

interface NavigatorConfigEntity {
  rightBtns?: [];
  title?: string;
  noHead?: boolean;
  coverHead?: boolean;
  component: () => React.ElementType;
}

interface NavigatorProps {
  /** 导航配置，对应的 currRouterConfig 中的配置 */
  navRoutersConfig: {
    [pathName: string]: NavigatorConfigEntity;
  };
  onNavigate: Function;
  /** 当前激活的路由配置 */
  currRouterConfig: {
    params: {
      /** 对应 navRoutersConfig 中的 path 的 component */
      Com: string;
      /** 该页面的名字 */
      Name: string;
    };
  };
}

export default class Navigator extends Component<NavigatorProps, {}> {
  render() {
    const { currRouterConfig, navRoutersConfig, onNavigate } = this.props;
    if (!currRouterConfig) return <span />;
    const { Com, Name } = currRouterConfig.params;
    const C = navRoutersConfig[Com].component;
    return (
      <div className="navigator-page">
        <div className="navigator-header">
          <Icon n="chevron-left"
            classNames={['back-btn']}
            onClick={e => onNavigate({ type: 'GO_BACK' })} />
          {Name}
        </div>
        <div className="navigator-content">
          <C {...this.props} />
        </div>
        {/* {routesNav}
        {routes} */}
      </div>
    );
  }
}
