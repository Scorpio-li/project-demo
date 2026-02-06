<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2025-01-26 15:15:55
 * @LastEditTime: 2025-01-26 17:04:11
 * @LastEditors: lizhiliang
 * @Usage: 
-->
# Vue 3 + TypeScript + Vite

移动端 h5 项目模板

## 项目依赖


## 项目创建

### 1. Vite 创建项目

交互式：
```
$ npm create vite@latest
Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) y
✔ Project name: … vue3-vant-mobile
✔ Select a framework: › vue
✔ Select a variant: › vue-ts
```

一步到胃式：
```
# npm 7+, extra double-dash is needed:
npm create vite@latest vue3-vant-mobile -- --template vue-ts
```

| 注意：
| Vite2 需要 Node.js 版本 >= 12.0.0；Vite3 需要 Node.js 版本 14.18+，16+。

使用 npm create vite@latest 创建的项目(vite@3.0.x)会在 package.json 中加入 "type": "module" ，而我当初创建项目时使用的vite@2.9.5是没有添加 type 字段的

type字段用于定义package.json文件和该文件所在目录根目录中 .js 文件和 无拓展名 文件的模块化处理规范。值为 module 则采用ESModule规范；值为 commonjs 或 省略 则采用commonjs规范

不论package.json中的type字段为何值，.mjs 的文件都按照es模块来处理，.cjs 的文件都按照commonjs模块来处理
所以需要注意，根目录下的 .js 配置文件一般都是commonjs模块，需要命名为 .cjs。如：下面会讲到的eslintrc如果是通过'npx eslint --init'自动生成的，那么其后缀自动为 .cjs，prettierrc 和 postcss.config是手动创建的，那么就需要命名为 .cjs

或者你也可以直接去掉package.json中的"type": "module"项，依旧使用 .js 😏

● 补充一点🤏🤏小知识

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

```
# 自动生成配置文件并安装下面四个依赖
npx eslint --init

# 或者手动创建文件
# npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue -D
```

```
$ npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
√ How would you like to use ESLint? · problems    
√ What type of modules does your project use? · esm
√ Which framework does your project use? · vue
√ Does your project use TypeScript? · typescript
√ Where does your code run? · browser, node
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-vue
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · pnpm
```

- 小知识

| @typescript-eslint/parser: ESLint 默认使用的是 Espree 进行语法解析，所以无法对部分 typescript 语法进行解析，需要替换掉默认的解析器

| @typescript-eslint/eslint-plugin: 作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则

| eslint-plugin-vue: 让 eslint 识别 vue 文件

- 注意事项

| 需要给vue自动生成的env.d.ts文件添加eslint忽略注释 :
```
// src/env.d.ts

// eslint-disable-next-line @typescript-eslint/ no-explicit-any, @typescript-eslint/ban-types
const component: DefineComponent<{}, {}, any>;
```

#### 2.2 prettier

下载对应模块

```
pnpm add prettier eslint-config-prettier eslint-plugin-prettier -D
```

- 创建prettier文件

```
// prettier.cjs

module.exports = {
    printWidth: 100, //一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 2, //一个tab代表几个空格数，默认为80
    useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
    singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
    semi: false, //行位是否使用分号，默认为true
    trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
    bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    jsxSingleQuote: true, // jsx语法中使用单引号
    // arrowParens: 'always',
    endOfLine: 'auto',
    'prettier.spaceBeforeFunctionParen': true,
    // htmlWhitespaceSensitivity: 'strict',
    // vueIndentScriptAndStyle: true,
}
```

- 配置eslintrc

```
// eslintrc.cjs

module.exports = {
    root: true, // 停止向上查找父级目录中的配置文件
    env: {
      // browser: true,
      // es2021: true,
      node: true
    },
    parser: 'vue-eslint-parser', // 指定要使用的解析器
    // 给解析器传入一些其他的配置参数
    parserOptions: {
      parser: '@typescript-eslint/parser', // Specifies the ESLint parser
      ecmaVersion: 'latest', // 支持的es版本
      sourceType: 'module', // 模块类型，默认为script，我们设置为module
      ecmaFeatures: {
        jsx: true
      }
    },
    extends: [
      // 'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier', // eslint-config-prettier 的缩写
      'plugin:prettier/recommended',
      // 解决使用自动导入api报错
      './.eslintrc-auto-import.json'
      // 单独解决使用vue api时报错
      // 'vue-global-api',
    ],
    plugins: ['vue', '@typescript-eslint', 'prettier'], // eslint-plugin- 可以省略
    rules: {
      // 'vue/multi-word-component-names': 'off',
      // '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'space-before-function-paren': 0,
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-explicit-any': ['off'], // 关闭any类型的警告
      'vue/multi-word-component-names': 'off' // 添加组件命名忽略规则
      /**
       *     // 根据组件名进行忽略
      "vue/multi-word-component-names": ["error",{
         "ignores": ["Home","User"]  //在这个数组中加入需要忽略的组件名
      }]
       */
    }
  }
```

- 添加lint命令

```
// package.json

// 可以运行`npm run lint`检查代码
"lint": "eslint --ext .js,.vue,.ts src --fix"
```

#### 2.3 保存文件自动格式化

```
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


### 3. 配置 tsconfig

```
{
  "compilerOptions": {
    "allowJs": true, 
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "esModuleInterop": true,                  /* 创建命名空间导入 */
    "allowSyntheticDefaultImports": true,     /* 允许从没有默认导出的模块中默认导入 */

    /* Bundler mode */
    "moduleResolution": "node",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "./src/auto-imports.d.ts" // 和 AutoImport dts保持一致 引入即可
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 配置环境变量

| vite官方文档: [环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode)

1. 根目录创建.env.[mode]文件

```
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

```
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

```
// tsconfig.node.json

{
  // 只有同时加入 "src/vite-env.d.ts" 才能使vite.config.ts中能使用src/vite-env.d.ts中的全局类型
  "include": ["vite.config.ts", "src/vite-env.d.ts"]
}
```

4. 定义process.env

- 未添加@types/node类型定义的请先添加：

```
npm i @types/node -D
```

