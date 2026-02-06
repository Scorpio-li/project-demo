/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-10 17:08:41
 * @LastEditTime: 2024-07-10 18:28:16
 * @LastEditors: lizhiliang
 * @Usage: 
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/page',
    name: 'page',
    component: Layout,
    redirect: '/page/tabs',
    meta: {
      title: 'pages',
      icon: 'ep-brush',
      order: 3
    },

    children: [
      {
        path: 'tabs',
        name: 'tabs',
        meta: {
          title: 'tab',
          icon: 'ep-price-tag'
        },

        component: () => import(/* webpackChunkName: "tabs" */ '@/views/pageDemo/tabs.vue')
      },
      {
        path: 'card',
        name: 'card',
        meta: {
          title: 'card',
          icon: 'ep-price-tag'
        },

        component: () => import(/* webpackChunkName: "tabs" */ '@/views/pageDemo/cardSuspension.vue')
      }
    ]
  }
]

export default routes
