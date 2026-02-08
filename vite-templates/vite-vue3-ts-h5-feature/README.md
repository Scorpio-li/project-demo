# vite-vue3-ts-h5

移动端 h5 项目模板

<!-- <p align="center">
    <img alt="logo" src="https://freely.vercel.app/favicon.ico" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h1 align="center">手机端简易示例《随机热门音乐》</h1>

<p align="center">Vue 3 + Typescript + Vite + Vant + Pinia</p>

<p align="center">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/kingfront/vite_vue3_ts" />
    <img src="https://img.shields.io/github/languages/top/kingfront/vite_vue3_ts?style=flat-square&color=green"  alt="GitHub top language" />
    <img src="https://img.shields.io/badge/dynamic/json?color=green&label=github&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dgithub%26queryKey%3Dkingfront&style=flat-square&logo=github" />
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/kingfront/vite_vue3_ts?color=yellow">
</p>

<p align="center">
🔥 <a target="_blank" href="https://freely.vercel.app/">Demo 访问</a>
&nbsp;
🌈 <a target="_blank" href="https://juejin.cn/post/7070402652948922381">文档</a>
</p> -->

---

## 项目依赖

- 🚀 vue3.2 + vite + typescript + pinia + axios + vant

- 💪 使用 vue3.2 script setup 新语法糖

- 💪 使用 TypeScript

- 🍭 支持 jsx 组件写法

- 🍭 整合 vant ui、less

- 🍭 使用 viewport 移动端方案

- 🍭 使用 pinia 替代 vuex，更简单、更高效

- 🍭 使用 网易云音乐 热门歌曲接口为数据源

- 🍭 Vue-router：自动化导入路由

- 批量全局注册公共组件

## 启动、部署

```shell
  # 安装依赖
  yarn

  # 本地启动
  yarn dev

  # 本地打包
  yarn build
```

## Node 版本要求

Vite 需要 Node.js 12.0.0 或更高版本 (推荐 14.0.0+)。你可以使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。

## 移动端适配

之前移动端适配一直使用 lib-flexible+postcss-pxtorem 方案，随着 viewport 单位得到越来越多浏览器的支持，lib-flexible 官方也基本已经废弃，建议大家都使用 viewport 方案。

将 px 自动转换成 viewport 单位 vw，vw 本质上还是一种百分比单位，100vw 即等于 100%，即 window.innerWidth

## 引入 VantUI

vant@vant/use 包对 typescript 的版本有限制，typescript4.5.5 版本以后，不在支持 VisibilityState 状态，所以需要修改 typescript 版本的依赖

```shell
"devDependencies": {
   // 只使用4.5.x的最高版本
   "typescript": "~4.5.2",
}
```

> 如果使用 typescript 高版本，则 build 时，会报以下错：

```shell
node_modules/@vant/use/dist/usePageVisibility/index.d.ts:2:50 - error TS2304: Cannot find name 'VisibilityState'.
2 export declare function usePageVisibility(): Ref;
Found 1 error in node_modules/@vant/use/dist/usePageVisibility/index.d.ts:2
```

## 代码提交

- feature：新功能

- update：更新某功能

- fixbug：修补某功能的 bug

- refactor：重构某个功能

- optimize: 优化构建工具或运行时性能

- style：仅样式改动

- docs：仅文档新增/改动

- chore：构建过程或辅助工具的变动

## 增加 jest 单元测试

### jest 安装

1.  基本依赖

```shell
yarn add jest babel-jest @vue/vue3-jest @vue/test-utils -D
```

2.  兼容 typescript 需要安装如下

```shell
yarn add @types/jest ts-jest -D
```

3. 兼容全局 @ 别名导入

```js
// jest.conf.js增加如下
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1'
}
```

## 待解决问题

1. router/index 还有些格式错误
