import React from 'react';

import ChatContent from '../pages/chat-content';
import ContactDetail from '../pages/contact-detail';

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
};

export default navRoutersConfig;
