<template>
  <h3>自定义指令模块</h3>
  <!-- 全局指令 -->
  <van-button v-copy="`拷贝复制指令`" type="primary">拷贝按钮</van-button>
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
      mounted(el: { focus: () => void }, bindings: any) {
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
