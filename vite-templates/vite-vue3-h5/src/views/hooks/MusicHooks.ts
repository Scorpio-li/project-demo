/*
 * @Author: Derick.lizhiliang
 * @Date: 2022-04-13 14:21:15
 * @email: lzl102872@163.com
 * @LastEditors: Derick.lizhiliang
 * @LastEditTime: 2022-04-13 14:58:34
 * @motto: Still water run deep
 * @Description: Modify here please
 * @FilePath: /vite-vue3-ts-h5/src/views/hooks/MusicHooks.ts
 */
/**
  add by xx
  首页hooks封装，也就是响应式代码块
 */

import { reactive, toRefs } from 'vue'
import { fetchRandMusic } from '@/api/index'
import { HomeHooksModel } from '@/model/MusicModel'

// 首页hooks模块
export const HomeHooks = () => {
  // 响应值定义
  const indexRec = reactive<HomeHooksModel>({
    loading: true,
    noData: false,
    musicData: {}
  })

  // 查询随机音乐信息
  const fetchMusicInfo = async () => {
    const { data } = await fetchRandMusic()
    console.log('data', data)
    indexRec.loading = false
    indexRec.noData = data.code !== 1
    indexRec.musicData = data.data
  }
  return { ...toRefs(indexRec), fetchMusicInfo }
}
