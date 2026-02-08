import axiosInstance, { AxiosResponseProps } from '@/utils/request'

export const getList = (params: any) => {
  return axiosInstance.get('/common/code/logisticsInfo/getOrderByPhone', { params: params || {} })
}
