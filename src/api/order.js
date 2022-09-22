import { request } from '@/utils/http'

// 获取结账信息
export const findCheckoutInfo = () => {
  return request('/member/order/pre', 'get')
}
