# Little chat

Little Chat 是一款即时通讯 web 客户端程序，基于 Protobuf 和 Websocket。提供快速、稳定的即时通讯体验，支持多终端同时登陆、信息同步等功能，更多功能持续完善中。

## 特性

- 多终端同步数据
- 支持已读未读提示
- 稳定可靠的连接

## 基础

- typescript
- react
  - react hook
- redux
  - redux-saga
- protobuff

## 本地配置

配置文件 `./client/.config.js`

```js
module.exports = {
  "apiHost": "ws://host",
  "appName": "Elk Chat",
  "logo": {
    "src": ""
  }
}
```

## 项目结构

主要分为 3 层

1. SDK -> @little-chat/sdk
2. Actions -> @little-chat/core
3. UI -> @little-chat/ui

### SDK

```js
import SDK from '@little-chat/sdk'
```

基于 `proto` 协议，以 `websocket` 作为通讯渠道，构建封装的 `SDK`。

### Actions

```js
import SDK from '@little-chat/core'
```

使用 `SDK` 提供的 `APIs` 构建的核心业务逻辑层，使用 `redux` 定制基础数据结构，使用 `redux-saga` 处理具体业务流程。

### UI

```js
import SDK from '@little-chat/ui'
```

基于 Actions 提供的数据结构，构建渲染 UI 视图。同时在`特殊情况`也可以直接调用 `SDK` 获取数据。例如`搜索功能`，直接使用 `SDK` 获取数据。

## 路由机制

```js
import * as RouterMultiple from 'react-multiple-router'
```

由于 `react-router` 对`多路由共存`支持不友好，所以采用 `admin-scaffold` 管理系统的多路由共存机制，确保页面之间的正确导航关系。为了更好的应对各种情况，所以路由的值经过了 `base64` 处理。

详情查看 `./packages/react-multiple-router` 提供的 `Link` 以及 `onNavigate`。

## 基本概念

### Chat 基本概念

每一个聊天都是一个 `Chat`，根据 `ChatType` 判断是 `一对一聊天` 还是 `群聊`。

### Ack

> TCP为了保证不发生丢包，就给每个包一个序号，同时序号也保证了传送到接收端实体的包的按序接收。然后接收端实体对已成功收到的包发回一个相应的确认信息（ACK）；如果发送端实体在合理的往返时延（RTT）内未收到确认，那么对应的数据包就被假设为已丢失并进行重传。TCP用一个校验和函数来检验数据是否有错误，在发送和接收时都要计算校验和。
>
> 维基百科《网络三次握手》

为了提高消息的可靠性，需要客户端在收到推送消息后发送 Ack 确认消息给服务端，确保消息不丢失。还应用于显示已读未读状态的功能

## TODO

[TODO list](./docs/todo.md)
