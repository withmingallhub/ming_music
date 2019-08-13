
<template>
    <div>
        <audio id="audio" ref="audio" @ended="audioEnd()" :src="listen.url" autoplay="autoplay" @timeupdate="updateTime">
                Your browser does not support the audio element.
        </audio>
        <router-view @listengetid="updateMus" v-model="currentTime" :changeI="listen.i"></router-view>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';

export default {
    data() {
        return {
            // 播放器上的音乐的信息
            listen: {
                musicId:'',
                musicPic:'',
                url: null,
                musicName:'',
                i:''
            },
            playList:[],
            currentTime:Number,
        }
    },
    watch: {
        // currentTime: function(newlong, oldlong){
        //     let audio = document.getElementById('audio')
        //     // audio.currentTime = this.currentTime
        // }
    },
    mounted() {
        this.checkLogin()
    },
    methods: {
        updateTime(e){
            this.currentTime = e.target.currentTime;    // 获取当前播放时间段
        },
        // 当这个音乐播放完毕，根据播放类型，选择‘单曲循环’，‘列表循环’，‘随机播放’
        audioEnd(){
            this.playList = this.$store.state.user.playList
            let type = this.$store.state.user.listenType
            if(type == '1')
                // 默认为列表循环
                this.nextMusic()
            else if(type == '3')
                // 当为2时，单曲循环
                this.oneMusic()
            else if(type == '2')
                // 3的时候随机播放
                this.randomMusic()
        }, 
        // 默认为列表循环
        nextMusic(){
            if(this.listen.i === this.playList.length - 1){
                this.listen.i = 0
                this.changeMusic1(this.listen.i, 'bottom')
            }
            else{
                this.listen.i += 1
                this.changeMusic1(this.listen.i, 'bottom')
            }
        },
        changeMusic1(i,is){
            const that = this
            axios.post('/api/song/url?id=' + this.playList[i].id).then((res)=>{
                console.log(res)
                if(res.data.data[0].url == null){
                    if(is == 'bottom')
                        that.nextMusic()
                    else if(is == 'random')
                        that.randomMusic()
                }
                else
                    // this.updateMus(this.playList[i].id, this.playList[i].al.picUrl, this.playList[i].name, i,this.playList[i].dt)
                    this.listen.musicId = this.playList[i].id
                    this.listen.musicPic = this.playList[i].al.picUrl
                    this.listen.musicName = this.playList[i].name
                    this.listen.i = this.playList[i].dt
            })
        },
        // 当为2时，单曲循环
        oneMusic(){
            let audio = document.getElementById('audio')
            // 继续播放歌曲
            audio.play()
        },
        // 3的时候随机播放
        randomMusic(){
            console.log('随机播放')
            let long = this.$store.state.user.playList.length
            console.log(long)
            let i = parseInt(Math.random()*long)
            console.log(i)
            this.changeMusic1(i, 'random')
        },
        // mounted加载完毕检查登录
        checkLogin(){
            const that = this
            axios.get('/api/login/status').then((res)=>{
                that.userId = res.data.profile.userId
                this.$store.dispatch('setUserId',that.userId)
                that.musicInfo()
                that.getInfo()
            }).catch(function(error){
                // if(error.response.data.code === 301){
                    that.$router.push({path:'/Login'})
                // }
            })
        },
        // 获取用户信息
        getInfo(){
            axios.post('/api/user/detail?uid=' + this.userId,{
                uid:this.userId
            }).then((res)=>{
                this.$store.dispatch('addnumbers',res.data)
                this.userInfo = this.$store.state.user.userInfo
            })
        },
        musicInfo(){
            axios.post('/api/user/playlist?uid=' + this.userId,{
                uid:this.userId
            }).then((res)=>{
                this.$store.dispatch('getMusicIn',res.data)
                this.MusicInfo = this.$store.state.user.musicInfo
            })
        },
        // 获取音乐信息，并且存入vuex，
        updateMus(id ,url, name, item, dt){
            let picName = {
                picUrl: url,
                musicName: name,
                musicId: id,
                i:item,
                musicLong: dt
            }
            this.$store.dispatch('setPlayMusic',picName)
            axios.post('/api/song/url?id=' + id,{
                id: id
            }).then((res)=>{
                if(res.data.data[0].url == null)
                Toast('获取音乐失败，可能暂无版权')
                else{
                    this.listen.url = res.data.data[0].url
                    this.listen.i = item
                }
            })
        }
    },
}
</script>