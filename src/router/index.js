// 1.createRouter 生成router实例对象
// 2.createWebHashHistory 生成hash模式的路由配置对象

import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Category from '@/views/Category'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
        name: 'home'
      },
      {
        path: 'category',
        component: Category,
        name: 'category'
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
