import request from '@/utils/request'

export function saveProductCategory(data) {
    return request({
      url: '/product/category/save',
      method: 'post',
      data:data
    })
}

export function getProductCategory(query) {
    return request({
      url: '/product/category/list',
      method: 'get',
      params:query
    })
}