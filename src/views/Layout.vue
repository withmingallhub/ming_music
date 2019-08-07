<template>
    <div>
        <div class="Top">
            <span style="font-size:0.4rem;">头部</span>
        </div>
        <div style="min-height:10rem;width:100%;margin-top:1.2rem;">
            <router-view @getid="updateMusic"></router-view>
        </div>
        <div class="musicVideo" @click="goMusicInfo">
            <div style="width:100%;heigh:100%;" v-if="listen.musicPic">
                <img class="musicImg musicImage" :src="listen.musicPic" alt="">
                <span style="float:left;margin-left:0.3rem;line-height:0.8rem;font-size:0.4rem;">{{ listen.musicName }}</span>
                <van-icon v-if="audio.playShow" @click="playAudio" class="show" name="play-circle-o" />
                <van-icon v-if="!audio.playShow" @click="pauseAudio" class="show" name="pause-circle-o" />   
            </div>
            <div v-if="!listen.musicPic">
                <img class="musicImg" src="../assets/musicPic.jpg" alt="">
                <span style="float:left;margin-left:0.3rem;line-height:0.8rem;font-size:0.4rem;">网易音乐</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            userId:'',
            // 播放器上的音乐的信息
            listen: {
                musicId:'',
                musicPic:'',
                url: '',
                musicName:''
            },
            musicUrl:'',
            // 是否正在播放
            audio:{
                playShow:false
            },
            // 用户信息
            userInfo: {

            },
            MusicInfo: {

            }
        }
    },
    watch: {
        // 监听数据变化，重新开始音乐图片旋转
        // 但是加上之后，会有一段时间图片未恢复，太丑了，不要了
            // musicUrl:function(newUrl){
            //     let img = document.getElementsByClassName('musicImg')[0]
            //     if(img){
            //         // 通过删除增加类名，达到重新开始动画
            //         img.classList.remove("musicImage")
            //         console.log('aa')
            //         // 这个语句很重要，没有的话，不能重新开始动画
            //         void img.offsetWidth
            //         img.classList.add("musicImage");
            //     }
            // },
    },
    mounted() {
        
    },
    methods:{
        // 从歌单中获取现在要播放歌曲的id，并且请求接口获取播放url
        updateMusic(id, url, name){
            this.listen.musicPic = url
            this.listen.musicName = name
            this.$emit('listengetid',id)
        },
        // 到播放音乐详细页面，有歌词啥的
        goMusicInfo(){
            this.$router.push({path:'/musicMore',query:{musicId:this.listen.id}})
        },
        // 进行播放歌曲
        playAudio(){
            let img = document.getElementsByClassName('musicImg')[0]
            img.style.animationPlayState = 'running'
            this.audio.playShow = false
            let audio = document.getElementById('audio')
            audio.play()
            window.event.cancelBubble = true
        },
        // 暂停歌曲
        pauseAudio(){
            let img = document.getElementsByClassName('musicImg')[0]
            img.style.animationPlayState = 'paused'
            let audio = document.getElementById('audio')
            audio.pause()
            this.audio.playShow = true
            window.event.cancelBubble = true
        }
    }
}
</script>

<style lang="">
.Top{
    height: 1.2rem;
    width:100%;
    background: white;
    position: fixed;
    top:0rem;
    border: 1px solid black;
}
.musicVideo{
    height:1.2rem;
    width: 100%;
    background: white;
    position: fixed;
    bottom: 0px;
    margin-bottom: -1px;
    z-index: 1;
}
.show{
    float:right;
    font-size:1rem;
    line-height:1.2rem;
    margin-right: 0.5rem;
}
.musicImg{
    width:1.2rem;
    height:1.2rem;
    border-radius:50%;
    float:left;
    margin-top:-0.2rem;
    margin-left:0.2rem;
}
.musicImage{
    animation:rotate 12s linear 0.2s infinite;
    -webkit-animation:rotate 12s linear 0.2s infinite;
}
@keyframes rotate{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>