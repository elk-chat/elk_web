import React, { Component } from "react";

export default class MobdileHeadBar extends Component {
  render() {
    const {
      title,
      history,
      back,
      RightBtns,
      getRedirectCount,
      transparent, 
    } = this.props;
    return (
      <div
        key={1}
        className={"mobile-cover-head" + (transparent ? "" : " wavebg")}>
        {back && (
          <span
            className="back icon"
            onClick={() => {
              if (getRedirectCount && getRedirectCount() >= 1) {
                history.goBack();
              } else {
                history.push("/");
              }
            }}
          />
        )}
        <span className="title">{title}</span>
        {RightBtns && <RightBtns {...this.props} />}
      </div>
    );
  }
}
