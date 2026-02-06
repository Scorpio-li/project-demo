<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2025-01-26 15:15:55
 * @LastEditTime: 2025-01-27 10:12:14
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
  <div id="app">
    <keep-alive :include="cachedComponents">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
  import { getCurrentInstance } from 'vue'
  const route = useRoute()
  const internal = getCurrentInstance()
  const globalProperties: any = internal?.appContext.config.globalProperties
  const appInteraction = globalProperties.$appInteraction
  console.log('appData', globalProperties, appInteraction)
  const cachedComponents = computed(() => {
    // return route.meta.someValue  // 假设 meta 中有 someValue 属性
    const components = route.matched
        .filter(route => route.meta.keepAlive)
        .map(route => route.name)
    return components;
  })
</script>

<style lang="scss">
#app {
    min-height: 100vh;
    padding-bottom: constant(safe-area-inset-bottom);  /*兼容 IOS<11.2*/
    padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
