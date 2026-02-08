import axiosInstance, { AxiosResponseProps } from '@/utils/request'

export const getList = (params: any) => {
	return axiosInstance.get("/common/code/logisticsInfo/getOrderByPhone", { params: params || {} });
}

// 获取随机音乐信息
export const fetchRandMusic = () => {
	return axiosInstance.get("https://api.uomg.com/api/rand.music?format=json")
  }