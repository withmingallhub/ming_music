
<template>
    <div style="width:100%;"  @touchmove.prevent>
        <div style="border-top: 1px solid rgb(200,200,200);background: rgb(25, 181, 254);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconMoreBroad" />
            <span class="topNameBroad">{{ broadInfo.name }}</span>
        </div>
        <div style="width: 100%;height: 12rem;border: 1px solid black;">
            <div style="width: 100%;height: 2.5rem">
                <img style="width: 2rem;height: 2rem;margin-top: 0.5rem;" v-lazy="broadInfo.coverUrl" alt="">
            </div>
            <div style="width: 100%;height: 3rem;">
                <span style="font-size: 0.4rem;">{{ broadInfo.dj.nickname }}</span>
                <p style="font-size: 0.4rem;">{{ broadInfo.dj.brand }}</p>
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
            songId: '',
            broadId: '',
            broadList: [],
            broadInfo: {

            },
            playInfo:{

            },
            // 是否正在播放音乐
            audio: {
                playShow:''
            },
            lyric:[],
            listenType:'',
            playTime: '',
            playLong: '',
            musicTime: '',
            musiclong: '',
        }
    },
    watch: {
        // 获取到播放进度改变时，同时改变进度条的进度
        musicLong: function(newlong, oldlong){
            let min = Math.floor(newlong/60)
            if((min/10)<1) min = '0' + min
            let miao = Math.floor(newlong%60)
            if((miao/10)<1) miao = '0' + miao
            this.playTime = min + ':' + miao
            this.playLong = (newlong / this.musiclong) * 100
        },
        changeI:function (newI, oldI) {
            this.changeMusic(newI)
        },
    },
    model: {
        prop: 'musicLong',
        event: 'parent-long'
    },
    props:{
        // 正在播放的进度
        musicLong: Number,
        changeI:Number
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
            this.listenType = this.$store.state.user.listenType
            this.broadList = this.$store.state.user.playList
            this.playInfo = this.$store.state.user.playMusic
            this.musiclong = this.$store.state.user.playMusic.musiclong
            this.setInfo()
            axios.post('/api/dj/program/detail?id=' + this.broadId).then((res)=>{
                console.log(res.data.program)
                this.broadInfo = res.data.program
            })
        },
        // 返回上一级
        goUp(){
            history.go(-1)
        },
        // 切换上一首或者下一首的id发送给listen父级，进行播放
        changeMusic(i){
            this.broadList = this.$store.state.user.playList[i]
            this.broadId = this.broadList[i].id
            this.musicId = this.broadList[i].mainSong.id
            this.$emit('listengetid',this.broadList[i].mainSong.id, this.broadList[i].coverUrl, this.broadList[i].mainSong.name, i,this.broadList[i].duration,this.broadList[i].id)
            this.getInfo()
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