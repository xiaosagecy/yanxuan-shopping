import { userAccountLogin } from '@/api/user'

export default {
  namespaced: true,
  state: {
    profile: {}
  },
  mutations: {
    setProfile (state, payload) {
      state.profile = payload
    }
  },
  actions: {
    async fetchProfile (ctx, { account, password }) {
      const res = await userAccountLogin({ account, password })
      ctx.commit('setProfile', res.result)
    }
  }
}
