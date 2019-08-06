
export default {
  state: {
    userInfo: {

    },
    musicInfo: {

    },
    userId:''
  },
  mutations: {
    getInfo(state, param) {
      state.userInfo = param
    },
    getMusicInfo(state, param){
        state.musicInfo = param
    },
    getUserId(state,id){
        state.userId = id
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
      },
    setUserId(context, id){
      return context.commit('getUserId', id)
    }
  }
}
