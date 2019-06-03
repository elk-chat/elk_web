/**
 * 配置说明
 * path: 路由，可以对应与 Page 的名字，或者在 component-name-mapper.js 中配置 name mapper
 * text: Tab 显示的文字
 * icon: 显示的 icon
 */
import React from 'react';
import { PureIcon } from 'ukelli-ui/core/icon';

import { RouteEntity } from '../types';
import { CHAT, CONTACT, DISCOVER, ACCOUNT } from './path-mapper';

interface RouteParams {
  unreadCount: number;
}

const getTabRouteConfig = (params: RouteParams): RouteEntity[] => {
  const { unreadCount } = params;
  return [
    {
      path: CHAT,
      text: "聊天",
      unreadCount,
      icon: [<PureIcon n="far fa-comments" />, <PureIcon n="fas fa-comments" />]
    },
    {
      path: CONTACT,
      text: "联系人",
      icon: [<PureIcon n="far fa-address-book" />, <PureIcon n="fas fa-address-book" />]
    },
    {
      path: DISCOVER,
      text: "发现",
      icon: [<PureIcon n="far fa-compass" />, <PureIcon n="fas fa-compass" />]
    },
    {
      path: ACCOUNT,
      text: "我的",
      icon: [<PureIcon n="far fa-user-circle" />, <PureIcon n="fas fa-user-circle" />]
    }
  ]
};

export default getTabRouteConfig;
