const com1 = r => require.ensure([], () => r(require('@/views/com1.vue')), 'com1')
const com2 = () => import('@/views/com2.vue')

const routes1 = [
  {
    path: '*', // 默认到
    redirect: '/com1'
  },
  {
    path: '/', // 主页
    name: 'com1',
    component: com1,
    meta: {
      wait: true
    }
  },
  {
    path: '/com2',
    name: 'com2',
    component: com2
  }
]

export default routes1
