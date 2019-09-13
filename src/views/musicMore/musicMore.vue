<template>
    <div style="width:100%;"  @touchmove.prevent>
        <div style=";background: #FF0033;overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="icon" />
            <span class="topName">{{ playMusic.musicName }}</span>
        </div>
        <p>{{ playMusic.write }}</p>
        <div ref="border" style="height:10.8rem;width:100%;overflow-x:hidden;overflow-y:scroll;text-align:center;">
            <div v-if="img" style="width:100%;">
                <div v-if="!playMusic.img" class="musicImage1"></div>
                <img v-if="playMusic.img" :class="showImg === false ? 'musicImg1 musicImage1' : 'musicImg1'" :src="playMusic.img" alt="">
            </div>
            <div v-if="!img" style="padding-bottom:6rem;padding-top:6rem;width:100%">
                <li v-for="(ric, item) in lyric" :key="item" :class="ricGreen !== item ? 'lyric' : 'lyric ricgreen'">
                    {{ ric.ric }}
                </li>
            </div>
        </div>
        <div style="position:fixed;bottom:0rem;width:100%;padding-bottom:0.8rem;">
            <div style="overflow:hidden;">
                <div style="float:left;line-height:1.2rem;margin-left:1.5rem;">
                    <i @click="nextMusic" v-if="listenType == '2'" class="fa fa-random" ></i>
                    <i @click="oneMusic" v-if="listenType == '1'" class="fa fa-refresh" ></i>
                    <i @click="randomMusic" v-if="listenType == '3'" class="fa fa-undo" ></i>
                </div>
                <div style="float:left;line-height:1.2rem;margin-left:1.4rem;">
                    <van-icon @click="changeShow" class="loveLogo" name="like-o" />
                    <van-action-sheet
                    v-model="show"
                    :actions="List"
                    @select="onSelect"
                    title="收藏音乐到"
                    />
                    
                </div>
                <span @click="geci" style="font-size:0.5rem;line-height: 1.2rem;display:inline-block;height:0.6rem;width:0.6rem;float:left;margin-left:1.4rem;">词</span>
                <div style="float:left;line-height:1.2rem;margin-left:1.4rem;">
                    <van-icon @click="goComment" class="loveLogo" name="chat-o" />
                </div>
            </div>
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
                <van-icon @click="musicUp" class="show2" name="arrow-left" />
                <van-icon v-if="audio.playShow" @click="playAudio" class="show1" name="play-circle-o" />
                <van-icon v-if="!audio.playShow" @click="pauseAudio" class="show1" name="pause-circle-o" />   
                <van-icon class="show2" @click="musicBottom" name="arrow" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';
import BScroll from 'better-scroll'

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
            // 是否显示选择器
            show:false,
            // 获取歌单列表
            List:[],
            // 显示歌曲图片或者歌词
            img:true,
            lyric:[],
            ricGreen:0,
            px:''
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
            if(!this.img)
            this.updateLyric(newlong)
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
            if(img)
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
            if(img)
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
            // 更新歌词时长
            this.musiclong = this.$store.state.user.playMusic.musicLong / 1000
            let min = Math.floor(this.musiclong/60)
            if((min/10)<1) min = '0' + min
            let miao = Math.floor(this.musiclong%60)
            if((miao/10)<1) miao = '0' + miao
            this.musicTime = min + ':' + miao
            this.lyric = []
            // 更新歌词
            axios.post('/api/lyric?id=' + this.playMusic.musicId).then((res)=>{
                if(res.data.lrc){
                    let geci = res.data.lrc.lyric.split("[");
                    let y = 0
                    for(let i = 0;i < geci.length;i ++){
                        let timeci = geci[i].split(']')
                        if(timeci[0] == '' || timeci[0] =='by:GoodTM' || timeci[1] == `
`)
                            continue
                        this.lyric[y] = {
                            time: timeci[0],
                            ric: timeci[1]
                        }
                        y ++
                    }
                    console.log(this.lyric,"分好后的歌词对象数组")
                }
                else{
                    this.img = true
                    Toast('暂无歌词')
                }
            })
        },
        // 初始化播放音乐的信息
        writeInfo(){
            let list = this.$store.state.user.musicInfo.playlist
            console.log(list)
            for(let i = 0;i < list.length;i ++){
                if(list[i].userId == this.$store.state.user.userId){
                    this.List[i] = {
                        name: list[i].name,
                        item: list[i].id
                    }
                }
            }
            this.listenType = this.$store.state.user.listenType
            if(!this.$store.state.user.listenType){
                this.listenType = '1'
                this.$store.state.user.listenType = '1'
            }
            // 获取音乐id，歌单列表，音乐的时间
            this.playMusic.musicId = this.$store.state.user.playMusic.musicId
            if(!this.playMusic.musicId) this.$router.push({path:'/'})
            this.playList = this.$store.state.user.playList
            this.setInfo()
            // 请求接口获取该音乐的具体信息
            axios.post('/api/song/detail?ids=' + this.playMusic.musicId,{
                id: this.playMusic.musicId
            }).then((res)=>{
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
            axios.post('/api/song/url?id=' + this.playList[i].id).then(function(res){
                console.log(res)
                if(res.data.data[0].url == null){
                    if(is == 'up')
                        that.musicUp()
                    else if(is == 'bottom')
                        that.musicBottom()
                }
                else
                    that.changeMusic(i)
            })
        },
        // 切换上一首或者下一首的id发送给listen父级，进行播放
        changeMusic(i){
            this.playMusic.musicId = this.$store.state.user.playList[i].id
            console.log(this.playList[i].id)
            console.log(i)
            axios.post('/api/song/detail?ids=' + this.playList[i].id,{
                id: this.playList[i].id
            }).then((res)=>{
                // console.log(res.data.song[0])
                this.playMusic.musicName = res.data.songs[0].name
                this.playMusic.img = res.data.songs[0].al.picUrl
                let info = res.data.songs[0].ar
                this.playMusic.write = info[0].name
                for(let i = 1;i < info.length; i ++){
                    this.playMusic.write = this.playMusic.write + '/' + info[i].name
                }
                this.$emit('listengetid',this.playMusic.musicId, this.playMusic.img, this.playMusic.musicName, i,res.data.songs[0].dt)
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
        },
        changeShow(){
            this.show = true
        },
        //  将歌曲添加到歌单
        onSelect(item){
            this.show = false;
            axios.post('/api/playlist/tracks?op=add&pid=' + item.item + '&tracks=' + this.playMusic.musicId).then((res)=>{
                console.log(res)
                Toast("收藏成功");
            }).catch((error)=>{
                Toast("收藏失败")
            })
        },
        //  根据播放进度来调整歌词高亮
        updateLyric(long){
            for(let i = 0;i < this.lyric.length;i ++){
                let time1 = this.lyric[i].time.split(':')
                let start = parseInt(time1[0]) * 60 + parseInt(time1[1])
                // console.log(start,"开始时间")
                // console.log(long)
                let y,time2,end
                if(i == (this.lyric.length - 1)){
                    end = 10000000
                }
                else{
                    y = i + 1
                    time2 = this.lyric[y].time.split(':')
                    end = parseInt(time2[0]) * 60 + parseInt(time2[1])
                }
                // console.log(end, "结束时间")
                if(long > start && long < end && start != this.px){
                    this.px = start
                    this.ricGreen = i
                    let scroll = document.getElementsByClassName('lyric')[i]
                    this.scroll.scrollToElement(scroll, 700, true,true)
                }
            }

        },
        geci(){
            if(this.img == true){
                this.img = false
                if(!this.scroll)
                this.scroll = new BScroll(this.$refs.border, {
                    scrolly:true,
                    click: this.click,
                    bounce: {
                        top: true,
                        bottom: true,
                    },
                    stopPropagation: true
                })
            }
            else this.img = true
        },
        goComment(){
            this.$router.push({path:'/musicComment',query:{playMusic:this.playMusic}})
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
    line-height: 1rem;
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
    font-size:1.2rem;
    line-height:1.2rem;
    margin-right: 0.5rem;
}
.show2{
    font-size:1.2rem;
    line-height:1.2rem;
    margin-right: 0.5rem;
}
.fa{
    font-size:0.6rem;
    line-height:1.2rem;
}
.loveLogo{
    font-size: 0.6rem;
    color: rgb(100, 100, 100);
    line-height: 1.2rem;
}
.lyric {
    list-style: none;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.4rem;
}
.ricgreen {
    color: #65D25B;
}
</style>