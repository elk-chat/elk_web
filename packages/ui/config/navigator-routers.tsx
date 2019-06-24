import React from 'react';

import ChatContent from '../pages/chat-content';
import ContactDetail from '../pages/contact-detail';
import LinkLoader from '../pages/link-loader';
import Moment from '../pages/moment';
import SearchContact from '../pages/search-contact';

const navRoutersConfig = {
  Setting: {
    title: "设置",
    component: () => <div>设置</div>
  },
  ChatContent: {
    title: "详情",
    component: ChatContent
  },
  ContactDetail: {
    title: "详情",
    component: ContactDetail
  },
  LinkLoader: {
    title: "详情",
    component: LinkLoader
  },
  Moment: {
    title: "朋友圈",
    component: Moment
  },
  SearchContact: {
    title: "搜索联系人",
    component: SearchContact
  },
};

export default navRoutersConfig;
