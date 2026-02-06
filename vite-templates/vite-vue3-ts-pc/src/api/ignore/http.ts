// src/api/http.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import showCodeMessage from '@/api/code';
import Router from "@/router";
import UserUtil from "@/utils/user";

const BASE_PREFIX = '/api';

// 创建实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_PREFIX,  // 前缀
  timeout: 1000 * 60 * 30,  // 超时
  headers: {
    'Content-Type': 'application/json',
  },  // 请求头
  withCredentials: true,  //跨域携带cookie
});

// service.defaults.headers.post["Content-Type"] = "application/json";
// service.defaults.headers.post["Accept"] = "application/json";

// 定义一个flag 判断是否刷新Token中
let isRefreshing = false;
// 保存需要重新发起请求的队列
let retryRequests = [];

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    // Store.commit("startLoading");
    const userInfo = UserUtil.getLocalInfo();
    if (userInfo) {
      //业务需要把Token信息放在 params 里面，一般来说都是放在 headers里面
      config.params = Object.assign(config.params ? config.params : {}, {
        appkey: userInfo.Appkey,
        token: userInfo.Token
      });
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const refreshToken = (response: any) => {
  // 拿到本次请求的配置
  let config = response.config;
  //   进入登录页面的不做刷新Token 处理
  if (Router.currentRoute?.path !== "/login") {
      if (!isRefreshing) {
        // 改变flag状态，表示正在刷新Token中
        isRefreshing = true;
        //   刷新Token
        // return Store.dispatch("user/refreshToken")
        //   .then(res => {
        //   // 设置刷新后的Token
        //     config.params.token = res.Token;
        //     config.params.appkey = res.AppKey;
        //   //   遍历执行需要重新发起请求的队列
        //     retryRequests.forEach(cb => cb(res));
        //   //   清空队列
        //     retryRequests = [];
        //     return service.request(config);
        //   })
        //   .catch(() => {
        //     retryRequests = [];
        //     Message.error("自动登录失败，请重新登录");
        //       const code = Store.state.user.info.CustomerCode || "";
        //       // 刷新Token 失败 清空缓存的用户信息 并调整到登录页面
        //       Store.dispatch("user/logout");
        //       Router.replace({
        //         path: "/login",
        //         query: { redirect: Router.currentRoute.fullPath, code: code }
        //       });
        //   })
        //   .finally(() => {
        //       // 请求完成后重置flag
        //     isRefreshing = false;
        //   });
      } else {
        // 正在刷新token，返回一个未执行resolve的promise
        // 把promise 的resolve 保存到队列的回调里面，等待刷新Token后调用
        // 原调用者会处于等待状态直到 队列重新发起请求，再把响应返回，以达到用户无感知的目的（无痛刷新）
        return new Promise(resolve => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          retryRequests.push((info: any) => {
              // 将新的Token重新赋值
            config.params.token = info.Token;
            config.params.appkey = info.AppKey;
            resolve(service.request(config));
          });
        });
      }
    }
}

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // Store.commit("finishLoading");
    
    if (response.status === 200) {
      return response;
    } else if(response.status === 401) {
      // 需要刷新Token 的状态 401
      refreshToken(response)
    }
    ElMessage.info(JSON.stringify(response.status));
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      ElMessage.error(showCodeMessage(response.status));
      return Promise.reject(response.data);
    }
    ElMessage.warning('网络连接异常,请稍后再试!');
    return Promise.reject(error);
  },
);

export default service
