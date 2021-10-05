import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function queryAllRoutes(){
  return request({
    url:'auth/menu/query-all-menu',
    method: 'get'
  })
}

export function getRoles(param) {
  return request({
    url: '/auth/role/list',
    method: 'get',
    params:param
  })
}

export function addRole(data) {
  return request({
    url: '/auth/role/save',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/auth/role/update`,
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/auth/role/delete/`,
    method: 'post',
    params:{id}
  })
}

export function queryPermissionTree(){
  return request({
    url:`/auth/permission/query-all-permission-tree`,
    method:'get',
  })
}

export function queryPermissionIdByRoleId(roleId){
  return request({
    url:`/auth/permission/query-by-role-id`,
    method:'get',
    params:{roleId}
  })
}

export function saveRolePermission(data){
  return request({
    url:`/auth/role/distribution-permission`,
    method:'post',
    data
    
  })
}

export function queryMenuTree(){
  return request({
    url:`/auth/menu/query-all-menu`,
    method:'get'
  })
}

export function queryMenuIdByRoleId(roleId){
  return request({
    url:`/auth/menu/query-by-role-id`,
    method:'get',
    params:{roleId}
  })
}

export function saveRoleMenu(data){
  return request({
    url:`/auth/role/distribution-menu`,
    method:'post',
    data
  })
}
