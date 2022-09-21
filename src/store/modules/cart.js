import { insertCart, findCartList, deleteCart } from '@/api/cart'

export default {
  namespaced: true,
  state: {
    cartList: []
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
    },
    // 单选修改
    singleCheck(state, { skuId, selected }){
      // 先找到对应的skuId（使用find） ，再改selected值
      const item = state.cartList.find(item => item.skuId = skuId)
      item.selected = selected
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
    },
    // 删除购物车商品
    async fetchDelCart (ctx, ids) {
      // 1.调用删除商品接口
      await deleteCart(ids)
      // 2.获取购物车列表
      const res = await findCartList()
      // 3.存入state
      ctx.commit('setCartList', res.result)
    }
  },
  getters: {
    // 商品总数：将cartList里每一项count字段累加起来
    allCount (state) {
      // reduce p为初始值0，c为cartList遍历的每一项 reduce方法第三个参数为初始值0，每次累计后发生改变
      // 第一次执行 相当于 0+c[0].count
      return state.cartList.reduce((p, c) => p + c.count, 0)
    },
    // 价格总数
    priceCount (state) {
      // 单价price * 数量 count
      return state.cartList.reduce((p, c) => p + (c.count * c.price), 0)
    },
    // 已选商品 先用filter选出 selected为true的 商品 再使用reduce 累加
    selectedCount(state){
      return state.cartList
      .filter(item => item.selected === true)
      .reduce((p,c) => p + c.count, 0)
    },
    // 已选择的商品钱数总和:把cartList中所有项中selected为true的项的筛选出来 让后把他们的count * price累加
    selectedPrice (state) {
      return state.cartList
        .filter(item => item.selected === true)
        .reduce((p, c) => p + c.count * c.price, 0)
    }
  }
}
