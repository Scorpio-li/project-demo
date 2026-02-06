/*
 * @Description: 
 * @Author: Lizhiliang
 * @Date: 2024-07-08 17:39:17
 * @LastEditTime: 2024-07-08 18:17:05
 * @LastEditors: lizhiliang
 * @Usage: 
 */
import { showLoadingToast, closeToast } from 'vant';

export function useLoading() {
  let toast: any = null;

  const startLoading = () => {
    toast = showLoadingToast({
      duration: 0,
      forbidClick: true,
      message: 'Loading...',
    });
  };
  const stopLoading = () => {
    toast && closeToast();
  };

  onBeforeUnmount(stopLoading);

  return { startLoading, stopLoading };
}