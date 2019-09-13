
<template>
    <div style="width:100%;"  @touchmove.prevent>
        <div style=";background: #FF0033;overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconMoreBroad" />
            <span class="topNameBroad">{{ broadInfo.name }}</span>
        </div>
        <div style="width: 100%;height: 12rem;">
            <div style="width: 100%;height: 6.5rem">
                <img style="width: 6rem;height: 6rem;margin-top: 0.5rem;" :src="broadInfo.coverUrl" alt="">
            </div>
            <div style="width: 100%;height: 3rem;">
                <span style="font-size: 0.4rem;">{{ dj.nickname }}</span>
            </div>
        </div>
        <div style="position:fixed;bottom:0rem;width:100%;padding-bottom:0.8rem;">
            <div style="width:90%;position:relative;left:5%;height:0.3rem;margin-top:0.2rem;">
                <!-- vant ui的进度条 -->
                <van-slider
                style="width:100%;"
                v-model="playLong"
                bar-height="2px"
                active-color="#1989fa"
                @change="getlong()"
                />
            </div>
            <div style="margin-bottom:0.5rem;">
                <span>{{ playTime }} / {{ musicTime }}</span>
            </div>
            <div>
                
                <van-icon v-if="audio.playShow" @click="playAudio" class="show1" name="play-circle-o" />
                <van-icon v-if="!audio.playShow" @click="pauseAudio" class="show1" name="pause-circle-o" />   
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            songId: Number,
            broadId: Number,
            broadList: [],
            broadInfo: {
                
            },
            dj: {

            },
            playInfo:{

            },
            // 是否正在播放音乐
            audio: {
                playShow:Boolean
            },
            // 正在播放了多长时间
            playTime: '',
            // 正在播放的进度除以歌曲长度，获得进度条长度
            playLong: 0,
            //  歌曲的总长度换算字符转
            musicTime: '',
            //  歌曲的总长度（毫秒）
            musiclong: Number,
        }
    },
    watch: {
        playLong: function(newl, oldl){
            if(Math.round(newl) == 100){
                this.playLong = 0
                this.audio.playShow = true
                this.playTime = '00:00'
            }
            console.log(newl,)
        },
        // 获取到播放进度改变时，同时改变进度条的进度
        musicLong: function(newlong, oldlong){
            let min = Math.floor(newlong/60)
            if((min/10)<1) min = '0' + min
            let miao = Math.floor(newlong%60)
            if((miao/10)<1) miao = '0' + miao
            this.playTime = min + ':' + miao
            this.playLong = (newlong / this.musiclong) * 100
        },
    },
    model: {
        prop: 'musicLong',
        event: 'parent-long'
    },
    props:{
        // 正在播放的进度
        musicLong: '',
    },
    mounted() {
        this.getInfo()
        this.ifPlay()
    },
    methods: {
        // 进行播放歌曲
        playAudio(){
            // 显示播放歌曲的logo
            this.audio.playShow = false
            let audio = document.getElementById('audio')
            // 继续播放歌曲
            audio.play()
        },
        // 暂停歌曲
        pauseAudio(){
            // 显示暂停歌曲的logo
            let audio = document.getElementById('audio')
            this.audio.playShow = true
            // 暂停歌曲
            audio.pause()
        },
        // 是否正在播放音乐，如果是，那么在底部显示
        ifPlay(){
            let audio = document.getElementById('audio')
            if(audio.src){
                if(audio.paused){
                    this.audio.playShow = true
                }
                else{
                    this.audio.playShow = false
                }
            }
        },
        getlong(){
            let musicLong = (this.playLong * this.musiclong) / 100
            let audio = document.getElementById('audio')
            audio.currentTime = musicLong
        },
        getInfo(){
            // 获取播放电台的基本信息
            this.broadId = this.$store.state.user.playMusic.broadId
            this.songId = this.$store.state.user.playMusic.musicId
            this.broadList = this.$store.state.user.playList
            this.playInfo = this.$store.state.user.playMusic
            this.setInfo()
            axios.post('/api/dj/program/detail?id=' + this.broadId).then((res)=>{
                console.log(res.data.program)
                this.broadInfo = res.data.program
                this.dj = res.data.program.dj
            })
        },
        // 返回上一级
        goUp(){
            history.go(-1)
        },
        setInfo(){
            // 更新歌词时长
            this.musiclong = this.$store.state.user.playMusic.musicLong / 1000
            let min = Math.floor(this.musiclong/60)
            if((min/10)<1) min = '0' + min
            let miao = Math.floor(this.musiclong%60)
            if((miao/10)<1) miao = '0' + miao
            this.musicTime = min + ':' + miao
        },
    },
}
</script>

<style lang="">
.iconMoreBroad {
    font-size: 0.5rem;
    float: left;
    line-height: 1rem;
}
.topNameBroad {
    line-height: 1rem;
    font-size: 0.4rem;
    clear: both;
    margin-left: -0.5rem;
}
.fa{
    font-size:0.6rem;
    line-height:1.2rem;
}
.show1{
    font-size:1.2rem;
    line-height:1.2rem;
    margin-right: 0.5rem;
}
.show2{
    font-size:1.2rem;
    line-height:1.2rem;
    margin-right: 0.5rem;
}
</style>