import { getCategory } from '@/api/home'

export default {
  namespaced: true,
  state: {
    categoryList: []
  },
  mutations: {
    setCategoryList (state, list) {
      state.categoryList = list
    }
  },
  actions: {
    async getCategoryList ({ commit }) {
      const res = await getCategory()
      commit('setCategoryList', res.result)
    }
  }
}
