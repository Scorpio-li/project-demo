/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-13 16:22:44
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-13 16:29:26
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/stores/index.ts
 */
import { createPinia } from 'pinia'
import type { App } from "vue"
import piniaPluginPersist from 'pinia-plugin-persist'
export function setupStore(app: App<Element>) {
    const pinia = createPinia();
    pinia.use(piniaPluginPersist);
    app.use(pinia);
}
