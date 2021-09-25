import router, {
  asyncRoutes,
  constantRoutes
} from '@/router'
import {
  queryAllRoutes
} from '@/api/role'
/**
 * Use meta.role to determine if the current user has permission
 * @param menuList
 * @param route
 */
function hasPermission(menuList, route) {
    return menuList.some(role => route.path===role.uri)
}



/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menuList
 */
export function filterAsyncRoutes(routes, menuList) {
  const res = []
  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(menuList, tmp)) {
      if (route.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menuList)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: [],
  initRoutes: false
}


const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}



const actions = {
  generateRoutes({
    commit
  }, menuList) {

    return new Promise(resolve => {
      let accessedRoutes= filterAsyncRoutes(asyncRoutes, menuList)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}
