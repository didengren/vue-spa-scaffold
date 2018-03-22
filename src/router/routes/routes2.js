const login = r =>
  require.ensure([], () => r(require('@/views/login/index.vue')), 'login')
const pwdLogin = () => import('@/views/login/pwdLogin.vue')

const routes2 = [
  {
    path: '*', // 默认到
    redirect: '/login'
  },
  {
    path: '/login',
    component: login,
    children: [
      {
        path: '/pwdLogin',
        name: 'pwdLogin',
        component: pwdLogin
      }
    ]
  }
]

export default routes2
