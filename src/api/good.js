import { request } from '@/utils/http'

// 获取详情数据
export function findGoods (id) {
  return request('/goods', 'get', { id })
}
