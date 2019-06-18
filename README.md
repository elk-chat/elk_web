# Little chat

Little Chat 是一套即时通讯 web 客户端程序。

## 所需知识

- typescript
- react
- redux
  - redux-saga
- protobuff

## 本地配置

在根目录创建 `.config.js` 文件

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
