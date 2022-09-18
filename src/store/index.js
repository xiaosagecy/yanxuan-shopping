// 从之前new操作 变成了 createStore方法生成store实例
// 其余vuex中的选项和之前学的没有任何变化
import { createStore } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
// 引入vuex持久化
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  },
  plugins: [
    // 放入vuex的三方插件 插件是对于vuex本身功能增强
    createPersistedstate({
      key: 'erabbit-client-pc-store', // 存入本地时key
      paths: ['user'] // 哪个模块要使用持久化的机制
    })
  ]
})
