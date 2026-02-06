import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/home/page',
    meta: {
      title: 'dashboard',
      icon: 'ep-sunrise',
      order: 1
    },

    children: [
      {
        path: 'page',
        name: 'HomeIndex',
        meta: {
          title: '首页'
        },
        component: () => import(/* webpackChunkName: "tabs" */ '@/views/home/index.vue')

      }
    ]
  }
]

export default routes