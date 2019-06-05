import React, { Component } from "react";
import { Icon } from 'ukelli-ui/core/icon';

interface HeadBarProps {
  /** title */
  title?: string;
  /** 是否需要返回按钮 */
  back?: boolean;
  /** 嵌入右边的按钮 */
  RightBtns?: () => React.ElementType;
  /** onNavigate */
  onNavigate: Function;
}

const NavHeader: React.SFC<HeadBarProps> = (props) => {
  const {
    title,
    back,
    RightBtns,
    onNavigate,
  } = props;
  return title ? (
    <React.Fragment>
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
              {RightBtns(this.props)}
            </span>
          )
        }
      </div>
    </React.Fragment>
  ) : null;
};

export default NavHeader;
