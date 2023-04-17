# 本项目使用 create-react-app 创建

## 如何启动
使用 npm start 会在本地启动项目。启动项目后，在浏览器输入 http://localhost:3000 即可展示项目页面。

## 如何测试
本项目使用了 jest，只需运行 npm test 即可执行项目内编写的测试用例。

## 如何构建
使用 npm build 即可打包生产环境静态资源。

## 一些细节
- 使用 eslint、prettier、commitlint、husky 来管理项目代码和 git commit msg 质量
- 抽象了 Button、Form、Input、Loading、Popup 五个基础 UI 组件，且编写了单元测试
- 使用 react-router 作为页面路由工具
- 自定义了一个简单的 useToggle hooks
- 使用 useCallback、useMemo 来优化组件多次渲染
- 使用 context + reducer 来管理 Form 和 Input 跨层级组件之间的数据交互，实现跨组件通信
- 使用 forward + useImperativeHandle 来管理父组件调用子组件方法，实现跨组件通信
- 使用 xhr 来管理网络请求，提供 abort 机制
