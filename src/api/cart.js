import { request } from '@/utils/http'

// 加入购物车
export function insertCart ({ skuId, count }) {
  return request('/member/cart', 'post', { skuId, count })
}

// 登陆后的购物车
export function findCartList () {
  return request('/member/cart', 'get')
}
