import { RouteEntity } from '../types';
import { CHAT, CONTACT, DISCOVER, ACCOUNT } from './path-mapper';

import ChatList from '../pages/chat';
import {
  Navigator
} from '../components';

function addModalPath(arr: RouteEntity[]) {
  return arr.map((item) => {
    const newItem = Object.assign({}, item);
    newItem.path += "/:modal?/:modal2?/:modal3?";
    return newItem;
  });
}

const routersConfig = addModalPath([
  {
    path: CHAT,
    exact: true,
    component: ChatList
  },
  {
    path: CONTACT,
    exact: true,
    component: ChatList
  },
  {
    path: DISCOVER,
    exact: true,
    component: ChatList
  },
  {
    path: ACCOUNT,
    exact: true,
    component: ChatList
  },
  {
    path: "/n/:component/:p1?/:p2?",
    noPadding: true,
    component: Navigator
  },
]);

export default routersConfig;
