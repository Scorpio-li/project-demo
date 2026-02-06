<!--
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-05-10 11:49:22
 * @LastEditTime: 2024-07-08 17:45:53
 * @LastEditors: lizhiliang
 * @Usage: 
-->
<template>
  <div>
    <p>{{ apiResult }}</p>
    <button @click="onSubmit">请求数据</button>
    <!-- <button>接口请求</button> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'ApiRequest'
}
</script>

<script setup lang="ts">
import { useLoading } from '@/hooks/useLoading'
// 请求接口
import { fetchRandMusic } from '@/api/service'
let apiResult = ref('')
// const params = { user: 'talktao' }
const { startLoading, stopLoading } = useLoading();


const onSubmit = async () => {
  startLoading();
  fetchRandMusic()
    .then((res: any) => {
      console.log(res)
      apiResult.value = '请求结果'
    })
    .catch((err: any) => {
      console.log('err', err)
      apiResult.value = '错误结果'
    })
    .finally(() => {
      console.log('结束')
      stopLoading();
    })
};
</script>

