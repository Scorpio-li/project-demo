/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-01 14:58:57
 * @LastEditTime: 2024-07-01 16:38:54
 * @LastEditors: lizhiliang
 * @Usage: 
 */
// i18n配置
import { createI18n } from 'vue-i18n'
// import zhCn from "./zh-cn";
// import en from "./en";

// 创建i18n
const i18n = createI18n({
  locale: localStorage.getItem("language") || "en", // 语言标识
  globalInjection: true, // 全局注入,可以直接使用$t
  // 处理报错: Uncaught (in promise) SyntaxError: Not available in legacy mode (at message-compiler.esm-bundler.js:54:19)
  legacy: false,
  allowComposition: true,
  messages: {
    en: {
        message: {
          hello: 'hello world111'
        }
      },
      ja: {
        message: {
          hello: 'こんにちは、世界111'
        }
      }
  }
})

export default i18n;
