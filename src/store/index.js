// 从之前new操作 变成了 createStore方法生成store实例
// 其余vuex中的选项和之前学的没有任何变化
import { createStore } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
// 引入vuex持久化
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  // strict: true, // 要求修改state中的数据只有一种方法必须提交mutation 否则会报错
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    // 放入vuex的三方插件 插件是对于vuex本身功能增强
    createPersistedstate({
      key: 'PC-STORE', // 存入本地时key
      paths: ['user', 'cart'] // 哪个模块要使用持久化的机制
    })
  ]
})
