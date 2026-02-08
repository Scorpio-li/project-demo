// 传统的options API方式

// import { defineStore } from "pinia"
// export const usePiniaState = defineStore({
//     id: 'textPinia',
//     state: () => {
//         return {
//             userName: ''
//         }
//     },
//     getters: {

//     },
//     actions: {
//         upUserNmae(data: string) {
//             this.userName = data
//         }
//     }
// })

// Vue3 setup编程模式
import { ref } from 'vue'
import { defineStore } from "pinia"
export const usePiniaState = defineStore('pinia', ()=>{
    const userName = ref('')
    // 修改userName的方法
    const upUserNmae = (data: string) => {
        userName.value = data
    }
    return { userName, upUserNmae}
})

