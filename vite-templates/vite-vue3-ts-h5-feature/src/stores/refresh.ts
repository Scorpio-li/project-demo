/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-12 17:29:25
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-13 16:24:43
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/stores/refresh.ts
 */
import { defineStore } from 'pinia'

export const refreshStore = defineStore('refresh', {
  state: () => {
    return { refreshNum: 0 }
  },
  getters: {
    queryRefresh(): number {
      return this.refreshNum
    }
  },
  actions: {
    upRefresh(st: number) {
      this.refreshNum = st
    }
  }
})

// 第二种创建store模式

// import { ref, computed } from "vue"
// import { defineStore } from "pinia"
 
// // 对外部暴露一个 use 方法，该方法会导出我们定义的 state
// const useMainStore = defineStore('main', function () {
//   const countPinia = ref(0)
//   const double = computed(() => countPinia.value * 2)
//   function increment() {
//     countPinia.value++
//   }
//   return {
//    countPinia, double, increment
//   }
// })
 
// export default useMainStore

