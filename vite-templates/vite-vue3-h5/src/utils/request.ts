/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-05-10 11:49:22
 * @LastEditTime: 2024-07-09 16:30:56
 * @LastEditors: lizhiliang
 * @Usage: 
 */

// import store from "@/store/index";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { showFailToast } from 'vant';
export interface AxiosResponseProps {
  code?: number
  status?: number
  data?: any
  datas?: any
  msg?: string | null
}
class HttpRequest {
  private readonly baseURL: string
  private readonly withCredentials: boolean
  private readonly timeout: number
  constructor() {
    //获取当前环境的api地址
    this.baseURL = import.meta.env.VITE_APP_API_BASE_URL as string
    this.withCredentials = false
    this.timeout = 1000 * 60
  }
  //初始化get请求
  getInitConfig(): AxiosRequestConfig {
    return {
      baseURL: this.baseURL,
      withCredentials: this.withCredentials,
      timeout: this.timeout
    }
  }
  interceptors(instance: AxiosInstance) {
    const requestList: any = []
    const setLoadingToFalse = (response: any) => {
      requestList
        .filter(
          (item: any) => item.url == response.config.url && item.method == response.config.method
        )
        .forEach((item: any) => (item.isLoading = false))
      //所有请求都加载完才让加载提示消失
      // if (requestList.every(item => !item.isLoading)) store.commit("changeIsLoading", false);
    }
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // 在这里修改请求头
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (response) => {
        console.log('ersponse', response)
        setLoadingToFalse(response)
        if (response.data.code === 200) {
          return response.data
        }
        showFailToast(response.data.message || '请求失败，请稍后重试')
        return Promise.reject(response?.data)
      },
      (error) => {
        setLoadingToFalse(error)
        if (error && error.response) {
            this.errorHandle(error.response.status, error.response)
            return Promise.reject(error.response)
        } 
        showFailToast(error.response?.data.message)
        return Promise.reject(error.response?.data)
      }
    )
  }
  errorHandle(status: number, error: any) {
   // HTTP状态码判断
     switch (status) {
         case 401:
             return showFailToast(`Error Code: ${status}, Message: ${error.msg || '登录失效，请重新登录'}`)
         case 403:
             return showFailToast(`Error Code: ${status}, Message: ${error.msg || '你没有访问权限'}`)
         case 500:
             return showFailToast(`Error Code: ${status}, Message: ${error.msg || '后台错误，请联系管理员'}`)
         case 502:
             return showFailToast(`Error Code: ${status}, Message: ${error.msg || '平台环境异常'}`)
         default:
          showFailToast(`Error Code: ${status}, Message: ${error.msg || '未知错误，请刷新重试'}`)
     }
  }
  request(): AxiosInstance {
    const instance = axios.create(this.getInitConfig())
    this.interceptors(instance)
    return instance
  }
}
const http = new HttpRequest()
export default http.request()
