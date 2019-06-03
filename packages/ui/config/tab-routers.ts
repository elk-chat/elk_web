/**
 * 配置说明
 * path: 路由，可以对应与 Page 的名字，或者在 component-name-mapper.js 中配置 name mapper
 * text: Tab 显示的文字
 * icon: 显示的 icon
 */
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
      icon: []
    },
    {
      path: CONTACT,
      text: "联系人",
      icon: []
    },
    {
      path: DISCOVER,
      text: "发现",
      icon: []
    },
    {
      path: ACCOUNT,
      text: "我的",
      icon: []
    }
  ]
};

export default getTabRouteConfig;
