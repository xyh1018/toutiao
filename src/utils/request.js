// 封装请求模块
import axios from 'axios'
import store from '@/store'
import { getItem, removeItem } from './storage.js'
import router from '@/router'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
  // 基础路径
})

const refreshTokenAxios = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})

// eslint-disable-next-line no-proto
console.log(axios.prototype, refreshTokenAxios.prototype)
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  console.log('请求拦截器', config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  console.log('响应拦截器', response)
  return response
}, async function (error) {
  //
  const status = error.response.status
  //
  if (status === 401) {
    const { user } = store.state
    const refreshToken = getItem('TOUTIAO_USER').refresh_token
    if (!user || !user.token) {
      // 跳转到登陆页
      console.log('跳转到登陆页', refreshToken)
      return redirectLogin()
    }
    try {
      // 获取新Token
      const { data: { data: { token } } } = await refreshTokenAxios({
        method: 'PUT',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // 更新vuex里的user.token
      user.token = token
      // 更新token到本地存储
      store.commit('setUser', user)
      console.log('New Token', token)
      // error.config是本次失败配置对象
      return request(error.config)
    } catch (err) {
      console.log('获取新Token失败')
      redirectLogin()
    }
  }
  console.log('响应拦截器ERROR', error)
  return Promise.reject(error)
})

function redirectLogin() {
  // 如果token和refresh_token都失效，
  // 则重定向到登录页面，同时删除本地和vuex中的用户token
  // 预防用户不想登录时，点击返回按钮又会回到登录页面的问题
  removeItem('TOUTIAO_USER')
  store.commit('setUser', null)
  router.push('/login')
}

export default request
