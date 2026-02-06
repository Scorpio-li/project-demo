/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-05-05 17:57:14
 * @email: lzl102872@163.com
 * @LastEditors: lizhiliang
 * @LastEditTime: 2024-08-13 10:23:11
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import NProgress from 'nprogress'

const modules: any = import.meta.glob('./modules/*.ts')

// 创建一个数组用于存储所有模块的路由配置
let routeModuleList: RouteRecordRaw[] = []

// 获取模块路由
for (const path in modules) {
  const module = await modules[path]();
  const moduleRoutes = module.default; // 这里获取默认导出
  if (moduleRoutes && Array.isArray(moduleRoutes)) {
    routeModuleList.push(...moduleRoutes);
  }
}

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'PageHome',
    redirect: '/home',
    hidden: true,
    meta: {
      title: 'home'
    }
    // component: () => import('@/views/Home.vue') // 建议进行路由懒加载，优化访问性能
  },
  {
    path: '/demo', // 示例
    name: 'demo',
    hidden: true,
    component: () => import('@/views/Demo.vue'),
    meta: {
      title: '示例'
    }
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/echarts/mapDrillDown.vue'),
    meta: {
      title: '地图下钻'
    }
  },
  {
    path: '/components/elementui', // elementUI组件二次封装
    name: 'elementui',
    hidden: true,
    component: () => import('@/views/components/ElementUI.vue'),
    meta: {
      title: 'elementUI组件二次封装'
    }
  }
]

const lastRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    hidden: true,
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "400" */ '@/views/404.vue')
  }
]

let routes = constantRoutes

// 前端固定路由模式
if (import.meta.env.VITE_PERMISSION_MODE === 'CONSTANT') {
  routes = [...routeModuleList, ...constantRoutes]
}
const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from) => {
//   if (!NProgress.isStarted()) {
//       NProgress.start();
//   }
// })

// router.afterEach((to, from) => {
//   NProgress.done();
// })
export default router;
export { constantRoutes, routeModuleList, lastRoutes }