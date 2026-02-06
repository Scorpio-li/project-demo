<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-10 17:00:52
 * @LastEditTime: 2024-07-16 11:02:56
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
    <el-aside width="200px">
      <el-menu
        class="shadow bg-white/75 dark:bg-black/75 backdrop-blur-sm"
        :class="sidebar.collapse"
        :collapse="sidebar.collapse"
        router
      >
        <SidebarItem :item="item" v-for="item in items" :key="item.name" />
      </el-menu>
    </el-aside>
  </template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router'
// import router from '../../../router'
import { useSidebarStore } from '@/store/sidebar'
import { useUserStore } from '@/store/user'
import SidebarItem from './SidebarItem.vue'

const sidebar = useSidebarStore()
const useUser = useUserStore()

let items = <RouteRecordRaw[]>[]

// if (import.meta.env.VITE_PERMISSION_MODE === 'CONSTANT') {
//   items = router.options.routes.filter((r) => !r.hidden)
// } else {
//   items = useUser.menuRoutes
// }
console.log('菜单')
items = items.sort(
  (a: any, b: any) => (a?.meta?.order || 0) - (b?.meta?.order || 0)
)
</script>
