import React, { Component } from "react";

interface HeadBarProps {
  title: string;
  back?: boolean;
  RightBtns?: React.ElementType;
  NavTabs?: React.ElementType;
}

const MobdileHeadBar: React.SFC<HeadBarProps> = (props) => {
  const {
    title,
    history,
    back,
    RightBtns,
    NavTabs,
    getRedirectCount,
    RNW
  } = props;
  const { statusBarHeight } = RNW;
  const placeholderDiv = <div style={{ height: statusBarHeight }} />;
  return [
    <div key={1} className="mobile-head-bar">
      {placeholderDiv}
      <div className="bar-inner">
        {back && (
          <span
            className="back icon"
            onClick={() => {
              if (getRedirectCount && getRedirectCount() >= 1) {
                history.goBack();
              } else {
                history.push("/");
              }
            }}>
            <i className="fa fa-chevron-left" />
          </span>
        )}
        <span className="title">{title}</span>
        {RightBtns && (
          <span className="right-btns">
            <RightBtns {...this.props} />
          </span>
        )}
      </div>
      {NavTabs && <NavTabs {...this.props} />}
    </div>,
    <div key={2}>
      {placeholderDiv}
      <div
        className={
          `mobile-head-bar-placeholder${  NavTabs ? " has-tabs" : ""}`
        }/>
    </div>
  ];
};

export default MobdileHeadBar;
