# Little chat

Little Chat 是一套即时通讯 web 客户端程序。

## 所需知识

- typescript
- react
- redux
  - redux-saga
- protobuff

## 本地配置

配置文件 `./client/.config.js`

```js
module.exports = {
  "apiHost":"192.168.192.145:9999/gate",
  "beforeWSHook": (data) => {
    // 在发送请求之前的 hook
    return data;
  },
  "afterWSHook": (data) => {
    // 在请求回应之后的 hook
    return data;
  },
}
```

## 项目结构

主要分为 3 层

1. SDK
2. Actions
3. UI

### SDK

```js
import SDK from '@little-chat/sdk'
```

基于 `proto` 协议，以 `websocket` 作为通讯渠道，来构建封装的 `SDK`

### Actions

```js
import SDK from '@little-chat/core'
```

使用 `SDK` 提供的 `APIs` 构建的核心业务逻辑层，使用 `redux` 定制基础数据结构，使用 `redux-saga` 处理具体业务流程。

### UI

```js
import SDK from '@little-chat/ui'
import SDK from 'react-multiple-router'
```

基于 Actions 提供的数据结构，构建渲染 UI 视图。同时在`特殊情况`也可以直接调用 `SDK` 获取数据。例如`搜索功能`，搜索结果挂载在 `redux` 是没有必要的。

## Chat 基本概念

每一个聊天都是一个 `Chat`，根据 `ChatType` 判断是 `一对一聊天` 还是 `群聊`。

## Ack

> TCP为了保证不发生丢包，就给每个包一个序号，同时序号也保证了传送到接收端实体的包的按序接收。然后接收端实体对已成功收到的包发回一个相应的确认信息（ACK）；如果发送端实体在合理的往返时延（RTT）内未收到确认，那么对应的数据包就被假设为已丢失并进行重传。TCP用一个校验和函数来检验数据是否有错误，在发送和接收时都要计算校验和。
>
> 维基百科《网络三次握手》

为了提高消息的可靠性，需要客户端在收到推送消息后发送 Ack 确认消息给服务端，确保消息不丢失。还应用于显示已读未读状态的功能

## 路由机制

由于 `react-router` 对`多路由共存`支持不友好，所以采用 `uke-web-admin-scaffold` 管理系统的多路由共存机制，确保页面之间的跳转关系。

为了更好的应对各种情况，所以路由的值经过了 `base64` 处理。

详情查看 `./packages/react-multiple-router` 提供的 `Link` 以及 `onNavigate`。

## TODO

[TODO list](./docs/todo.md)
