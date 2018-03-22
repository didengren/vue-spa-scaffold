/**
 * 路由配置单
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import * as routeHook from './routeHook'

Vue.use(VueRouter)

const router = new VueRouter({routes})

// 拦截导航 before钩子
router.beforeEach((to, from, next) => {
  routeHook.beforeEachFn(to, from, next)
})

// 拦截导航 after钩子
router.afterEach((to, from) => {
  routeHook.afterEachFn(to, from)
})

export default router
