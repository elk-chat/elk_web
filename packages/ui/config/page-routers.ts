import { CHAT, CONTACT, DISCOVER, ACCOUNT } from './path-mapper';

import ChatList from '../pages/chat-list';
import ContactList from '../pages/contact-list';
import Discover from '../pages/discover';
import Account from '../pages/account';

const pageRoutersConfig = [
  {
    path: CHAT,
    exact: true,
    title: 'Chat',
    component: ChatList
  },
  {
    path: CONTACT,
    exact: true,
    title: '联系人',
    component: ContactList
  },
  {
    path: DISCOVER,
    exact: true,
    title: '发现',
    component: Discover
  },
  {
    path: ACCOUNT,
    header: false,
    exact: true,
    component: Account
  },
];

export default pageRoutersConfig;
