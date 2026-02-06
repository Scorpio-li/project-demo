<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-06-04 15:32:09
 * @LastEditTime: 2024-09-13 15:18:14
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import locale from "element-plus/es/locale/lang/zh-cn";
// const locale = zhCn;
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <!-- 使用 router-view 组件，路由匹配到组件会通过 router-view 组件进行渲染 -->
  <!-- Element Plus 默认的是英文，如果我们要使用中文主题，就可以在 APP.vue 中设置 -->
  <el-config-provider :locale="locale">
    <!-- <router-view></router-view> -->
    <!-- 全页面刷新 -->
    <router-view v-if="isRouterAlive" />
  </el-config-provider>
</template>

<script lang="ts">
import {  initVersionCheck } from '@/utils/checkVersions'
// import { computed, onMounted, ref } from 'vue';

export default {
  name: 'App',
  provide() { // 父组件中返回要传给下级的数据
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
    initVersionCheck()
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
