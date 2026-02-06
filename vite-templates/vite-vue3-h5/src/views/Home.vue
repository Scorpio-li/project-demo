<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-05-10 11:49:22
 * @LastEditTime: 2024-07-01 16:49:01
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<script setup la
  components: { VueDirective },ng="ts">
// import VantUi from '@/components/VantUi.vue'
// import PiniaStore from '@/components/PiniaStore.vue'
// import ApiRequest from '@/components/ApiRequest.vue'

// import VueDirective from "@/components/VueDirective.vue";
const router = useRouter();

const routerPage = () => {
    console.log('跳转404页面')
    router.push('/about')
  }
</script>

<template>
    <div class="wrap">
        <VantUi />
        <PiniaStore />
        <ApiRequest />
        <vue-directive />
        <!-- 跳转至404页面 -->
        <button class="default" @click="routerPage">
          Go to 404
        </button>
        <!-- Echarts -->
        <EchartsDemo />
    </div>
</template>

<style lang="scss" scoped>

</style>