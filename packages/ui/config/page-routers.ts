import { CHAT, CONTACT, DISCOVER, ACCOUNT } from './path-mapper';

import ChatList from '../pages/chat-list';
import Contact from '../pages/contact';
import Discover from '../pages/discover';
import Account from '../pages/account';

const pageRoutersConfig = [
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
];

export default pageRoutersConfig;
