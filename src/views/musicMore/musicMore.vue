<template>
    <div style="width:100%;">
        <div style="background:white;overflow:hidden;height:2rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="icon" />
            <span class="topName">{{ playMusic.musicName }}</span>
            <p>{{ playMusic.write }}</p>
        </div>
        <div style="width:100%;">
            <img :class="showImg === false ? 'musicImg1 musicImage1' : 'musicImg1'" :src="playMusic.img" alt="">
        </div>
        <div style="width:90%;position:relative;left:5%;height:0.3rem;">
            <!-- vant ui的进度条 -->
            <van-slider
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
            <van-icon @click="musicUp" class="show2" name="arrow-left" />
            <van-icon v-if="audio.playShow" @click="playAudio" class="show1" name="play-circle-o" />
            <van-icon v-if="!audio.playShow" @click="pauseAudio" class="show1" name="pause-circle-o" />   
            <van-icon class="show2" @click="musicBottom" name="arrow" />
        </div>
        <div>
            <i @click="nextMusic" v-if="listenType == '2'" class="fa fa-random" ></i>
            <i @click="oneMusic" v-if="listenType == '1'" class="fa fa-refresh" ></i>
            <i @click="randomMusic" v-if="listenType == '3'" class="fa fa-undo" ></i>
        </div>
        <div>{{ musicLong }}</div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';

export default {
    data() {
        return {
            // 正在播放音乐的信息
            playMusic: {
                i:'',
                musicName:'',
                musicId:'',
                img: '',
                write:'',
                picUrl: '',
            },
            // 是否正在播放音乐
            audio: {
                playShow:''
            },
            // 正在播放的百分比
            playLong: 0,
            // 真在播放音乐的时长
            musiclong:Number,
            musicTime:'',
            // 正在播放音乐的进度，转换为时间
            playTime:'',
            showImg:true,
            playList: [],
            listenType:'',
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
        changeI:function(newI, oldI){
            console.log(newI)
            this.changeMusic(newI)
        }
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
        // 初始化播放音乐的信息
        this.writeInfo()
        this.ifPlay()
    },
    methods:{
        getlong(){
            let musicLong = (this.playLong * this.musiclong) / 100
            let audio = document.getElementById('audio')
            audio.currentTime = musicLong
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
                    this.showImg = false
                }
            }
        },
        // 进行播放歌曲
        playAudio(){
            // 进行旋转图片
            if(this.showImg === true)
            this.showImg = false
            // 继续动画
            let img = document.getElementsByClassName('musicImg1')[0]
            img.style.animationPlayState = 'running'
            // 显示播放歌曲的logo
            this.audio.playShow = false
            let audio = document.getElementById('audio')
            // 继续播放歌曲
            audio.play()
        },
        // 暂停歌曲
        pauseAudio(){
            // 暂停动画
            let img = document.getElementsByClassName('musicImg1')[0]
            img.style.animationPlayState = 'paused'
            // 显示暂停歌曲的logo
            let audio = document.getElementById('audio')
            this.audio.playShow = true
            // 暂停歌曲
            audio.pause()
        },
        // 返回上一级
        goUp(){
            history.go(-1)
        },
        // 切换下一首，更新本页面内的内容
        setInfo(){
            this.musiclong = this.$store.state.user.playMusic.musicLong / 1000
            let min = Math.floor(this.musiclong/60)
            if((min/10)<1) min = '0' + min
            let miao = Math.floor(this.musiclong%60)
            if((miao/10)<1) miao = '0' + miao
            this.musicTime = min + ':' + miao
        },
        // 初始化播放音乐的信息
        writeInfo(){
            this.listenType = this.$store.state.user.listenType
            if(!this.$store.state.user.listenType){
                this.listenType = '1'
                this.$store.state.user.listenType = '1'
            }
            // 获取音乐id，歌单列表，音乐的时间
            this.playMusic.musicId = this.$store.state.user.playMusic.musicId
            this.playList = this.$store.state.user.playList
            this.musiclong = this.$store.state.user.playMusic.musicLong / 1000
            let min = Math.floor(this.musiclong/60)
            if((min/10)<1) min = '0' + min
            let miao = Math.floor(this.musiclong%60)
            if((miao/10)<1) miao = '0' + miao
            this.musicTime = min + ':' + miao
            // 请求接口获取该音乐的具体信息
            axios.post('/api/song/detail?ids=' + this.playMusic.musicId,{
                id: this.playMusic.musicId
            }).then((res)=>{
                console.log(res.data.songs[0])
                this.playMusic.musicName = res.data.songs[0].name
                this.playMusic.img = res.data.songs[0].al.picUrl
                this.playMusic.i = this.$store.state.user.playMusic.i
                let info = res.data.songs[0].ar
                this.playMusic.write = info[0].name
                for(let i = 1;i < info.length; i ++){
                    this.playMusic.write = this.playMusic.write + '/' + info[i].name
                }
            })
        },
        // 点击播放上一首音乐
        musicUp(){
            if(this.playMusic.i === 0){
                this.playMusic.i = this.playList.length - 1
                this.changeMusic1(this.playMusic.i, 'up')
            }
            else{
                this.playMusic.i -= 1
                this.changeMusic1(this.playMusic.i, 'up')
            }
        },
        // 点击播放下一首音乐
        musicBottom(){
            if(this.playMusic.i === this.playList.length - 1){
                this.playMusic.i = 0
                this.changeMusic1(this.playMusic.i, 'bottom')
            }
            else{
                this.playMusic.i += 1
                this.changeMusic1(this.playMusic.i, 'bottom')
            }
        },
        changeMusic1(i,is){
            const that = this
            axios.post('/api/song/url?id=' + this.playList[i].id).then((res)=>{
                console.log(res)
                if(res.data.data[0].url == null){
                    if(is == 'up')
                        that.musicUp()
                    else if(is == 'bottom')
                        that.musicBottom()
                }
                else
                    this.changeMusic(i)
            })
        },
        // 切换上一首或者下一首的id发送给listen父级，进行播放
        changeMusic(i){
            this.playMusic.musicId = this.playList[i].id
            this.setInfo()
            axios.post('/api/song/detail?ids=' + this.playList[i].id,{
                id: this.playList[i].id
            }).then((res)=>{
                // console.log(res.data.song[0])
                this.playMusic.musicName = res.data.songs[0].al.name
                this.playMusic.img = res.data.songs[0].al.picUrl
                let info = res.data.songs[0].ar
                this.playMusic.write = info[0].name
                for(let i = 1;i < info.length; i ++){
                    this.playMusic.write = this.playMusic.write + '/' + info[i].name
                }
                this.$emit('listengetid',this.playMusic.musicId, this.playMusic.img, this.playMusic.musicName, this.playMusic.i,res.data.songs[0].dt)
                this.setInfo()
            })
        },
        // 顺序播放
        nextMusic(){
            this.listenType = '1'
            this.$store.state.user.listenType = '1'
            Toast('顺序播放')
        },
        // 单曲循环
        oneMusic(){
            this.listenType = '3'
            this.$store.state.user.listenType = '3'
            Toast('单曲循环')
        },
        // 随机播放
        randomMusic(){
            this.listenType = '2'
            this.$store.state.user.listenType = '2'
            Toast('随机播放')
        }
    }
}
</script>

<style lang="">
.icon {
    font-size: 0.5rem;
    float: left;
    line-height: 1rem;
}
.topName {
    line-height: 1.2rem;
    font-size: 0.4rem;
    clear: both;
    margin-left: -0.5rem;
}
.musicImg1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left:0rem;
    width: 8.5rem;
    height: 8.5rem;
    border: 0.7rem solid black;
    border-radius: 50%;
}
.musicImage1{
    animation:rotate1 20s linear 0.2s infinite;
    -webkit-animation:rotate1 20s linear 0.2s infinite;
}
@keyframes rotate1{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.show1{
    font-size:1.7rem;
    line-height:1.2rem;
    margin-right: 0.5rem;
}
.show2{
    font-size:1.7rem;
    line-height:1.2rem;
    margin-right: 0.5rem;
}
.fa{
    font-size:0.5rem;
}
</style>