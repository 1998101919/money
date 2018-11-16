import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index' //
import Register from './views/Register' //注册的页面
import Login from './views/Login' //登录的页面
import Notfound from './views/Notfound' //没有找到的页面
import Infoshow from './views/Infoshow' //个人信息
import Home from './views/Home' //主页
import Manage from './views/Manage' //项目管理


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/info',
          name: 'infoshow',
          component: Infoshow
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/manage',
          name: 'manage',
          component: Manage
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '*',
      name: 'Notfound',
      component: Notfound
    }
  ]
})
//全局守卫的配置
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('eleToken') ? true : false;
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    token ? next() : next('/login')
  }
})

export default router;
