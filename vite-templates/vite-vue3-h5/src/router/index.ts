/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-02-06 15:00:28
 * @LastEditTime: 2026-02-10 16:58:34
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "404",
      keepAlive: true,
    },
  },
  // 替代vue2中的'*'通配符路径
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

// 自动引入路由
// import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

// // 通过Vite的import.meta.glob()方法实现自动化导入路由
// const mainRouterModules = import.meta.glob('../layout/*.vue')
// const viewRouterModules = import.meta.glob('../views/**/*.vue')

// // 子路由
// const childRoutes = Object.keys(viewRouterModules).map((path)=>{
// 	const childName = path.match(/\.\.\/views\/(.*)\.vue$/)[1].split('/')[1];
// 	return {
// 		path: `/${childName?.toLowerCase()}`,
// 		name: childName,
// 		component: viewRouterModules[path]
// 	}
// })

// console.log(childRoutes,'childRouter');

// // 根路由
// const rootRoutes = Object.keys(mainRouterModules).map((path) => {
//     const name = path.match(/\.\.\/layout\/(.*)\.vue$/)[1].toLowerCase();
//     const routePath = `/${name}`;
//     if (routePath === '/index') {
// 		return {
// 			path: '/',
// 			name,
// 			redirect: '/home',
// 			component: mainRouterModules[path],
// 			children: childRoutes
// 		};
//     }
// })

// const routes: Array<RouteRecordRaw> = rootRoutes

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes,
// });

// export default router
