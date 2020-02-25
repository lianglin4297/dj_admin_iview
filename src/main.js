/*
 * @Description: 
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 14:01:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 22:56:30
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iView'
import 'iview/dist/styles/iview.css'
import {post,get,Delete} from '../src/util/http'
import VueCookies from 'vue-cookies'

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$delete = Delete
Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(iView)

require('../static/common.css')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
