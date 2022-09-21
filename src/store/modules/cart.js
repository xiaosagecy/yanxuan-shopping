import { insertCart, findCartList } from '@/api/cart'

export default {
  namespaced: true,
  state: {
    cartList: []
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
    }
  },
  actions: {
    // 加入购物车
    async fetchInsertCart (ctx, { skuId, count }) {
      // 1.加入购物车接口
      await insertCart({ skuId, count })
      // 2.获取购物车列表
      const res = await findCartList()
      // 3.存入state
      ctx.commit('setCartList', res.result)
    }
  }
}
