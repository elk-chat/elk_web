/**
 * 首页底部导航栏组件
 */

import React from "react";
import { Link } from 'react-multiple-router';

import { RouteEntity } from '../types';

type IconType = string[] | React.ElementType[];

interface RouteExpand extends RouteEntity {
  onClick?: Function;
  hasNew?: boolean;
}

interface TabBarProps {
  /** routeConfig */
  routes: RouteExpand[];
  /** Native 的函数 */
  RNW: object | null;
  /** icon */
  icon: IconType;
}

const iconClassName = ['default', 'active'];

const RenderIcon = ({ icons }) => icons.map((i, idx): React.ElementType => {
  let res;
  const key = idx;
  const className = iconClassName[idx];
  if (React.isValidElement(i)) {
    res = React.cloneElement(i, {
      key,
      classNames: [className]
    });
  } else {
    res = (
      <div
        key={key}
        className={`icon ${className}`}
        style={{ backgroundImage: `url(${i})` }} />
    );
  }
  return res;
});

const TabBar: React.SFC<TabBarProps> = ({ routes, RNW }) => (
  <div
    className="tab-bar">
    <div className="inner">
      {
        routes.map((route) => {
          const {
            path, text, icon, exact, onClick
          } = route;
          let Com: string | typeof Link = Link;
          let obj = { to: path, activeClassName: "active", exact };
          if (onClick) {
            Com = "a";
            obj = { onClick };
          }
          return (
            <Com {...obj} key={path} className="tab-label">
              <div className="icon-wrap">
                <RenderIcon icons={icon} />
              </div>
              <span className="text">{text}</span>
            </Com>
          );
        })}
    </div>
  </div>
);

export default TabBar;
