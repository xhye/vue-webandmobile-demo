import axios from 'axios'
import router from '../router'

const request = axios.create({
  // 30秒超时
  timeout: 30000,
  baseURL: '/api'
})

request.interceptors.request.use(config => {
  config.headers['Authorization'] = `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  return config
}, error => Promise.reject(error))

request.interceptors.response.use(response => response, error => {
  const { status } = error.response
  if (status && status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    router.push({ path: '/' }) // 路由向到首页 进行授权
  }
  return Promise.reject(error)
})

export default {
  request,
  /** get 请求
   * @param  url 接口地址
   * @param  params 请求参数
   */
  get (url, params) {
    return new Promise((resolve, reject) => {
      request.get(url, {
        params: params
      })
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
    })
  },
  /** post 请求
   * @param url 接口地址
   * @param params 请求参数
   */
  post (url, params) {
    return new Promise((resolve, reject) => {
      request.post(url, params)
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error)
          })
    })
  }
}
