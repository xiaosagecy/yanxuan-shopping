import { request } from '@/utils/http'

// 获取导航数据
export function getCategory () {
  return request('/home/category/head', 'GET')
}

// 获取轮播图
export function findBanner () {
  return request('home/banner', 'GET')
}
