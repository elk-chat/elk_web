/**
 * 首页底部导航栏组件
 */

import React from "react";
import { Link } from 'react-multiple-router';

import { RouteEntity } from '../types';

interface RouteExpand {
  onClick?: Function;
  hasNew?: boolean;
}

interface TabBarProps {
  /** routeConfig */
  routes: (RouteEntity & RouteExpand)[];
  /** Native 的函数 */
  RNW: object | null;
}

const TabBar: React.SFC<TabBarProps> = ({ routes, RNW }) => (
  <div
    className="tab-bar"
    style={{ paddingBottom: RNW && RNW.isIphoneX ? 16 : 0 }}>
    <div className="inner">
      {
        routes.map((route) => {
          const { path, text, icon, exact, onClick } = route;
          let Com: string | typeof Link = Link;
          let obj = { to: path, activeClassName: "active", exact };
          if (onClick) {
            Com = "a";
            obj = { onClick };
          }
          // 添加提示小点
          const cls = route.path === "/Account" && route.hasNew ? " new-tip" : "";
          return (
            <Com {...obj} key={path} className={`tab-label${cls}`}>
              <div className="icon-wrap">
                <div
                  className="icon default"
                  style={{ backgroundImage: `url(${icon[0]})` }}>
                  {React.isValidElement(icon[0]) && icon[0]}
                </div>
                <div
                  className="icon active"
                  style={{ backgroundImage: `url(${icon[1]})` }}>
                  {React.isValidElement(icon[1]) && icon[1]}
                </div>
              </div>
              <span className="text">{text}</span>
            </Com>
          );
        })}
    </div>
  </div>
);

export default TabBar;
