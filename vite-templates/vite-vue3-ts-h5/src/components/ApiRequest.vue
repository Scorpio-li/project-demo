<!--
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-21 18:33:17
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-24 15:10:48
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/components/ApiRequest.vue
-->
<script lang="ts">
export default {
  name: 'ApiRequest'
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
// 请求接口
import { getList } from '@/api/index'
let apiResult = ref('')
const params = { user: 'talktao' }
getList(params)
  .then((res) => {
    console.log(res)
    apiResult.value = '请求结果'
  })
  .catch((err) => {
    console.log('err', err)
    apiResult.value = '错误结果'
  })
</script>
<template>
  <div>
    <p>{{ apiResult }}</p>
    <!-- <button>接口请求</button> -->
  </div>
</template>
