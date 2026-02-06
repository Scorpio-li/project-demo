/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-14 18:16:36
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-14 18:16:37
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/mock/index.ts
 */
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/getList',
    method: 'get',
    response: () => {
      return {
          code: 0,
          message: 'ok',
          data: ['aa', 'bb']
      }
    }
  },
  {
    url: "/api/getUsers",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "ok",
        data: ["tom", "jerry"],
      };
    },
  }
] as MockMethod[]
