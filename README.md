# React 前端工程脚手架

[![Build Status](https://travis-ci.org/SANGET/react-app-seed.svg?branch=master)](https://travis-ci.org/SANGET/react-app-seed)

- 支持 SCSS
- 支持 React hot loader
- 支持 ESLint
- babel 7
- webpack 4

## 使用

先安装 babel cli, 确保 babel 版本为 7

```shell
npm i @babel/core @babel/node @babel/cli -g

babel -v # -> 7
babel-node -v # -> 7
```

```shell
git clone https://github.com/SANGET/react-app-seed.git yourProjectName
cd yourProjectName

# 使用 typescript 版本, 默认为 js 版本
git checkout type

npm run init
```

[typescript 版本说明](https://github.com/SANGET/react-app-seed/tree/type)

## 代码规范约定

### Markdown 文档说明

> 当开发的功能需要提供给其他人员使用时，需要编写对应的开发文档，统一使用 Markdown 来写

推荐使用 vscode 的插件

- markdown all in one // 便于编写 Markdown
- markdownlint        // 便于检查 Markdown 是否符合预期格式

### 开发工具

VSCode | Atom、CodePen

### 代码注解

使用 VSCode 的 document this 插件，在关键的功能函数上编写文档化注释，详情可以参考 [wrodpress](https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/) 的关于 js 文档注释的说明

```js
/**
 * 说明
 *
 * @param {object} params 说明
 * @returns {boolean} 说明
 */
function forDocument(params = {}) {
  return true;
}
```

### Eslint

> 基于 Airbnb 的编码规范，但非强制性，使用编辑器的提示功能，请遵守约定

Step1. 安装 ESLint 开发环境

```shell
yarn add babel-eslint eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-config-airbnb eslint-plugin-node eslint-plugin-promise eslint-plugin-react --dev -W
```

Step2. 编辑器安装 eslint 插件，例如 vscode atom

Step3. 使用 .eslintrc 文件

### 文档生成工具

- JSDoc3
- Docz
- React Styleguide // 很难用

### 测试用例和持续集成

- 根据实际情况使用测试库，目前使用 jest
- 可以根据项目的性质和实际的情况操作，此仓库使用 travis 和 netlify

## 库一览

- [basic-helper](https://github.com/SANGET/basic-helper-js.git)
- [ukelli-ui](https://github.com/ukelli/ukelli-ui.git)
- [uke-request](https://github.com/SANGET/uke-request.git)
- [uke-admin-web-scaffold](https://github.com/SANGET/uke-admin-web-scaffold.git)
- [uke-cli](https://github.com/SANGET/uke-cli.git)
- [uke-admin-seed](https://github.com/SANGET/uke-admin-seed.git)
- [uke-web-server](https://github.com/SANGET/uke-web-server.git)