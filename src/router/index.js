/*
 * @Description: 
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 14:01:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 23:03:14
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import cookie from "vue-cookies"
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes,
})
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


/**
 * @name: 路由守卫
 * @msg: 判断进入页面是否需要登录以及token是否存在，如果存在跳转页面
 * @param {type} 
 * @return: 
 */
router.beforeEach((to, from, next) => {
  // console.log(to.name)

  router.app.$nextTick(() => {
    var token = cookie.get("ticket");
    // console.log("token===>",token)
    if (to.meta.login) {
      if (token && token !== '') {
        /* 路由发生变化修改页面title */
        document.title = to.meta.title + " - 信息工程学院小先锋管理系统";
        next()
      } else {
        document.title = "信息工程学院小先锋管理系统";
        router.app.$Message.error('登录信息过期，请重新登录');
        localStorage.removeItem('id')
        next({
          path: '/login'
        })
        router.app.$Spin.hide();
      }
    } else {
      next()
    }
  })
})

export default router
