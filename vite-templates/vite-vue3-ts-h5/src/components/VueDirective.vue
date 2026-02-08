<!--
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-13 17:35:28
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-24 15:23:42
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/components/VueDirective.vue
-->
<template>
  <h3>自定义指令模块</h3>
  <!-- 全局指令 -->
  <van-button v-copy="`湿哒哒沙雕`" type="primary">拷贝按钮</van-button>
  <!-- 局部指令 -->
  <input v-focus type="text" value="测试局部自定义指令" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'VueDirective',
  components: {},
  directives: {
    focus: {
      mounted(el, bindings, vnode, preVnode) {
        console.log('focus mounted', bindings)
        el.focus()
      }
    }
  },
  setup: () => {
    onMounted(() => {
      console.log('第一次加载')
    })
    return {}
  },
  computed: {}
})
</script>
