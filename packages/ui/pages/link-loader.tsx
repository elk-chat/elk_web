import React from 'react';

import { IsUrl } from '@mini-code/base-func';

interface LinkLoaderProps {
  url: string;
  title: string;
}

export default class LinkLoader extends React.Component<LinkLoaderProps> {
  render() {
    const { url, title } = this.props;

    return (
      <div className="link-loader">
        {
          IsUrl(url) ? (
            <iframe src={url} title={title} className="iframe"
              frameBorder="0" />
          ) : (
            <div>请传入有效链接</div>
          )
        }
      </div>
    );
  }
}
