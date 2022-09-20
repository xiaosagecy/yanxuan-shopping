import { request } from '@/utils/http'

// 获取详情数据
export function findGoods (id) {
  return request('/goods', 'get', { id })
}

// 获取热榜商品
export function findHotGoods ({ id, type, limit = 3 }) {
  return request('/goods/hot', 'get', { id, type, limit })
}
