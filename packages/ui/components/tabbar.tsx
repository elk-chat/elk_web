/**
 * 首页底部导航栏组件
 */

import React from "react";
import { Link } from 'react-multiple-router';
import { Tip } from 'ukelli-ui/core/tip';

import { RouteEntity } from '../types';

type IconType = string[] | React.ElementType[];

interface RouteExpand extends RouteEntity {
  onClick?: Function;
  hasNew?: boolean;
}

interface TabBarProps {
  /** routeConfig */
  routes: RouteExpand[];
  /** icon */
  icon?: IconType;
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

const TabBar: React.SFC<TabBarProps> = ({ routes }) => (
  <div
    className="tab-bar">
    <div className="inner">
      {
        routes.map((route) => {
          const {
            path, text, icon, exact, unreadCount, onClick
          } = route;
          const Com: string | typeof Link = Link;
          const obj = { to: path, exact, onClick };
          return (
            <Com {...obj} key={path} className="tab-label">
              <div className="icon-wrap">
                <RenderIcon icons={icon} />
              </div>
              <span className="text">{text}</span>
              {
                !!unreadCount && (
                  <Tip animate={false} color="red">{unreadCount}</Tip>
                )
              }
            </Com>
          );
        })}
    </div>
  </div>
);

export default TabBar;
