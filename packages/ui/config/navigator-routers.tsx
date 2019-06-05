import React from 'react';

import ChatContent from '../pages/chat-content';

const navRoutersConfig = {
  Setting: {
    title: "设置",
    component: () => <div>设置</div>
  },
  ChatContent: {
    title: "详情",
    component: ChatContent
  }
};

export default navRoutersConfig;
