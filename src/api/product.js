import request from '@/utils/request'

export function saveProductCategory(data) {
    return request({
      url: '/product/category/save',
      method: 'post',
      data:data
    })
}

export function updateProductCategory(data){
  return request({
    url:'/product/category/update',
    method:'post',
    data
  })
}

export function removeProductCategory(id){
 return request({
    url:'/product/category/remove',
    method:'post',
    params:{id}
  })
}

export function getProductCategory(query) {
    return request({
      url: '/product/category/list',
      method: 'get',
      params:query
    })
}

export function queryParentProductCategory(){
  return request({
    url:'/product/category/parent-list',
    method:'get',
  })
}

export function queryProductCategoryById(id){
  return request({
    url:'/product/category/query-by-id',
    method:'get',
    params:{id}
  })
}

export function updateProductCategorySort(data){
  return request({
    url:'/product/category/update-product-category-sort',
    method:'post',
    data
  })
}