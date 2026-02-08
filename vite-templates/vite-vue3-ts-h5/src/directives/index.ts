/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-13 17:35:28
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-24 15:35:00
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/directives/index.ts
 */

import copy from './cope'
const directives = {
  copy
}

export default {
  install(app: any) {
    Object.keys(directives).forEach((key: string) => {
      // console.log('key', key, directives[key])
      app.directive(key, directives[key])
    })
  }
}
