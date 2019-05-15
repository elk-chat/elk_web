import React from 'react';
import ReactDOM from 'react-dom';

let App;

/** 通过不同的 PLATFORM 参数判断哪个终端入口 */
if (process.env.PLATFORM === "desktop") {
  App = require("./desktop-main").default;
} else if (process.env.PLATFORM === "mobile") {
  App = require("./mobile-main").default;
}

ReactDOM.render(<App />, document.getElementById("Main"));
