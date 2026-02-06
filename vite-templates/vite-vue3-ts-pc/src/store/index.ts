/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-14 18:10:54
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-14 18:11:03
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/store/index.ts
 */
import { createStore } from 'vuex'

const defaultState = {
  count: 0
}
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state: typeof defaultState) {
      state.count++
    }
  }
})
export default store;
