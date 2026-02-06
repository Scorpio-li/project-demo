import request from '@/utils/request'

// 获取随机音乐信息
export const fetchRandMusic = () => {
  return request.get(`/rand.music?sort=热歌榜&format=json`)
}
