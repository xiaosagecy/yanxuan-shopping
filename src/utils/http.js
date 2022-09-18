// 封装axios
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  return config
}, error => {
  // 对请求错误做相应处理
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  // 状态码为2xx进入该函数
  return response
}, error => {
  // 状态码超出2xx触发该函数
  return Promise.reject(error)
})

// 封装适配get/post的请求函数

export function request (url, method, data) {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
