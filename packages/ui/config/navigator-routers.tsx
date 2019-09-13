import React from 'react';

import ChatContent from '../pages/chat-content';
import ContactDetail from '../pages/contact-detail';
import LinkLoader from '../pages/link-loader';
import Moment from '../pages/moment';
import SearchContact from '../pages/search-contact';
import ChatDetail from '../pages/chat-detail';
import ChangePW from '../pages/change-pw';

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
  ChatDetail: {
    title: "聊天详情",
    component: ChatDetail
  },
  ChangePW: {
    title: "修改密码",
    component: ChangePW
  },
};

export default navRoutersConfig;
