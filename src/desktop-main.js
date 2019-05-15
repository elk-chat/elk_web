import React, {Component, PureComponent} from 'react';
import { hot } from 'react-hot-loader';

import './style.scss';
import './mobile.scss';

class App extends Component {
  render() {
    return (
      <div style={{
        fontFamily: 'Arial, "Microsoft YaHei"'
      }}>
        <h2>Desktop 的 React 工程脚手架</h2>
        <ul>
          <li>支持 SCSS</li>
          <li>支持 hot loader</li>
          <li>babel 7</li>
          <li>webpack 4</li>
        </ul>
      </div>
    )
  }
}
export default hot(module)(App);
