import { request } from '@/utils/http'

// 获取分类数据
export function findTopCategory (id) {
  return request('/category', 'get', { id })
}
