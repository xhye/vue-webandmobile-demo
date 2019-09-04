import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/web',
          name: 'web',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/web/index.vue')
        },
        {
          path: '/mobile',
          name: 'mobile',
          redirect: '/mobile/apply',
          component: () => import('../views/mobile/index.vue'),
          children: [
            {
              path: '/mobile/apply',
              name: 'apply',
              meta: { title: '审批' },
              component: () => import('../views/mobile/tabs/apply/index.vue')
            },
            {
              path: '/mobile/report',
              meta: { title: '汇报' },
              name: 'report',
              component: () => import('../views/mobile/tabs/report/index.vue')
            }
          ]
        },
        {
          path: '/mobile/apply/leave',
          name: 'leave',
          component: () => import('../views/mobile/tabs/apply/leave/index.vue')
        },
        {
          path: '/mobile/apply/test',
          name: 'test',
          component: () => import('../views/mobile/tabs/apply/test/index.vue')
        }
      ]
    }
  ]
})
