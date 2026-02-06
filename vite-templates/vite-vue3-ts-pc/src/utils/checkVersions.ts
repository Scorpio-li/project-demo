/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-09-13 15:13:53
 * @LastEditTime: 2024-09-20 16:05:36
 * @LastEditors: lizhiliang
 * @Usage: 
 */
/**
 * @description 检测版本更新
 * @param allowIgnore 是否允许忽略
 * @param timer 传入定时器
 * @returns 
 */
import { ElMessage, ElMessageBox } from 'element-plus'

export async function checkUpdate(allowIgnore:boolean, timer?:any) {
  //动态获取线上的资源地址，其实就是vite.config.ts的base的值
  let basePath = import.meta.env.VITE_PUBLIC_PATH
  console.log('basePath', basePath)
  try {
    // 检测前端资源是否有更新
    let response = await fetch(`${basePath}/version/versionData.json`,{
      headers: {
        'Cache-Control': 'no-cache'
      }
    }).then(res => res.json())
    console.log('response', response)
    if(!localStorage.getItem('v3_version')){
      localStorage.setItem('v3_version',response.version)
    }else{
      if(localStorage.getItem('v3_version')!==response.version){
        ElMessageBox.confirm(
          '是否立即更新？',
          '检测到新版本',
          {
            confirmButtonText: '更新',
            cancelButtonText: '忽略',
            type: 'warning',
          }
        )
          .then(() => {
            localStorage.setItem('v3_version',response.version)
            window.location.reload()
          })
          .catch(() => {
            if(timer!=null && timer!==undefined){
              clearInterval(timer)
            }
          })
      }
    }
  } catch (e) {
    return Promise.reject(e)
  }
}
/**
 * @description 初始化版本检测器
 */
export function initVersionCheck(){
  // checkUpdate(false)
  let timer = setInterval(()=>{
    checkUpdate(true,timer)
  },10000)
}
