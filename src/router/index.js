// 1.createRouter 生成router实例对象
// 2.createWebHashHistory 生成hash模式的路由配置对象

import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
