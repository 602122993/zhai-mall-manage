import request from '@/utils/request'

export function queryPermissionList(param){
    return request({
        url:`/auth/permission/list`,
        method:'get',
        params:param
    })
}

export function savePermission(data){
    return request({
        url:'/auth/permission/save',
        method:'post',
        data
    })
}

export function updatePermisson(data){
    return request({
        url:'/auth/permission/update',
        method:'post',
        data
    })
}
export function removePermission(id){
    return request({
        url:'/auth/permission/remove',
        method:'post',
        params:{id}
    })
}

export function queryPermissionCategoryList(){
    return request({
        url:'/auth/permission/permission-category/list',
        method:'get'
    })
}

export function savePermissionCategory(data){
    return request({
        url:`/auth/permission/permission-category/create`,
        method:'post',
        data
    })
}

export function updatePermissionCategory(data){
    return request({
        url:`/auth/permission/permission-category/update`,
        method:'post',
        data
    })
}
export function removePermissionCategory(id){
    return request({
        url:`/auth/permission/permission-category/remove`,
        method:'post',
        params:{id}
    })
}