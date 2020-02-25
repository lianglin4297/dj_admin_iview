/*
 * @Description: 封装请求
 * @version: 
 * @Author: Lianglin
 * @Date: 2019-08-09 16:50:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-26 16:35:31
 */
import axios from 'axios';
import Qs from 'qs'
axios.defaults.timeout = 8000;
// axios.defaults.baseURL ='http://117.50.73.238:8080';

//http request 拦截器
axios.interceptors.request.use(
  config => {
  return config
  },
  error => {
    return Promise.reject(error);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

  /**
 * 封装Delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function Delete(url,params={}){
  return new Promise((resolve,reject) => {
    axios.delete(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}