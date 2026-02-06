
import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      name: 'app store state: name'
    }
  },
  actions: {
    changeName() {
      this.name = '修改'
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true // 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key。
    // strategies: [ // strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage。
    //     {
    //     key: 'my_store_app',
    //     storage: localStorage,
    //     }
    // ]
  }
})