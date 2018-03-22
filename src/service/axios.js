import axios from 'axios'
import store from '../store'
// import router from '../router'

// axios 配置
// axios.defaults.timeout = 5000
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? location.origin // 线上环境接口
    : 'http://10.40.2.92:8092' // 开发环境接口

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // if (store.state.base.token) {
    //   config.headers.common['Authorization'] = `${store.state.base.token}`
    // }
    store.dispatch('set_loading', true)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    store.dispatch('set_loading', false)
    return response
  },
  error => {
    if (error.response) {
      // switch (error.response.status) {
      // case 403: // token无效 清除token信息并跳转到登录页面
      // store.dispatch('set_logout')
      // router.replace({
      //   name: 'login',
      //   query: {redirect: router.currentRoute.fullPath}
      // })
      // break
      // case 401: // token 过期
      // axios.get('/api/refresh')
      // .then((response) => {
      //   let result = response.data
      //   if (result.status === 0) {
      //     store.dispatch('set_renew_token', result.data.token)
      //   } else {
      //     store.dispatch('set_tooltip', {
      //       isShow: true,
      //       msg: result.msg
      //     })
      //   }
      // })
      // .catch((error) => {
      //   switch (error.response.status) {
      //     case 400:
      //       store.dispatch('set_tooltip', {
      //         isShow: true,
      //         msg: 'token失效！！！'
      //       })
      //       break
      //     default:
      //       break
      //   }
      // })
      // break
      // case 404:
      //   console.log('404')
      //   store.dispatch('set_logout')
      //   router.replace({
      //     name: 'login',
      //     query: {redirect: router.currentRoute.fullPath}
      //   })
      //   break
      // default:
      //   break
      // }
    }
    return Promise.reject(error)
  }
)

export default axios
