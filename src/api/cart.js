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

/**
 * 修改购物车商品的状态和数量 goods包含一下三个参数
 * @param {String} goods.skuId - 商品sku
 * @param {Boolean} goods.selected - 选中状态
 * @param {Integer} goods.count - 商品数量
 * @returns Promise
 */
 export const updateCart = (goods) => {
  return request('/member/cart/' + goods.skuId, 'put', goods)
}

/**
 * 全选反选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - 所有的商品skuId集合
 * @returns Promise
 */
 export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}