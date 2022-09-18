export default {
  namespaced: true,
  state: {
    cartList: []
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
    }
  }
}
