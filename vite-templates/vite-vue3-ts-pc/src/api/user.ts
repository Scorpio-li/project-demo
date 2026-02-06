import request from '@/utils/http/axios'

export function login(data: {}) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function fetchUserList(data: {}) {
  return request({
    url: '/user/getUserList',
    method: 'get',
    data
  })
}
