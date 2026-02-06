/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-15 17:35:34
 * @LastEditTime: 2024-07-16 17:18:32
 * @LastEditors: lizhiliang
 * @Usage: 
 */
// import { defineStore } from "pinia"
 
// export const useUserStore = defineStore('user', {
//   // defineStore('userInfo',{})  userInfo就是这个仓库的名称name
//   state: () => ({
//     username:'赫赫',
//     age: 23,
//     like: 'girl',
//     obj:{ money:100,friend:10 }
//   }),
//   getters: {
//   },
//   persist: {
//     key: 'piniaStore', //存储名称
//     storage: sessionStorage, // 存储方式
//     paths: ['username', 'like','obj'], //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
//   },
// })
 
// export default useUserStore

import { defineStore } from 'pinia'
import { ref } from 'vue'
// 此处采用组合式API写法
// Pinia 同样支持选项式API写法
export const useUserStore = defineStore(
  'user',
  () => {
    let username = ref('')
    const editName = (val: string) => {
      username.value = val
    }
    // async function userLogin(param: UserInfo) {
    //   const result = await login({ username: param.username, password: param.password })
    //   if (result) {
    //     username.value = param.username
    //   }
    //   return result
    // }
    return { username, editName }
  },
  {
    persist: true,
    // persist: { key: 'my-custom-key', }, // 给key值改名
    // persist: { storage: sessionStorage, }, // 将数据爆粗在sessionStorage中
  }
)


