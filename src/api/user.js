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

export function queryAdminList(param){
  return request({
    url:`/auth/admin/list`,
    method:'get',
    params: param
  })
}

export function saveAdmin(data){
  return request({
    url:`/auth/admin/save`,
    method:'post',
    data
  })
}

export function distributionAdminRole(data){
  return request({
    url:`/auth/admin/description-role`,
    method:'post',
    data
  })
}

export function changePassword(data){
  return request({
    url:`/auth/admin/change-admin-password`,
    method:'post',
    data
  })
}

export function removeAdmin(id){
  return request({
    url:`/auth/admin/remove`,
    method:'post',
    params:{id}
  })
}

export function updateAdmin(data){
  return request({
    url: `/auth/admin/update`,
    method:'post',
    data
  })
}