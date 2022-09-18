export default {
  namespaced: true,
  state: {
    profile: {
      id: 100
    }
  },
  mutations: {
    setProfile (state, payload) {
      state.profile.id = payload
    }
  }
}
