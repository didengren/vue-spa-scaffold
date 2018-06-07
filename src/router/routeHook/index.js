import store from '@/store'

/**
 * 路由的before钩子回调方法
 * @param to from next
 */
export let beforeEachFn = function (to, from, next) {
  store.dispatch('set_loading', true)
  if (to.matched.some(r => r.meta.wait)) {
    next()
  } else {
    setTimeout(() => {
      next()
    }, 2000)
  }
}

/**
 * 路由的after钩子回调方法
 * @param to from
 */
export let afterEachFn = function (to, from) {
  store.dispatch('set_loading', false)
  store.dispatch('set_tooltip', {
    isShow: false,
    msg: ''
  })
}
