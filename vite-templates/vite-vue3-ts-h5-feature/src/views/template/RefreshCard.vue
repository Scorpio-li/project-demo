<!--
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-13 17:35:21
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-13 18:19:23
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/views/template/RefreshCard.vue
-->
<!--
  add by xx
  刷新按钮组件
-->
<script setup lang="ts">
import { ref } from 'vue'
import { refreshStore } from '@/stores/refresh'
const refresher = refreshStore()
const rolling = ref(false)

// 点击刷新按钮
const clickRefresh = () => {
  if (makeRound()) {
    // 仅仅为了演示使用pinia，才使用此种方法去触发父组件刷新的
    refresher.$patch({ refreshNum: refresher.refreshNum + 1 })
  }
}

// 控制动画
const makeRound = (): boolean => {
  if (!rolling.value) {
    rolling.value = true
    setTimeout(() => (rolling.value = false), 3000)
    return true
  }
  return false
}
</script>

<template>
  <div class="refresh-card">
    <div class="icon" :class="{ active: rolling }" @click="clickRefresh"></div>
  </div>
</template>

<style scoped lang="less">
.refresh-card {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 200px;
  .icon {
    width: 100px;
    height: 100px;
    background: url('@/images/refresh.png') no-repeat;
    background-size: contain;
  }
  .active {
    animation: refresh-rotate 3s ease-out;
  }
}
@keyframes refresh-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(720deg);
  }
}
</style>
