import { RouteEntity } from '../types';
import { CHAT, CONTACT, DISCOVER, ACCOUNT } from './path-mapper';

import ChatList from '../pages/chat-list';
import Contact from '../pages/contact';
import Discover from '../pages/discover';
import Account from '../pages/account';
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
    component: Contact
  },
  {
    path: DISCOVER,
    exact: true,
    component: Discover
  },
  {
    path: ACCOUNT,
    exact: true,
    component: Account
  },
  {
    path: "/n/:component/:p1?/:p2?",
    noPadding: true,
    component: Navigator
  },
]);

export default routersConfig;
