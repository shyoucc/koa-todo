import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import login from '@/view/login'
import reg from '@/view/reg'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '/reg',
    name: 'reg',
    component: reg
  },
  {
    path: '*',
    redirect: '/'
  }
]

let router = new Router({
  mode: 'history',
  base: __dirname,
  routes: routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('vue-koa-todo')
  if (to.path === '/') {
    if (token !== 'null' && token != null) {
      console.log(121212)
      next('/index')
    }
    next()
  } else {
    if (token !== 'null' && token !== null) {
      // 全局设定header的token验证
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
      next()
    } else {
      next('/')
    }
  }
})

export default router
