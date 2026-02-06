<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-10 17:11:31
 * @LastEditTime: 2024-07-17 13:59:28
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
  <section class="container">
    <!-- 测试自定义指令 -->
    <div  v-watermark></div>
    <!-- 测试自定义指令参数设置 -->
    <div
        v-watermark="{
          txt: 'mocha vue3 system',
          style: {
            font: '10px gothic',
            color: 'rgba(255,80,0,0.5)'
          }
        }"
      ></div>
  </section>
</template>


<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  div {
    width: 100%;
    height: 100%;
  }
}
</style>