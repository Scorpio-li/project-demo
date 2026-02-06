/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2025-01-26 16:27:25
 * @LastEditTime: 2025-01-26 16:31:17
 * @LastEditors: lizhiliang
 * @Usage: 
 */

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
  
