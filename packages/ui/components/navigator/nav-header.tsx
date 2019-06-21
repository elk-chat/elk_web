import React, { Component } from "react";
import { Icon } from 'ukelli-ui/core/icon';

interface HeadBarProps {
  /** title */
  title?: string;
  /** 是否需要返回按钮 */
  back?: boolean;
  passProps?: {};
  /** 嵌入右边的按钮 */
  RightBtns?: (passProps: {}) => React.ElementType;
  /** onNavigate */
  onNavigate: Function;
}

const NavHeader: React.SFC<HeadBarProps> = (props) => {
  const {
    title,
    back,
    passProps,
    RightBtns,
    onNavigate,
  } = props;
  return (
    <div className="navigator-header">
      {
        back && (
          <Icon n="chevron-left"
            classNames={['back-btn']}
            onClick={e => onNavigate({ type: 'GO_BACK' })} />
        )
      }
      {
        <span className="title">{title}</span>
      }
      {
        RightBtns && (
          <span className="right-btns">
            {RightBtns(passProps)}
          </span>
        )
      }
      <div className="bg"></div>
    </div>
  );
};

export default NavHeader;
