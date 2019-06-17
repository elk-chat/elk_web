/**
 * 滚动控件
 */

import React, { useState, useEffect } from "react";

interface ScrollProps {
}

export default class Scroll extends React.PureComponent<ScrollProps, {}> {
  handleResize = () => {

  }

  componentDidMount() {
    document.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    document.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { children } = this.props;
    return (
      <div
        className="scroll-view">
        {children}
      </div>
    );
  }
}
