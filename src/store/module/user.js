
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
      picUrl: '',
      musicName: '',
      musicId: '',
      i:'',
      musicLong: ''
    },
    // 正砸播放歌单的id
    listId:'',
    // 正在播放的歌单
    playList:[],
    listenType:'1'
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
    },
    getplayList(state, musicList){
      state.playList = musicList
    },
    getlistenType(state, type){
      state.listenType = type
    },
    getlistId(state, type){
      state.listId = type
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
    },
    setPlayList(context, musicList){
      return context.commit('getplayList', musicList)
    },
    setlistenType(context, type){
      return context.commit('getlistenType', type)
    },
    setlistId(context, listeId){
      return context.commit('getlistId', listeId)
    }
  }
}
