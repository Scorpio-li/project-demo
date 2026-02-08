<script lang="ts">
export default {
  name: 'PiniaStore'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { refreshStore } from '@/stores/refresh'
import { useAppStore } from '@/stores/app'

// 接收状态值
const refresher = refreshStore()
const appStore = useAppStore()

const clickRefresh = () => {
  // 更新状态值：
  // 方式一：直接进行修改
  // refresher.refreshNum++
  // 方式二：$path 批量更新（path是有性能的优化）
  refresher.$patch({ refreshNum: refresher.refreshNum + 1 })
  // 方式三：$patch 使用一个函数
  // refresher.$patch(state => state.refreshNum++)
  // 方式四：封装到action
  // 可以通过调用store 上的方法将状态重置为其初始值$reset()：refresher.$reset()
}

const clickEdit = () => {
  appStore.changeName()
}
</script>

<template>
  <p>{{ refresher.refreshNum }}</p>
  <button @click="clickRefresh">Refresh</button>

  <button @click="clickEdit">修改数据</button>
  <hr />
  <div>{{ appStore.name }}</div>
</template>
