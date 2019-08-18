
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
    },
    methods: {
        updateTime(e){
            this.currentTime = e.target.currentTime;    // 获取当前播放时间段
        },
        // 当这个音乐播放完毕，根据播放类型，选择‘单曲循环’，‘列表循环’，‘随机播放’
        audioEnd(){
            if(this.$store.state.user.playList[0].al){
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
            }
            else this.oneMusic()

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
            let i = parseInt(Math.random()*long)
            if(i != this.listen.i){
                this.listen.i = i
                this.changeMusic1(this.listen.i, 'random')
            }
            else this.randomMusic()
        },
        changeMusic1(i,is){
            const that = this
            axios.post('/api/song/url?id=' + that.playList[i].id).then(function(res){
                if(res.data.data[0].url == null){
                    if(is == 'bottom')
                        that.nextMusic()
                    else if(is == 'random')
                        that.randomMusic()
                }
                else
                    // this.updateMus(this.playList[i].id, this.playList[i].al.picUrl, this.playList[i].name, i,this.playList[i].dt)
                    
                    that.listen.musicId = that.playList[i].id
                    that.listen.musicPic = that.playList[i].al.picUrl
                    that.listen.musicName = that.playList[i].name
            })
        },
        // 获取音乐信息，并且存入vuex，
        updateMus(id ,url, name, item, dt){
            const that = this
            let picName = {
                picUrl: url,
                musicName: name,
                musicId: id,
                i:item,
                musicLong: dt
            }
            that.$store.dispatch('setPlayMusic',picName)
            axios.post('/api/song/url?id=' + id,{
                id: id
            }).then(function(res){
                if(res.data.data[0].url == null)
                Toast('获取音乐失败，可能暂无版权')
                else{
                    that.listen.url = res.data.data[0].url
                    that.listen.i = item
                    that.listen.musicName = name
                    that.listen.musicId = id
                }
            })
        }
    },
}
</script>