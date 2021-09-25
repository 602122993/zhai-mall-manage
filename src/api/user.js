import { param } from '@/utils'
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    params:data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/admin/user-info',
    method: 'get',
  })
}

export function logout(token) {
  return request({
    url: '/auth/logout',
    method: 'get',
    param :token
  })
}
