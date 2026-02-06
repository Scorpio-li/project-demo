/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-05-18 21:28:07
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-06-19 18:48:45
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-pc/src/utils/index.ts
 */
import { AxiosResponse } from "axios";
// import { Message } from "element-plus";
// import vm from "../main";

/**
 *   跳转登录
 */
export const jumpLogin = () => {
    // vm.$Cookies.remove("vue_admin_token");
    // vm.$router.push(`/login?redirect=${encodeURIComponent(vm.$route.fullPath)}`);
  };
  
  /**
   * 下载文件
   * @param response
   * @returns
   */
  export const downloadFile = (response: AxiosResponse) => {
    console.log("response.data.type:", response.data.type);
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        try {
          console.log("result:", this.result);
          const jsonData = JSON.parse((this as any).result); // 成功 说明是普通对象数据
          if (jsonData?.code !== 200) {
            // Message.error(jsonData?.message ?? "请求失败");
            reject(jsonData);
          }
        } catch (err) {
          // 解析成对象失败，说明是正常的文件流
          const blob = new Blob([response.data]);
          // 本地保存文件
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          const filename = response?.headers?.["content-disposition"]
            ?.split("filename*=")?.[1]
            ?.substr(7);
          link.setAttribute("download", decodeURI(filename));
          document.body.appendChild(link);
          link.click();
          resolve(response.data);
        }
      };
      fileReader.readAsText(response.data);
    });
  };

// 深拷贝
export function deepClone(target: any): any {
  // 定义一个变量
  let result: any
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (let i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}