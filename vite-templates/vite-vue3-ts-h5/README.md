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

## 项目创建

### 1. Vite 创建项目

交互式：

```sh
$ npm create vite@latest
Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) y
✔ Project name: … vue3-vant-mobile
✔ Select a framework: › vue
✔ Select a variant: › vue-ts
```

一步到胃式：
```sh
# npm 7+, extra double-dash is needed:
npm create vite@latest vue3-vant-mobile -- --template vue-ts
```
| 注意：
| Vite2 需要 Node.js 版本 >= 12.0.0；Vite3 需要 Node.js 版本 14.18+，16+。
| 我当初创建项目是vite@2.9.1，现在已经3.0.x了🤨

使用 npm create vite@latest 创建的项目(vite@3.0.x)会在 package.json 中加入 "type": "module" ，而我当初创建项目时使用的vite@2.9.5是没有添加 type 字段的

type字段用于定义package.json文件和该文件所在目录根目录中 .js 文件和 无拓展名 文件的模块化处理规范。值为 module 则采用ESModule规范；值为 commonjs 或 省略 则采用commonjs规范

不论package.json中的type字段为何值，.mjs 的文件都按照es模块来处理，.cjs 的文件都按照commonjs模块来处理

所以需要注意，根目录下的 .js 配置文件一般都是commonjs模块，需要命名为 .cjs。如：下面会讲到的eslintrc如果是通过'npx eslint --init'自动生成的，那么其后缀自动为 .cjs，prettierrc 和 postcss.config是手动创建的，那么就需要命名为 .cjs

或者你也可以直接去掉package.json中的"type": "module"项，依旧使用 .js 😏

- 补充一点🤏🤏小知识
npm create vite@latest 这个命令中的create其实就是init的alias，等同于 npm init vite@latest
执行'npm create vite@latest'其实会去调用create-vite这个包，用@x.x.x指定的不是vite的版本，而是create-vite的版本。
所以如果你想用老版本vite创建项目，如执行 npm create vite@2.9.5 ，并不是表示用vite@2.9.5创建项目，而是用create-vite@2.9.5创建项目，创建后的vite版本并不一定是2.9.5。(事实上没有create-vite@2.9.5这个版本，执行这条命令会报错找不到该版本😁)
那么怎么查看create-vite和vite对应的版本号呢？
直接去vite仓库看模版文件 vite/packages/create-vite/package.json ，切换tag找到对应的版本如: create-vite@2.9.2
可以看到对应关系为：

create-vite@2.9.2 -> vite@2.9.5
create-vite@2.9.4 -> vite@2.9.9
create-vite@3.0.0 -> vite@3.0.0 // 也就是从这个版本开始，package.json 添加了 "type": "module"

### 2. 代码规范 (格式化、提示)

#### 2.1 eslint

```sh
# 自动生成配置文件并安装下面四个依赖
npx eslint --init

# 或者手动创建文件
# npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue -D

```
```
$ npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
✔ How would you like to use ESLint? · problems (选第二个)
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ What format do you want your config file to be in? · JavaScript
```

- 小知识
| @typescript-eslint/parser: ESLint 默认使用的是 Espree 进行语法解析，所以无法对部分 typescript 语法进行解析，需要替换掉默认的解析器

| @typescript-eslint/eslint-plugin: 作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则

| eslint-plugin-vue: 让 eslint 识别 vue 文件

- 注意事项
 需要给vue自动生成的env.d.ts文件添加eslint忽略注释 : 

```
// src/env.d.ts

// eslint-disable-next-line @typescript-eslint/ no-explicit-any, @typescript-eslint/ban-types
const component: DefineComponent<{}, {}, any>;
```

#### 2.2 prettier

```sh
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```

- 创建prettier文件

```js
// prettier.cjs

module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false, // 是否使用tab进行缩进，默认为false
  singleQuote: true, // 是否使用单引号代替双引号，默认为false
  semi: true, // 行尾是否使用分号，默认为true
  arrowParens: 'always',
  endOfLine: 'auto',
  vueIndentScriptAndStyle: true,
  htmlWhitespaceSensitivity: 'strict',
};
```

- 配置eslintrc

```
// eslintrc.cjs

module.exports = {
  root: true, // 停止向上查找父级目录中的配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier', // eslint-config-prettier 的缩写
  ],
  parser: 'vue-eslint-parser', // 指定要使用的解析器
  // 给解析器传入一些其他的配置参数
  parserOptions: {
    ecmaVersion: 'latest', // 支持的es版本
    parser: '@typescript-eslint/parser',
    sourceType: 'module', // 模块类型，默认为script，我们设置为module
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'], // eslint-plugin- 可以省略
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
```

- 需要给vue自动生成的env.d.ts文件添加eslint忽略注释

```ts
// src/env.d.ts

// eslint-disable-next-line @typescript-eslint/ no-explicit-any, @typescript-eslint/ban-types
const component: DefineComponent<{}, {}, any>;
```

- 添加lint命令

```json
// package.json

// 可以运行`npm run lint`检查代码
"lint": "eslint --ext .js,.vue,.ts src --fix"
```

#### 2.3 husky, lint-stage, commitlint

我项目中没有安装，需要的小伙伴可自行安装😌

```sh
# 安装husky和lint-stage，并且配置好husky。
npx mrm lint-staged -D

# 安装commitlint校验提交信息格式
npm install @commitlint/cli @commitlint/config-conventional -D
```

#### 2.4 保存文件自动格式化

```json
// .vscode/settings.json

{
  // 保存时eslint自动修复错误
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  //保存自动格式化
  "editor.formatOnSave": true
}
```
| 建议将.vscode文件夹添加到git记录中


#### 2.5 Volar

使用vscode的小伙伴请注意，vue3项目就不要使用Vetur插件了，它不支持很多vue3特性，会有很多红线警告。

请使用官方推荐插件Volar，现已更名为Vue Language Features，再搭配TypeScript Vue Plugin，开始愉快地敲代码吧👨‍💻

### 3. 配置 tsconfig

```json
// tsconfig.json

{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    // 👆是初始化默认配置
    /*
      在ts中导入js模块会报错找不到类型声明
      解决方法一：
        仅设置 "allowJs": true 即可
        注：allowJs设置true时，下方include不可以加入'src/**\/*.js'，否则报错'无法写入文件xx因为它会覆盖输入文件'
      方法二：
        仅在 env.d.ts 中加入 declare module '*.js'; 模块定义即可

      总结：和 "include": ["src/**\/*.js"] 没有任何关系
    */
    "allowJs": true, // 允许编译器编译JS，JSX文件
    "baseUrl": "./",
    // "typeRoots": [
    //   "node_modules/@types" // 默认会从'node_modules/@types'路径去引入声明文件
    // ],
    // "types": ["node"] // 仅引入'node'模块
    // "paths"是相对于"baseUrl"进行解析
    // 在vite.config里配置了路径别名resolve.alias，为了让编译 ts 时也能够解析对应的路径，我们还需要配置 paths 选项
    "paths": {
      "@/*": ["src/*"],
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  // references属性是 TypeScript 3.0 的新特性，允许将 TypeScript 程序拆分结构化(即拆成多个文件，分别配置不同的部分)。
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 4. 环境变量

| vite官方文档: [环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)

1. 根目录创建.env.[mode]文件

```sh
# base

# env文件中所有值都是字符串
# 对于true/false的变量，拿到的是'true'/'false'，并不是boolean，不能直接使用，需要判断VITE_KEY === 'true'
# 或者将变量定义为boolean，用'true'表示true，''表示false，使用的时候再用Boolean()转换

# 页面标题
VITE_APP_TITLE = vue3-vant-mobile
# 接口请求地址，会设置到 axios 的 baseURL 参数上
VITE_APP_API_BASE_URL = /api


# .env.development

# 开发环境
NODE_ENV = development

VITE_APP_API_BASE_URL = /api-dev

# 是否在打包时生成 sourcemap
VITE_BUILD_SOURCEMAP = true
# 是否在打包时删除 console 代码
VITE_BUILD_DROP_CONSOLE = false
# 是否开启调试工具 vconsole
VITE_BUILD_VCONSOLE = true

# .env.test
# .env.production
...
```

- .env.[mode]文件中的mode可自定义，如.env.development对应package.json脚本中的--mode development

- 只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码

2. 为 import.meta.env 提供额外的类型定义

```ts
// src/vite-env.d.ts

// vite2为src/env.d.ts，vite3已改为src/vite-env.d.ts

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_BUILD_SOURCEMAP: string;
  readonly VITE_BUILD_DROP_CONSOLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

3. 将src/vite-env.d.ts添加到tsconfig中

```ts
// tsconfig.node.json

{
  // 只有同时加入 "src/vite-env.d.ts" 才能使vite.config.ts中能使用src/vite-env.d.ts中的全局类型
  "include": ["vite.config.ts", "src/vite-env.d.ts"]
}
```

4. 定义process.env

- 未添加@types/node类型定义的请先添加：
```sh
npm i @types/node -D
```

```ts
// vite.config.ts

import { defineConfig, loadEnv } from 'vite';

export default ({ command, mode }) => {
  // 获取环境变量
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      'process.env': env,
    },
  });
};
```

5. 使用环境变量

- vite.config 中通过 loadEnv加载

```ts
// vite.config.ts

build: {
  outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
  sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
  // minify默认esbuild，esbuild模式下terserOptions将失效
  // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
  minify: 'terser',
  terserOptions: {
    compress: {
      keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
      drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
      drop_debugger: true, // 去除 debugger
    },
  },
  chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
},
```

- index.html 中通过vite-plugin-html加载

```sh
npm i vite-plugin-html -D
```

```ts
// vite.config.ts

import { createHtmlPlugin } from 'vite-plugin-html';

plugins: [
  // 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
  // 还可配置entry入口文件， inject自定义注入数据等
  createHtmlPlugin(),
]
```

```html
<!-- index.html -->

<title><%- VITE_APP_TITLE %></title>
```

- 其他js,ts,vue文件中可使用import.meta.env获取环境变量


### 5. CSS 预处理器

| Vite 提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖

1. 不花里胡哨的less😏

```sh
npm i less -D
```

- 组织样式文件
  1. 创建src/styles文件夹
    - index.less
    - common.less - 公共样式
    - variables.less - 自定义变量
  2. 全局引入样式
  ```
  // src/main.ts

  import '@/styles/index.less';
  ```

- 全局使用自定义变量

```ts
// vite.config.ts

css: {
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
      additionalData: `@import "${resolve(__dirname,'src/styles/index.less')}";`,
    },
  },
},
```

2. sass安装使用

```js
// npm 安装
npm install -D sass sass-loader

// yarn 安装
yarn add sass sass-loader
```

```css
<style lang="scss" scoped>
.home {
  background-color: #eee;
  height: 100vh;
}
</style>
```

### 6. Vant

[vant-ui官方文档](https://vant-ui.github.io/vant/#/zh-CN/home)

- 安装

```sh
npm i vant
# 或
yarn add vant
```

- 使用

通过unplugin-vue-components按需引入后，可以直接在.vue文件模板中使用，并自动生成components.d.ts类型声明文件，js中仍然需要手动引入组件

| van组件需要带上van前缀

| Vant中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件，需手动引入函数组件

| 在使用函数组件时，unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式

#### unplugin-vue-components

自动引入自定义组件

unplugin-vue-components 插件除了会自动引入配置了的ui组件库，还会默认引入 src/compoents 下的组件，也可通过 dirs 选项指定其他路径

| 自定义组件没有类型提示问题：在tsconfig的include中加入"./components.d.ts"即可解决

但是unplugin-vue-components会将src/compoents下所有的.vue组件都写入components.d.ts类型声明中(deep默认为true)，如果使用 globs: ['src/components/**/index.vue'] 去匹配部分组件的话，会导致该组件生成的类型为 Undefined ，需要自己实现一个 resolvers (自己实现应该能解决，虽然我没试😏)

#### 定制主题

[vant官方文档：ConfigProvider 全局配置](https://vant-ui.github.io/vant/#/zh-CN/config-provider#jie-shao)

| 基础变量: Vant 中的 CSS 变量分为 基础变量 和 组件变量。组件变量会继承基础变量，因此在修改基础变量后，会影响所有相关的组件。

| 修改变量:  由于 CSS 变量继承机制的原因，两者的修改方式有一定差异：

- 基础变量只能通过 root 选择器 修改，不能通过 ConfigProvider 组件 修改。(1)
- 组件变量可以通过 root 选择器 和 ConfigProvider 组件 修改。

但是由于样式引用顺序问题：
不管使用 'vite-plugin-style-import' 还是 'unplugin-vue-components/vite' 插件，都是按需引入组件/样式
导致引用顺序为：
基础样式 -> theme.less -> 组件样式 (最先引入基础样式是通过theme.less中 :root 可覆盖基础变量推断而来)
所以 theme.less中使用:root选择器不能覆盖组件变量

解决：

- 方案一：使用 #app 代替 :root 选择器，通过提高选择器的权重来覆盖组件变量


- 方案二：
  1. 在 vite.config.ts 中通过 'VantResolver({ importStyle: false })' 关闭自动按需引入样式
  2. 在 main.ts 中全量引入组件样式: import 'vant/lib/index.css' // 必须在 theme.less 之前
  3. 在theme.less中可以正常使用 :root 选择器覆盖基础/组件变量了

| 缺点：全量引入组件样式会导致打包后体积变大(我实测大了大概100k，非权威非标准非官方数据🙅🏻‍♂️)

但是

Vant 中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件。在使用函数组件时，unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式。

手动引入单独的样式: import 'vant/es/toast/style' 等非常麻烦
不如直接全量引入所有组件样式: import 'vant/lib/index.css'😏

综上：
如使用 'vite-plugin-style-import' 插件按需引入，则可直接采用方案一
如使用 'unplugin-vue-components/vite' 插件按需引入，则采用方案二
'unplugin-vue-components/vite' 插件虽然要全量引入样式文件导致 build 体积变大(没有大太多)，但是可自动导入组件，免去手动导入的麻烦
对包体积大小没有特殊要求的话，建议选择 'unplugin-vue-components/vite'

### 7. 移动端适配

#### 7.1 添加 meta 标签

```html
<!-- index.html -->

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
/>
```

#### 7.2 PostCSS

不管哪种方案，都免不了 PostCSS 的支持，由于 vite 已经内置 PostCSS ，所以只需要在根目录创建一个 postcss.config.js 配置文件即可。

#### 7.3 vw方案

vw方案使用 postcss-px-to-viewport 插件将 px 单位转化为 vw/vh 单位

```
npm i postcss-px-to-viewport -D

// postcss.config.cjs

module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
};
```

由于 postcss-px-to-viewport 没有提供类似 postcss-pxtorem 中 rootValue({ file }) {} 的方法，即便使用 module.exports = (param) => {} 这种方式导出postcss配置，也拿不到当前转换文件的信息，所以无法根据文件路径动态设置 viewportWidth，

有一种hack方式：通过多次 px2viewport() 处理不同文件来设置viewportWidth😎

```js
// postcss.config.cjs

const px2viewport = require('postcss-px-to-viewport');

plugins: [
  px2viewport({
    // vant
    viewportWidth: 375,
    exclude: [/^(?!.*node_modules\/vant)/],
    // include: [/node_modules\/vant/],
  }),
  px2viewport({
    // 非vant
    viewportWidth: 750,
    exclude: [/node_modules\/vant/],
  }),
],
```

第一个处理 vant 的 px2viewport 为什么不用include选项呢？

因为 postcss-px-to-viewport v1.1.1 不支持 include 配置项，v1.2.0 开始加入include，但是并没有发布到npm仓库🤦‍♂️

并且由于 postcss-px-to-viewport 不支持 postcss 8.x ，而vite内置postcss 8.x，所以使用postcss-px-to-viewport会抛出警告🤦‍♂️

改用 postcss-px-to-viewport-8-plugin 替代，既支持 include 配置项，也支持postcss 8.x

我太难了兄弟萌😭

最终完整的postcss.config代码为：

```js
// postcss.config.cjs

const autoprefixer = require('autoprefixer');
const px2viewport = require('postcss-px-to-viewport-8-plugin');

const basePx2viewport = {
  unitToConvert: 'px', // 需要转换的单位，默认为 px
  // viewportWidth: 750, // 设计稿的视口宽度
  unitPrecision: 3, // 单位转换后保留的精度（很多时候无法整除）
  propList: [
    '*',
    //  '!font-size'
  ], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
  viewportUnit: 'vw', // 指定需要转换成的视口单位，建议使用 vw
  fontViewportUnit: 'vw', // 字体使用的视口单位
  // 指定不转换为视口单位的类，可以自定义，可以无限添加，建议定义一至两个通用的类名
  // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  // 下面配置表示类名中含有'keep-px'以及'.ignore'类都不会被转换
  selectorBlackList: ['.ignore', 'keep-px'],
  minPixelValue: 1, // 设置最小的转换数值，这里小于或等于 1px 不转换为视口单位
  mediaQuery: false, // 媒体查询里的单位是否需要转换单位
  // exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
  // include: [/src/], // 如果设置了include，那将只有匹配到的文件才会被转换
};

module.exports = {
  plugins: [
    autoprefixer(),
    // vant
    px2viewport({
      ...basePx2viewport,
      viewportWidth: 375,
      exclude: [/^(?!.*node_modules\/vant)/],
      // include: [/node_modules\/vant/],
    }),
    // 非vant
    px2viewport({
      ...basePx2viewport,
      viewportWidth: 750,
      exclude: [/node_modules\/vant/],
    }),
  ],
};
```

#### 7.4 rem方案

rem方案使用 postcss-pxtorem 插件将 px 单位转化为 rem 单位，并且用 lib-flexible 设置rem基准值

尽管连 lib-flexible 自己都建议使用vw方案：

| 由于viewport单位得到众多浏览器的兼容，lib-flexible这个过渡方案已经可以放弃使用，不管是现在的版本还是以前的版本，都存有一定的问题。建议大家开始使用viewport来替代此方案。

但 vw 方案 还是有缺点的。如 vw 方案不适合大屏，因为 vw 是一个比例单位，随着屏幕尺寸变大，使用vw单位的元素、字体也越来越大。但我们肯定是希望在大屏上展示更多的内容，而不是更大的文字、图标。

由于我们的产品使用场景包括手机和平板等设备，所以必须考虑大屏的适配。我曾经尝试过使用 scale 和 zoom 的方式，将大屏上的元素按比例缩小，但是效果都不太理想。最后还是选择 rem方案，因为 rem方案 可以通过媒体查询来限制基准值(根字体)大小。

配置rem方案就简单多了😅

1. 引入 lib-flexible : npm i amfe-flexible

```js
// src/main.ts

import 'amfe-flexible';
```

2. 引入 postcss-pxtorem

```js
npm i postcss-pxtorem -D
```

```js
// postcss.config.cjs

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue({ file }) {
        return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75;
      },
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.ignore', 'keep-px'],
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
};
```

| 如果用vant官网示例 file.indexOf('vant') 来匹配文件，请确保你的项目名或文件名没有包含'vant', 建议改为 file.indexOf('node_modules/vant')

3. 创建 response.less 文件，限制根字体最大值

```less
// src/styles/response.less

// prettier-ignore 忽略prettier对 PX 的自动格式化
// !important 提高权重，使其覆盖 lib-flexible 设置的font-size

@media screen and (min-width: 768px) {
  html {
    /* prettier-ignore */
    font-size: 50PX !important;
  }
}
```


### 8. 自动导入API

介绍一个自动导入api的插件 unplugin-auto-import 😌

```sh
npm i unplugin-auto-import -D
```

```ts
// vite.config.ts

import AutoImport from 'unplugin-auto-import/vite';

plugins: [
  AutoImport({
    imports: ['vue', 'vue-router'],
    // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
    dts: 'src/auto-import.d.ts',
    // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
    // 'vue-global-api'这个插件仅仅解决vue3 hook报错
    eslintrc: {
      enabled: true,
    },
  }),
]
```

```js
// .eslintrc.cjs

extends: [
  // 解决使用自动导入api报错
  './.eslintrc-auto-import.json',
  // 单独解决使用vue api时报错
  // 'vue-global-api',
],
```

接下来就可以全局使用 vue、vue-router 相关 api，不用一个个手动导入了。哪些 api 可用请参考生成的 src/auto-import.d.ts 类型声明文件。

插一个小方法：


vue3 组合式 api 使用 ref 定义一个响应式变量，用 reactive 定义一个响应式对象，
当变量较多使用 ref 一个个定义麻烦时，可以用 reactive 定义一个 state 对象，将其他变量收入 state 中，既方便管理，又省略了使用 ref 变量时的 .value 😌

```ts
const state = reactive({
  num: 1,
  bool: true,
  user: {
    name: '张三',
    nick: '法外狂徒'
  }
})
```

### 9. vue-router

[Vue-router官网](https://router.vuejs.org/zh/)

1. 安装

```sh
npm i vue-router@4
```

2. 创建路由

```ts
// src/router/index.ts

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'app',
    meta: {
      title: 'app',
    },
    component: () => import('@/App.vue'),
  },
  // 替代vue2中的'*'通配符路径
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  routes,
});
export default router;
```

3. 挂载路由

```ts
// src/main.ts

import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store';

const app = createApp(App);
app.use(store);
app.mount('#app');
```

4. 使用

router-view 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

```html
<template>
  <router-view />
</template>
```

### 10. layout布局

可以创建一个 layout 基础布局页面，将公共部分如页首、页脚都包裹进来，需要 layout 的页面则作为这个 layout 的子路由。

1. 创建 src/layout 文件夹

```html
<!-- src/layout/index.vue -->

<template>
  <div class="layout">
    <Header />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from './Header/index.vue';
</script>
```

2. 修改路由

```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/index',
    children: [
      // 需要layout的页面
      {
        path: 'index',
        name: 'index',
        meta: {
          title: 'index',
        },
        component: () => import('@/pages/index.vue'),
      },
    ],
  },
  // 不需要layout的页面
  // 替代vue2中的'*'通配符路径
  { path: '/:pathMatch(.*)*', redirect: '/' },
];
```

### 11. Pinia 

[Pina官方文档](https://pinia.vuejs.org/)

[Pina非官方中文文档](https://pinia.web3doc.top/)

Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法。最终，我们意识到 Pinia 已经实现了我们在 Vuex 5 中想要的大部分内容，并决定实现它 取而代之的是新的建议。

与 Vuex 相比，Pinia 提供了一个更简单的 API，具有更少的规范，提供了 Composition-API 风格的 API，最重要的是，在与 TypeScript 一起使用时具有可靠的类型推断支持。

Pinia API 与 Vuex ≤4 有很大不同，即：

1. mutations 不再存在。他们经常被认为是 非常 冗长。他们最初带来了 devtools 集成，但这不再是问题。

2. 无需创建自定义复杂包装器来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能利用 TS 类型推断。

3. 不再需要注入、导入函数、调用函数、享受自动完成功能！

4. 无需动态添加 Store，默认情况下它们都是动态的，您甚至都不会注意到。请注意，您仍然可以随时手动使用 Store 进行注册，但因为它是自动的，您无需担心。

5. 不再有 modules 的嵌套结构。您仍然可以通过在另一个 Store 中导入和 使用 来隐式嵌套 Store，但 Pinia 通过设计提供平面结构，同时仍然支持 Store 之间的交叉组合方式。 您甚至可以拥有 Store 的循环依赖关系。

6. 没有 命名空间模块。鉴于 Store 的扁平架构，“命名空间” Store 是其定义方式所固有的，您可以说所有 Store 都是命名空间的。

- 安装

```sh
npm i pinia 或 yarn add pinia
```

- 创建store

```ts
// src/store/index.ts

import { createPinia } from 'pinia';

const pinia = createPinia();

export default pinia;
```

- 挂载store

```ts
// src/main.ts

import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store';

const app = createApp(App);
app.use(store);
app.mount('#app');
```

- 创建useUserStore

```ts
// src/store/modules/user/index.ts

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  // id: 'user', // id必填，且需要唯一。两种写法
  state: () => {
    return {
      name: '张三',
    };
  },
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    },
  },
});
```

- 使用useUserStore

```html
<!-- src/pages/pinia/index.vue -->

<template>
  <div class="pinia">
    <div class="name">用户名:{{ userStore.name }}</div>
    <div class="length">长度:{{ userStore.nameLength }}</div>
    <van-button type="primary" @click="updateName(true)">action修改store中的name</van-button>
    <van-button @click="updateName(false)">patch修改store中的name</van-button>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store';

  const userStore = useUserStore();

  const updateName = (isAction: boolean) => {
    if (isAction) {
      // action 修改 store 中的数据
      userStore.updateName('userStore.updateName方式');
    } else {
      // 未定义 action 时可以用 $patch 方法直接更改状态属性
      // $patch 修改 store 中的数据
      userStore.$patch({
        name: 'userStore.$patch方式',
      });
    }
  };
</script>
```

### 12. Axios

[Axios官方文档](https://axios-http.com/zh/)

1. 安装

```sh
npm i axios
```

2. 新建 src/utils/http 文件夹

```ts
// 封装axios
// src/utils/http/axios.ts

import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import type { Response } from './types';
// import { auth } from '@/utils';
import { Toast } from 'vant';
import router from '@/router';

axios.defaults.timeout = 1000 * 60;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 创建axios实例
const service = axios.create({
  // 根据不同env设置不同的baseURL
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

// axios实例拦截请求
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      // ...auth.headers(), // 你的自定义headers，如token等
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// axios实例拦截响应
service.interceptors.response.use(
  // 2xx时触发
  (response: AxiosResponse<Response>) => {
    // response.data就是后端返回的数据，结构根据你们的约定来定义
    const { code, message } = response.data;
    let errMessage = '';
    switch (code) {
      case 0:
        break;
      case 1: // token过期
        errMessage = 'Token expired';
        router.push('/login');
        break;
      case 2: // 无权限
        errMessage = 'No permission';
        break;
      default:
        errMessage = message;
        break;
    }
    if (errMessage) Toast.fail(errMessage);
    return response;
  },
  // 非2xx时触发
  (error: AxiosError) => {
    Toast.fail('Network Error...');
    return Promise.reject(error);
  }
);

export type { AxiosResponse, AxiosRequestConfig };

export default service;
```

```ts
// src/utils/http/types.ts

// 和后端约定好接口返回的数据结构
export interface Response<T = any> {
  code: number | string;
  message: string;
  result: T;
}
```

- 封装请求方法

```ts
// src/utils/http/index.ts

import service, { AxiosRequestConfig } from './axios';
export * from './types';

export const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    service
      .request(config)
      .then((res) => {
        // 一些业务处理
        resolve(res.data);
      })
      .catch((err) => {
        console.log('request fail:', err);
      });
  });
};

const http = {
  get<T = any>(url: string, params = {}, config?: AxiosRequestConfig): Promise<T> {
    return request({ url, params, ...config, method: 'GET' });
  },
  post<T = any>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
    return request({ url, data, ...config, method: 'POST' });
  },
  put<T = any>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
    return request({ url, data, ...config, method: 'PUT' });
  },
  delete<T = any>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
    return request({ url, data, ...config, method: 'DELETE' });
  },
  // 上传文件，指定 'Content-Type': 'multipart/form-data'
  upload<T = any>(url: string, data = {}, config?: AxiosRequestConfig): Promise<T> {
    return request({
      url,
      data,
      ...config,
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default http;
```

封装axios的方式多种多样，根据自己喜欢的方式实现就好，还可以根据需求增加重试或者取消请求等方法😌

3. 创建api文件夹

```ts
// src/api/user/index.ts

import http, { Response } from '@/utils/http';

export interface LoginParams {
  username: string;
  password: string;
}

interface UserInfo {
  id: number;
  username: string;
  mobile: number;
  email: string;
}

export default {
  async login(params: LoginParams) {
    return await http.post<Response<UserInfo>>('/user/login', params);
  },
};
```

4. 调用api

```ts
import Api from '@/api/user';

const login = async () => {
    const { code, result, message } = await Api.login(loginInfo);
    // do something
};
```

### 13. 移动端调试

[Vconsole](https://github.com/Tencent/vConsole)

| 一个轻量、可拓展、针对手机网页的前端开发者调试面板。
| vConsole 是框架无关的，可以在 Vue、React 或其他任何框架中使用。
| 现在 vConsole 是微信小程序的官方调试工具。

在vite中，我们需要配合 vite-plugin-vconsole 插件来使用

[vite-plugin-vconsole](https://github.com/vadxq/vite-plugin-vconsole)

| 一个适用于Vite的插件，帮助开发者在各个环境下方便使用VConsole的功能。可以方便配置区分环境，根据环境动态加载VConsole，支持多页面配置。

1. 安装

```sh
npm i vconsole 
npm i vite-plugin-vconsole -D
```

2. 配置

```ts
// vite.config.ts

plugin: [
  viteVConsole({
    entry: pathResolve('src/main.ts'),
    localEnabled: true,
    enabled: env.VITE_BUILD_VCONSOLE === 'true',
    config: {
      maxLogNumber: 1000,
      theme: 'dark',
    },
  }),
]
```

3. 添加隐藏开关

虽然通过 env.VITE_BUILD_VCONSOLE 可以根据环境变量是开启 vconsole ，但是有时候只让某个环境的部分人能使用，这个时候，可以添加一个隐藏开关，默认不显示 vconsole ，只有手动打开隐藏开关才显示。

```lua
思路：
    1. env.VITE_BUILD_VCONSOLE 设置为true，开启 vconsole 功能
    2. 通过 css 默认隐藏 vconsole
    3. 在登录页url中添加一个参数 'debug'，登录时如果检测到 debug === 1，则不隐藏 vconsole
```

  - 3.1 提供一个debug工具方法
  ```ts
  // src/utils/debug.ts

  import { storage } from './storage';

  // MODE，即env[MODE]文件的环境名称(应用运行的模式)
  const { MODE, VITE_BUILD_VCONSOLE } = import.meta.env;

  // 传入debug参数，将debug存入/移除localStorage
  const config = (debug: any) => {
    if (debug === '1') {
      storage.setItem('debug', debug);
    } else {
      storage.removeItem('debug');
    }
    init();
  };

  // 初始化 vconsole，控制隐藏/显示
  const init = () => {
    const vc = <HTMLElement>document.querySelector('#__vconsole');
    const debug = storage.getItem('debug');
    if (VITE_BUILD_VCONSOLE === 'true' && MODE === 'test' && vc) {
      vc.style.display = debug === '1' ? '' : 'none';
    }
  };

  export default { init, config };
  ```

  - 3.2 在登录页获取参数
  ```ts
  // src/pages/login/index.vue

  import debug from '@/utils/debug';

  const router = useRouter();

  // 进入登录页时获取debug参数
  onMounted(() => {
    debug.config(route.query.debug);
  });
  ```

  - 3.3 在app.vue中初始化
  ```js
  // src/App.vue

  import debug from '@/utils/debug';

  // 因为debug是存入localStorage中的，刷新页面会从localStorage取出，根据debug控制是否隐藏
  onMounted(() => {
    debug.init();
  });
  ```

  - 3.4 使用: 登录时在url中添加参数 debug=1 即可开启
  ```
  http://localhost:5173/#/login?debug=1
  ```

  - 该隐藏开关只能在 login 页手动开启，debug 的值存储在 localStorage 中确保刷新页面不会丢失，回到 login 页 debug 被清除，需重新添加 debug=1 参数才能开启

### 14. Hooks

- Hooks 不是全新的技术，它是一种开发思想

- vue中一般称为 组合式API

- 可以把 hooks 理解为 vue2 中 mixin 的升级版

- 一个比较优秀的库：[VueUse](https://vueuse.org/)

- vant中也有一些常用的hooks [vant: 组合式API](https://vant-ui.github.io/vant/#/zh-CN/vant-use-intro)

自定义hooks

下面以自定义一个 loading hooks 示例：

```ts
// src/hooks/useLoading.ts

import { Toast } from 'vant';

export function useLoading() {
  let toast: any = null;

  const startLoading = () => {
    toast = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: 'Loading...',
    });
  };
  const stopLoading = () => {
    toast && toast.clear();
  };

  onBeforeUnmount(stopLoading);

  return { startLoading, stopLoading };
}
```

使用

```ts
import { useLoading } from '@/hooks';

const { startLoading, stopLoading } = useLoading();

const onSubmit = async () => {
  startLoading();
  const { code, result, message } = await Api.login(loginInfo);
  stopLoading();
  // do something
};
```

### 15. 配置路由 transition

APP.vue

```html
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```



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

### 安装 Gitmoji 

1. 安装 Gitmoji 工具： 你可以通过 npm 全局安装 gitmoji-cli 工具，命令如下：
```
npm i -g gitmoji-cli
```

2. 使用 gitmoji -c 命令生成符合规范的提交信息：
在提交代码之前，可以使用 gitmoji -c 命令来生成符合规范的提交信息模板，然后根据需要填写详细信息。

3. 提交代码：
填写完整的提交信息后，使用 git add 和 git commit 命令将代码提交到 Git 仓库中。


## 增加 jest 单元测试

1. 安装依赖

```shell
# 基本依赖
yarn add jest vue3-jest babel-jest @vue/test-utils -D
# 支持typescript
yarn add @types/jest ts-jest  -D
```

2. 配置tsconfig.json文件

```js
{
  "compilerOptions": {
    "types": ["vite/client", "jest"],
  },
  "include": ["src/**/*.ts", "tests/**/*.*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

3. 根目录新增jest.config.js文件 jest.config.js

```js
module.exports = {
  preset: 'ts-jest',
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}
```

4. 新增单元测试文件 tests/units/MusicCard.spec.ts

```js
import { shallowMount } from '@vue/test-utils'
import MusicCard from '@/components/MusicCard.vue'
const data = {
  name: '放空',
  url: 'http://music.163.com/song/media/outer/url?id=1841002409',
  picurl: 'http://p3.music.126.net/ocVnhvD-nXHKEM3TvBUZsw==/109951165931493179.jpg',
  artistsname: '大籽'
}
// 音频播放器组件描述作用域
describe('music play test', () => {
  // 断言 挂载组件，并传入props data
  it('renders data title', () => {
    const wrapper = shallowMount(MusicCard, {
      props: { data }
    })
    // 期望 title标题渲染成功
    expect(wrapper.get('.title').text()).toContain('放空')
  })

  test('renders data author', () => {
    const wrapper = shallowMount(MusicCard, {
      props: { data }
    })
    // 期望 author标题渲染成功
    expect(wrapper.get('.author').text()).toEqual('大籽')
  })

  test('render to click poster', () => {
    const wrapper = shallowMount(MusicCard, {
      props: { data }
    })
    wrapper.get('.player').trigger('click')
    // 期望 点击播放后，playing为true
    expect((wrapper.vm as any).playing).toBe(true)
  })
})
```

5. 配置单元测试启动脚本

package.json

```json
"scripts": {
  + "test": "jest --config ./jest.conf.js --coverage"
}
```

6. 执行单元测试命令

```shell
yarn test
```

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

## 已解决问题

1. [项目启动报错：postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide](https://www.npmjs.com/package/postcss-px-to-viewport-8-plugin?activeTab=readme)

- 问题：使用 postcss-px-to-viewport 控制台报以下代码

```shell
postcss-px-to-viewport: postcss.plugin was deprecated. Migration guide: https://evilmartians.com/chronicles/postcss-8-plugin-migration
```

- 解决: postcss-px-to-viewport 替换 postcss-px-to-viewport-8-plugin

注意对应库版本

```shell
"postcss": "^8.3.8", // 8.0.0版本都不会转单位
"postcss-loader": "^6.1.1",
```

- 安装
```
npm install postcss-px-to-viewport-8-plugin -D
or
yarn add postcss-px-to-viewport-8-plugin -D
```
