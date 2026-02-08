/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-13 14:24:10
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-13 17:40:18
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/utils/request.ts
 */

/** 
 *  @author Lizhiliang
 * @description  接口封装
*/ 
// import store from "@/store/index";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios";
export interface AxiosResponseProps {
    code?: number;
    status?: number;
    data?: any;
    datas?: any;
    msg?: string | null;
}
class HttpRequest {
    private readonly baseURL: string;
    private readonly withCredentials: boolean;
    private readonly timeout: number;
    constructor() {
        //获取当前环境的api地址
        this.baseURL = import.meta.env.VITE_BASE_URL as string
        // 当配置了xhr.withCredentials = true时，必须在后端增加 response 头信息Access-Control-Allow-Origin，且必须指定域名，而不能指定为*
        this.withCredentials = false // 当前请求为跨域类型时是否在请求中协带cookie
        this.timeout = 1000 * 60
    }
    //初始化get请求
    getInitConfig(): AxiosRequestConfig {
        return {
            baseURL: this.baseURL,
            withCredentials: this.withCredentials,
            timeout: this.timeout,
        };
    }
    interceptors(instance: AxiosInstance) {
        let requestList: any = [];
        const setLoadingToFalse = (response: any) => {
            requestList
                .filter((item: any) => item.url == response.config.url && item.method == response.config.method)
                .forEach((item: any) => (item.isLoading = false));
            //所有请求都加载完才让加载提示消失
            // if (requestList.every(item => !item.isLoading)) store.commit("changeIsLoading", false);
        };
        instance.interceptors.request.use(
            config => {
                // 自定义全局header
                config.headers = config.headers ? config.headers : {}
                config.headers['Content-Type'] = 'application/json'
                return config
            },
            error => {
                if (error.response) {
                    const data = error.response.data
                    // Toast(data.message)
                    console.error(data.message)
                }                
                return Promise.reject(error)
            }
        )
        instance.interceptors.response.use(
            response => {
                setLoadingToFalse(response);
                return response;
            },
            error => {
                // if (error.response.status == 301) {
                //     store.commit("changeLoginModalVisible", true);
                // }
                setLoadingToFalse(error);
                return Promise.reject(error.response?.data);
            }
        );
    }
    request(): AxiosInstance {
        const instance = axios.create(this.getInitConfig());
        this.interceptors(instance);
        return instance;
    }
}
const http = new HttpRequest();
export default http.request();

