// 请求模块
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  // 接口的基准路径。这样每次请求就不用输入过长的url
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return {
        data
      }
    }
  }]
})
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器

export default request // 让他默认导出
