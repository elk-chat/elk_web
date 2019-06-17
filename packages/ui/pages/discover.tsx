import React from 'react';

import Link from '../components/nav-link';

const discoverItems = [
  {
    title: '朋友圈',
    component: 'Moment'
  },
  {
    title: 'Google',
    link: 'https://www.google.com/'
  }
];

interface DiscoverItem {
  text: string;
  icon: string;
  action: Function;
}

interface DiscoverProps {
  discoverEntries: DiscoverItem[];
}

export default class Discover extends React.Component<DiscoverProps> {
  render() {
    const { discoverEntries } = this.props;

    return (
      <div className="discover-page action-group">
        {
          discoverItems.map((item, idx) => {
            const { title, link, component } = item;
            const com = link ? 'LinkLoader' : component;
            return com ? (
              <Link key={idx}
                Com={com}
                Title={title}
                params={link ? {
                  url: link
                } : {}}
                className="action-item">
                {title}
              </Link>
            ) : (
              <div className="action-item">配置不正确</div>
            );
          })
        }
      </div>
    );
  }
}
