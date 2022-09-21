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
  },
  getters: {
    // 商品总数：将cartList里每一项count字段累加起来
    allCount (state) {
      // reduce p为初始值0，c为cartList数组中的每一项c[初始值] ==> c[0] reduce方法第三个参数为初始值0，每次累计后发生改变
      // 第一次执行 相当于 0+c[0].count
      return state.cartList.reduce((p, c) => p + c.count, 0)
    },
    // 价格总数
    priceCount (state) {
      // 单价price * 数量 count
      return state.cartList.reduce((p, c) => p + (c.count * c.price), 0)
    }
  }
}
