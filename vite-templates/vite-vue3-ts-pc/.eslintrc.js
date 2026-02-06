/*
 * @Author: Derick.lizhiliang
 * @Date: 2021-12-29 21:53:58
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-01-04 11:38:38
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue-ts-element-template/.eslintrc.js
 */
//.eslintrc.js
module.exports = {
    root: true,
    env: {
      node: true,
    },
    globals: {
      require: true
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      './.eslintrc-auto-import.json',
    ],
    parserOptions: {
      parser: 'babel-eslint',
    },
    rules: {
      //在此处写规则
      'no-unused-vars': 0, // 定义未使用的变量
    },
  };
  