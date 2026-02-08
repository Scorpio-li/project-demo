/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-12 16:48:19
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-12 16:53:38
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404',
      keepAlive: true
    }
  },
  // 替代vue2中的'*'通配符路径
  { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
