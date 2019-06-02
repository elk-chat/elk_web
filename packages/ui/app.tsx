import React, { Component } from "react";

import { AuthState } from '@little-chat/core/types';

import AutoSelector from './auth';

import "./style/style.scss";

export interface ChatLayoutProps {
  authState: AuthState;
  applyLogin: Function;
}

export default class ChatLayout extends Component<ChatLayoutProps> {
  render() {
    // console.log(this.props);
    const { authState, applyLogin } = this.props;
    return (
      <div className="layout">
        <AutoSelector
          applyLogin={applyLogin}
          {...authState}>
          {
            () => (
              <div>
                <div>laft</div>
                <div>right</div>
              </div>
            )
          }
        </AutoSelector>
      </div>
    );
  }
}
