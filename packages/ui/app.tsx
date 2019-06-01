import React, { Component } from "react";

import AutoSelector from './auth';

import "./style/style.scss";

export interface ChatLayoutProps {

}

export default class ChatLayout extends Component<ChatLayoutProps> {
  render() {
    console.log(this.props)
    return (
      <div className="layout">
        <AutoSelector {...this.props}>
          {
            () => {
              return (
                <div>
                  <div>laft</div>
                  <div>right</div>
                </div>
              )
            }
          }
        </AutoSelector>
      </div>
    );
  }
}
