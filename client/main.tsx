import React from "react";

import "./style.scss";

interface AppProps {
  color?: string
}

class App extends React.Component<AppProps> {
  static defaultProps: AppProps = {
    color: 'red'
  };
  render() {
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

export default App;
