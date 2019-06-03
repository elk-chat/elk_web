import React from 'react';

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
      <div>
        朋友圈
      </div>
    );
  }
}
