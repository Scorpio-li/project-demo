/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-14 18:36:26
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-14 18:41:13
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/plugins/elementPlus.ts
 */
//elementPlus.js: 整体引入

import ElementPlus from "element-plus"
// import "element-plus/lib/theme-chalk/index.css"
import 'element-plus/dist/index.css'

export default function (app: any) {
  //整体引入
  app.use(ElementPlus);
}

// import { ElButton } from "element-plus";
// import { ElInput } from "element-plus";

// import "element-plus/lib/theme-chalk/index.css";

// export default function (app) {
//   //按需引入
//   app.use(ElButton);
//   app.use(ElInput);
// }
