
<template>
    <div>
        <audio id="audio" ref="audio"  :src="listen.url" autoplay="autoplay">
                Your browser does not support the audio element.
        </audio>
        <router-view @listengetid="updateMus"></router-view>
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
                musicName:''
            },
        }
    },
    mounted() {
        this.checkLogin()
    },
    methods: {
        // mounted加载完毕检查登录
        checkLogin(){
            const that = this
            axios.get('/api/login/status').then((res)=>{
                that.userId = res.data.profile.userId
                this.$store.dispatch('setUserId',that.userId)
                that.musicInfo()
                that.getInfo()
            }).catch(function(error){
                if(error.response.data.code === 301){
                    that.$router.push({path:'/Login'})
                }
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
        updateMus(id ,url, name){
            let picName = {
                picUrl: url,
                musicName: name,
                musicId: id
            }
            this.$store.dispatch('setPlayMusic',picName)
            axios.post('/api/song/url?id=' + id,{
                id: id
            }).then((res)=>{
                this.listen.url = res.data.data[0].url
                if(this.listen.url == null)
                Toast('获取音乐失败，可能暂无版权')
            })
        }
    },
}
</script>