import request from '@/utils/request'


export function queryMenuList(param) {
  return request({
    url: `/auth/menu/list`,
    method: 'get',
    params: param
  })
}

export function queryRootMenu() {
  return request({
    url: `/auth/menu/query-root-menu`,
    method: 'get'
  })
}

export function saveMenu(data) {
  return request({
    url: `/auth/menu/save`,
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: `/auth/menu/update`,
    method: 'post',
    data
  })
}

export function queryAdminMenu() {
  return request({
    url: `/auth/menu/query-admin-menu-list`,
    method: 'get'
  })
}

export function removeMenu(id) {
  return request({
    url: `/auth/menu/remove`,
    method: 'post',
    params: {
      id
    }
  })
}

