import { request } from '@/utils/http'

// 加入购物车
export function insertCart ({ skuId, count }) {
  return request('/member/cart', 'post', { skuId, count })
}

// 登陆后的购物车
export function findCartList () {
  return request('/member/cart', 'get')
}

// 删除商品 （支持批量删除） ids--skuId集合
export function deleteCart (ids) {
  return request('/member/cart', 'delete', { ids })
}
