import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/network',
    name: 'network',
    component: Layout,
    redirect: '/network/request',
    meta: {
      title: '网络相关',
      icon: 'ep-brush',
      order: 5
    },

    children: [
      {
        path: 'request',
        name: 'request',
        meta: {
          title: '请求',
          icon: 'ep-price-tag'
        },

        component: () => import(/* webpackChunkName: "tabs" */ '@/views/network/request.vue')
      }
    ]
  }
]

export default routes