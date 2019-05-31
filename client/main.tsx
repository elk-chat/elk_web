import React from "react";

import * as ChatActions from '@little-chat/core/actions';
import { connect } from 'react-redux';

import "./style.scss";


interface AppProps {
  color?: string;
}

class App extends React.Component<AppProps> {
  public static defaultProps: AppProps = {
    color: "red"
  };
  public render() {
    console.log(this.props)
    return (
      <div
        style={{
          fontFamily: 'Arial, "Microsoft YaHei"',
        }}>
        <h2>Little chat</h2>
        <ul>
          <li>使用 protobuf 通讯</li>
          <li>分层架构</li>
          <li>使用 typescript 开发</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, ChatActions)(App);
