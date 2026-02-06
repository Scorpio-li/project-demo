/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-14 17:53:38
 * @email: lzl102872@163.com
 * @LastEditors: lizhiliang
 * @LastEditTime: 2024-07-16 16:47:13
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store' // 引入vuex
import pinia from './store/pinia' // 引入Pinia

import ElementPlus from "./plugins/elementPlus"
// import {mdDecrypt} from "./utils/filters"
import Directives from './directives'

import './styles/font.scss' // 引入字体样式

// 引入数据埋点
import pvuv from './utils/PVUV'

import 'virtual:windi.css'

const app = createApp(App)

// 全局过滤器
// app.config.globalProperties.$filters = {
//     decrypt(value: any) {
//       return mdDecrypt(value)
//   }
// }
// 全局数据埋点
app.config.globalProperties.$pvuv = pvuv
console.log('router', router)

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(Directives)
app.mount("#app")
