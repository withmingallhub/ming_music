<template>
    <div>
        <van-popup 
        v-model="show"
        position="left"
        :style="{height: '100%',width: '7rem'}"
        >
            <div :style="{height: '5rem',border:'1px solid black',backgroundImage: 'url(' + userInfo.profile.backgroundUrl + ')'}">
                <img @click="changeInfo" :src="userInfo.profile.avatarUrl" style="height: 2rem;width:2rem;border-radius: 50%;margin-top: 0.5rem;margin-left: 0.3rem;" alt="">
                <br>
                <br>
                <br>
                <span style="color: white">{{ userInfo.profile.nickname }}</span>
            </div>
            <div @click="goMyInfo" style="height:1rem;width: 100%;border:1px solid rgb(177,177,177);">
                <span style="font-size； 0.4rem;float:left;line-height: 1rem;margin-left: 0.3rem;">
                    <span style="color:rgb(177,177,177);"><van-icon name="eye" /></span>
                    我的信息
                </span>
            </div>
            <div @click="goMyLove" style="height:1rem;width: 100%;border:1px solid rgb(177,177,177);">
                <span style="font-size； 0.4rem;float:left;line-height: 1rem;margin-left: 0.3rem;">
                    <span style="color:rgb(177,177,177);"><van-icon name="like" /></span>
                    我的关注
                </span>
            </div>
            <div @click="goNewInfo" style="height:1rem;width: 100%;border:1px solid rgb(177,177,177);">
                <span style="font-size； 0.4rem;float:left;line-height: 1rem;margin-left: 0.3rem;">
                    <span style="color:rgb(177,177,177);"><van-icon name="chat" /></span>
                    我的消息
                </span>
            </div>
            <div @click="goHistory" style="height:1rem;width: 100%;border:1px solid rgb(177,177,177);">
                <span style="font-size； 0.4rem;float:left;line-height: 1rem;margin-left: 0.3rem;">
                    <span style="color:rgb(177,177,177);"><van-icon name="underway-o" /></span>
                    播放记录
                </span>
            </div>
            <div @click="refresh" style="height:1rem;width: 100%;border:1px solid rgb(177,177,177);">
                <span style="font-size； 0.4rem;float:left;line-height: 1rem;margin-left: 0.3rem;">
                    <span style="color:rgb(177,177,177);"><van-icon name="share" /></span>
                    刷新登陆
                </span>
            </div>
            <div @click="goOut" style="height:1rem;width: 100%;border:1px solid rgb(177,177,177);">
                <span style="font-size； 0.4rem;float:left;line-height: 1rem;margin-left: 0.3rem;">
                    <span style="color:rgb(177,177,177);"><van-icon name="like" /></span>
                    退出登录
                </span>
            </div>
        </van-popup>
        <div class="Top">
            <img @click="popup" :src="userInfo.profile.avatarUrl" style="height: 1rem;width:1rem;border-radius: 50%;float:left;margin-top: 0.1rem;margin-left: 0.3rem;" alt="">
            
            <van-icon @click="search" class="search" name="search" />

            <van-icon @click="changeTop('0')" :class="topIcon == 0 ? 'isIt' : 'topchange'" name="music-o" />
            <van-icon @click="changeTop('1')" :class="topIcon == 1 ? 'isIt' : 'topchange'" name="service-o" />
            <van-icon @click="changeTop('2')" :class="topIcon == 2 ? 'isIt' : 'topchange'" name="video-o" />
        </div>
        <div style="min-height:10rem;width:100%;margin-top:1.2rem;">
            <router-view @getid="updateMusic" :updateone="changeI"></router-view>
        </div>
        <div class="musicVideo" @click="goMusicInfo">
            <div style="width:100%;heigh:100%;" v-if="listen.musicPic">
                <img :class="imgShow === false ? 'musicImg musicImage' : 'musicImg'" :src="listen.musicPic" alt="">
                <span style="float:left;margin-left:0.3rem;line-height:0.8rem;font-size:0.4rem;width:5rem;text-align:left;overflow:hidden;text-overflow: ellipsis;white-space:nowrap;">{{ listen.musicName }}</span>
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
import { Toast } from 'vant';

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
            // img是否转动
            imgShow:false,
            // 用户信息
            userInfo: {
                profile: {
                    avatarUrl:''
                }
            },
            MusicInfo: {

            },
            show: false,
            // 下来的是顶部导航栏
            topIcon: 0
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
            changeI:function (newI, oldI) {
            let list = this.$store.state.user.playList
            if(list[newI].al)
            this.updateMusic(list[newI].id,list[newI].al.picUrl,list[newI].name,newI,list[newI].dt)
        },
    },
    props:{
        changeI:''
    },
    mounted() {
        this.checkLogin()
        this.ifPlay()
    },
    methods:{
        // mounted加载完毕检查登录
        checkLogin(){
            const that = this
            if(this.$route.path == '/MV')
                this.topIcon = '2'
            else if(this.$route.path == '/broadStation')
                this.topIcon = '1'
            else this.topIcon = '0'
            axios.get('/api/login/status').then(function(res){
                that.userId = res.data.profile.userId
                that.$store.dispatch('setUserId',that.userId)
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
            const that = this
            axios.post('/api/user/detail?uid=' + that.userId,{
                uid:that.userId
            }).then(function(res){
                that.$store.dispatch('addnumbers',res.data)
                that.userInfo = that.$store.state.user.userInfo
            })
        },
        musicInfo(){
            const that = this
            axios.post('/api/user/playlist?uid=' + that.userId,{
                uid:that.userId
            }).then(function(res){
                that.$store.dispatch('getMusicIn',res.data)
                that.MusicInfo = that.$store.state.user.musicInfo
            })
        },
        // 是否正在播放音乐，如果是，那么在底部显示
        ifPlay(){
            let audio = document.getElementById('audio')
            if(audio.src){
                this.listen.id = this.$store.state.user.playMusic.musicId
                this.listen.musicPic = this.$store.state.user.playMusic.picUrl
                this.listen.musicName = this.$store.state.user.playMusic.musicName
                if(audio.paused){
                    this.audio.playShow = true
                    this.imgShow = true
                }
                else{
                    this.audio.playShow = false
                }
            }
        },
        // 从歌单中获取现在要播放歌曲的id，并且请求接口获取播放url
        updateMusic(id, url, name, item, dt, djid){
            this.listen.id = id
            if(this.$store.state.user.playMusic.musicId === id){
                this.playAudio()
            }
            else{
                this.listen.musicPic = url
                this.listen.musicName = name
                this.$emit('listengetid',id, url, name, item, dt, djid)
                // 切换音乐图片转动
                this.imgShow = false
                this.runPic()
                this.audio.playShow = false
            }
        },
        // 到播放音乐详细页面，有歌词啥的
        goMusicInfo(){
            if(this.listen.musicPic){
                if(!this.$store.state.user.playMusic.broadId)
                    this.$router.push({path:'/musicMore',query:{musicId:this.listen.id}})
                else 
                    this.$router.push({path:'/playBroad'})
            }
        },
        // 进行播放歌曲
        playAudio(){
            // 从别的页面返回的时候歌曲暂停，点击播放那么需要图片转动
            if(this.imgShow === true)
            this.imgShow = false
            this.runPic()
            this.audio.playShow = false
            let audio = document.getElementById('audio')
            audio.play()
            // 阻止冒泡事件
            window.event.cancelBubble = true
        },
        // 暂停歌曲
        pauseAudio(){
            this.pausePic()
            let audio = document.getElementById('audio')
            audio.pause()
            this.audio.playShow = true
            // 阻止冒泡事件
            window.event.cancelBubble = true
        },
        // 暂停图片动画
        pausePic(){
            let img = document.getElementsByClassName('musicImg')[0]
            img.style.animationPlayState = 'paused'
        },
        // 继续图片动画
        runPic(){
            let img = document.getElementsByClassName('musicImg')[0]
            img.style.animationPlayState = 'running'
        },
        // 侧边弹出层是否出现
        popup(){
            this.show = true
        },
        // 我的信息页面
        changeInfo(){
            this.$router.push({path: '/changeInfo',query:{userId: this.userId}})
        },
        // 搜索
        search(){
            this.$router.push({path: '/search'})
        },
        // 顶部导航栏
        changeTop(item){
            this.topIcon = item
            if(item == 0)
                this.$router.push({path: '/'})
            else if(item == 1)
                this.$router.push({path: '/broadStation'})
            else if(item == 2)
                this.$router.push({path: '/MV'})
        },
        // 前往我的关注
        goMyLove(){
            this.$router.push({path:'/myLove',query:{id: this.userId}})
        },
        goMyInfo(){
            this.$router.push({path: '/loveUserInfo',query:{id: this.userId}})
        },
        goHistory(){
            this.show =false
            this.$router.push({path: '/listenHistory',query:{id: this.userId}})
        },
        refresh(){
            axios.get('/api/login/refresh').then((res)=>{
                if(res.data.code == 200){
                    this.show = false
                    Toast('刷新成功')
                }
            })
        },
        goOut(){
            axios.get('/api/logout').then((res)=>{
                if(res.data.code == 200)
                    this.$router.push({path: '/Login'})
            })
        },
        goNewInfo(){
            this.$router.push({path: '/newInfo',query:{id: this.userId}})
        }
    }
}
</script>

<style scoped>
.Top{
    height: 1.2rem;
    width:100%;
    background: #FF0033;
    position: fixed;
    top:0rem;
    z-index: 1;
}
.topchange {
    color: rgb(220, 220, 220);
    font-size:0.6rem;
    line-height: 1.1rem;
    margin-left:0.3rem;
}
.isIt {
    color: white;
    font-size:0.6rem;
    line-height: 1.1rem;
    margin-left:0.3rem;
}
.search {
    font-size: 0.6rem;
    float:right;
    margin-right:0.5rem;
    line-height:1rem;
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