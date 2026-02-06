<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-10 17:00:43
 * @LastEditTime: 2024-07-11 16:00:41
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
  <div class="v-header backdrop-blur-sm bg-white/75 dark:bg-black/75">
    <!-- 变化皮肤按钮 -->
    <el-switch
        v-model="darkMode"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        class="mr-2"
        @change="toggleDark()"
        style="--el-switch-on-color: #0960bd; --el-switch-off-color: #ff6600"
    />
    <!-- 全局搜索路由 -->
    <div class="flex items-center pr-4 ml-auto">
      <SiteSearch />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import SiteSearch from './SiteSearch.vue'

const isDark = useDark()
let darkMode = ref(false)
darkMode.value = isDark.value

const toggleDark = useToggle(isDark)

</script>
