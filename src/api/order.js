import { request } from '@/utils/http'

// 获取结账信息
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}

/**
 * 提交订单
 * @param {Object} order - 订单信息对象
 *  deliveryTimeType: 1,
 *  payType: 1,
 *  buyerMessage: '',
 *  addressId: null, // 地址id
 *  goods: [] // { skuId, count } 由所有商品的skuId 和 count字段组成的数组
 */
export const createOrder = (order) => {
  return request('/member/order', 'post', order)
}

/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const findOrder = (id) => {
  return request('/member/order/' + id, 'get')
}
