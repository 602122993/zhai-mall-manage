import Cookies from 'js-cookie'
import router from '@/router'

import store from '@/store'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export async function  resetMenu(){
  const menuList = await store.dispatch('user/getMenu')
      
  // generate accessible routes map based on roles
  const accessRoutes = await store.dispatch('permission/generateRoutes', menuList)
  console.log(router)
  router.addRoutes(accessRoutes)
  
}