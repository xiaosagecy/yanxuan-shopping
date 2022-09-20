import { request } from '@/utils/http'

// 账号密码登陆
export function userAccountLogin ({ account, password }) {
  return request('/login', 'post', { account, password })
}
