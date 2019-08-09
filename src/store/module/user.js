
export default {
  state: {
    // 用户信息
    userInfo: {

    },
    // 用户音乐信息
    musicInfo: {

    },
    // 用户id
    userId:'',
    // 播放器上正在  播放/暂停  的音乐的id,名称,以及图片的url
    playMusic:{

    }
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
    },
    getPlayMusic(state, musicPic){
      state.playMusic = musicPic
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
    },
    setPlayMusic(context, picName){
      return context.commit('getPlayMusic', picName)
    }
  }
}
