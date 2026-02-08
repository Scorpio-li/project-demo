import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { setupStore } from "@/stores/index"
import Directives from '@/directives'
import Vconsole from 'vconsole'
// 引入全局样式
import '@/style/index.scss'

// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant'

//全局组件
import components from './plugins/components'

if (import.meta.env.DEV) {
    const vConsole = new Vconsole()
}
  
const app = createApp(App)
setupStore(app)
app.use(router)
app.use(vantPlugins)
app.use(components)
app.use(Directives)
app.mount('#app')
