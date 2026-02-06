import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { setupStore } from '@/stores/index'
import Directives from '@/directives'
import Vconsole from 'vconsole'
import appInteraction from '@/utils/appInteraction'
import i18n from './utils/i18n'

import 'vant/lib/index.css'
// 引入全局样式
import '@/style/index.scss'

// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant'

//全局组件
import components from './plugins/components'

if (import.meta.env.DEV) {
  new Vconsole()
}

const app = createApp(App)
// app.provide('i18n', i18n)
setupStore(app)
app.use(router)
app.use(vantPlugins)
app.use(components)
app.use(Directives)
app.use(i18n)
app.config.globalProperties.$appInteraction = appInteraction;
app.mount('#app')

