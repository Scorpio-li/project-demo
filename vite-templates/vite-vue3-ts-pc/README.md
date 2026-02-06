<!--
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-24 18:54:51
 * @email: lzl102872@163.com
 * @LastEditors: lizhiliang
 * @LastEditTime: 2024-06-04 14:05:36
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/README.md
-->

# Vue 3 + TypeScript + Vite

## 主要使用的工具

- Vue3
- Vite
- Typescript
- Element Plus
- Scss
- Tailwind CSS
- Pinia
- VueRouter
- Echarts
- Eslint、Prettier

## 项目创建流程

### 1. 创建Vite项目

```
npm create ite@latest
```

### 2. 安装[Element Plus](https://element-plus.gitee.io/zh-CN/)

- 自动导入
首先你需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件

### 3. 安装SCSS

```
npm install sass -D
```
不需要安装sass-loader和node-sass

### 4. 安装tailwind css

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
配置tailwind.config

tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}", // 这里记得加上vue，官网直接拷贝过来是没有的
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 5. 安装pinia

```
npm install pinia
```

### 6. 安装vueRouter

```
npm install vue-router@latest
```

### 7. 安装eslint

## 全局过滤器

在 3.x 中，过滤器已移除，且不再支持。取而代之的是，我们建议用方法调用或计算属性来替换它们。

```js
// main.ts
// 全局过滤器: 由于过滤器在vue3中已经移除，所以通过设置全局属性的方式来引入$filters
app.config.globalProperties.$filters = {
  decrypt(value: any) {
    return mdDecrypt(value);
  },
};
```

```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ $filters.decrypt(accountBalance) }}</p>
</template>
```

虽然在编译阶段可以正常使用，但打包过程中会报错，暂未查找到原因。所以建议不要使用

## 项目报错记录

### 报错 1： '--isolatedModules' flag is provided.

```shell
node_modules/@vue/reactivity/dist/reactivity.d.ts:26:15 - error TS2748: Cannot access ambient const enums when the '--isolatedModules' flag is provided.
```

- 解决方案: 把 tsconfig.json 文件中的"isolatedModules"设置成 false

### 报错 2：Cannot find name 'ComponentSize'

然后发现是 ComponentSize 的声明找不到

```shell
node_modules/element-plus/es/components/time-select/index.d.ts:94:38 - error TS2304: Cannot find name 'ComponentSize'.
```

- 解决方案：这种情况就随便哪个 d.ts 里加上一句

```ts
type ComponentSize = any;
```

vite + vue3 + vue-router4 + vuex4 + element-UI + axios + mockjs 工程搭建

## 常用业务功能

1. 点击 url 下载文件（download）:

2. 无感刷新 token:

需要刷新的情况：

- 请求前判断 Token 是否过期，过期则刷新

- 请求后根据返回状态判断是否过期，过期则刷新

## 实践功能

1. 引入外部字体（Demo）：c4d52ac3706b814534b1853ee5c34f82060a3b1b

## 尝试功能

1. 尝试数据埋点（Buriedpoint）: c60abb641196afe4451c0c0287d4cdeaa5a88488

## 组件库

### 自动按需加载 api & 组件 & 样式

现在有两个插件可以帮我们解决这些问题，我们在调用时可以不需要 import 而直接使用，且最终打包时，只有实际使用过的 api 和组件才会被 build 进最终产物，它们就是 unplugin-auto-import 和 unplugin-vue-components

- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)：自动按需引入 vue\vue-router\pinia 等的 api

- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components): 自动按需引入 第三方的组件库组件 和 我们自定义的组件

### @vitejs/plugin-vue-jsx

这个插件可以让我们支持 jsx 写法

### @vitejs/plugin-legacy

### vite-svg-loader

这个插件可以让我们直接引入 svg 文件来使用，就像使用 Vue 组件 一样

### vite-plugin-md

这个插件可以帮助我们将 markdown 引入为 Vue 组件 进行使用

> 值得注意的是，因为上面我们配置了 自动按需引入组件 ，安装完后我们只需要把 .md 文件放在 components 目录下就可以直接使用啦

### unplugin-icons

- icones：是一个非常优秀的图标库，里面集成了很多的图标

- unplugin-icons：可以自动按需引入我们所要使用的图标，而不用手动 import

打开[Icones](https://icones.netlify.app/)查看图标

### Windi Css

Windi CSS 可以视为 Tailwind CSS 的上位替代品，它提供更快的加载时间、与 Tailwind v2.0 的完全兼容性以及一系列额外的酷功能。

我们可以进行 原子化 的 css 编程，并且框架自动帮我们做好了按需引入的工作；

### [VueUse](https://vueuse.org/)

VueUse 是一个响应式的 Vue 实用程序的合集，使用它，我们可以把各种各样的东西变成响应式而不用我们手动编写 hook
