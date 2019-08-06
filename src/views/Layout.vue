<template>
    <div>
        <div class="Top">
            <span style="font-size:1rem;">头部</span>
        </div>
        <div style="min-height:10rem;width:100%;">
            <router-view @getid="updateMusic"></router-view>
        </div>
        <div class="musicVideo">
            <audio ref="audio"  :src="listen.url" controls="controls" autoplay="autoplay">
                Your browser does not support the audio element.
            </audio>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            userId:'',
            listen: {
                musicId:'',
                url: '',
                musicName:''
            },
            userInfo: {

            },
            MusicInfo: {

            }
        }
    },
    watch: {
        
    },
    mounted() {
        this.checkLogin()
    },
    methods:{
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
        updateMusic(li){
            this.listen.musicId = li.id
            this.listen.url = li.picUrl
            this.listen.musicName = li.name
        }
    }
}
</script>

<style lang="">
.Top{
    height: 2rem;
    border: 1px solid black;
}
.musicVideo{
    height:1.5rem;
    width: 100%;
    background: pink;
    position: fixed;
    bottom: 0rem;
    z-index: 1;
}
</style>