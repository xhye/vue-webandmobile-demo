import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history', // hash
  base: process.env.BASE_URL,
  routes: [
    { path: '*', redirect: '/' },
    { path: '/error', name: 'error', meta: { title: '错误' } , component: () => import(/* webpackChunkName: "about" */ '../views/common/error/index.vue') },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: '首页', keepAlive: true },
      // beforeEnter (to, from, next) {
      //   const accessToken = localStorage.getItem('ACCESS_TOKEN')
      //   if (!accessToken || !/\S/.test(accessToken)) {
      //     localStorage.removeItem('ACCESS_TOKEN')
      //     next('/')
      //   }
      //   next()
      // },
      children: [
        {
          path: '/demo',
          name: 'demo',
          redirect: '/demo/apply',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/modules/demo/index.vue'),
          children: [
            {
              path: '/demo/apply',
              name: 'apply',
              meta: { title: '审批', keepAlive: true },
              component: () => import('../views/modules/demo/menus/apply/index.vue')
            },
            {
              path: '/demo/report',
              meta: { title: '汇报', keepAlive: true },
              name: 'report',
              component: () => import('../views/modules/demo/menus/report/index.vue')
            }
          ]
        },
        {
          path: '/demo/apply/leave',
          name: 'leave',
          meta: { title: '请假' },
          component: () => import('../views/modules/demo/menus/apply/leave/index.vue')
        }
      ]
    },
  ]
})
/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  const accessToken = to.query['access_token'] || to.query['ACCESS_TOKEN']
  accessToken && localStorage.setItem('ACCESS_TOKEN', accessToken)
  console.log('to', to)
  // if(to.path === '/') {
  //
  // }
  next()
})
/**
 * 路由后置守卫
 */
router.afterEach(to => { // 设置网页标题
  document.title = to.meta.title || '你真好 真是个大沙雕'
})
export default router
