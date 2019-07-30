
export default {
  state: {
    userInfo: {

    },
    musicInfo: {

    }
  },
  mutations: {
    getInfo(state, param) {
      state.userInfo = param
    },
    getMusicInfo(state, param){
        state.musicInfo = param
    }
  },
  getters: {
    
  },
  actions: {
    addnumbers(context, info){
      return context.commit('getInfo', info)
    },
    getMusicIn(context, info){
        return context.commit('getMusicInfo', info)
      }
  }
}
