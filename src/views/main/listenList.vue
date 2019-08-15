<template>
    <div>
        <div style="background:white;overflow:hidden;height:1.2rem;text-align:center;position:fixed;width:100%;">
            <van-icon @click="goMain" name="arrow-left" class="icon" />
            <span class="topName">{{ top }}</span>
        </div>
        <div style="height:1.2rem;">

        </div>
        <div style="margin-bottom:1rem;">
            <li :class="mlist1 === item ? 'playMlist' : 'mlist'" @click="getmusics(li, item)" v-for="(li ,item) in list" :key="item">
                <span class="musicName" style="margin-right:0.2rem;">{{li.name}}</span>
                <span style="margin-left:0.2rem;line-height:1.2rem;" v-for="(name, item1) in li.ar" :key="item1">{{ name.name }}</span>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
    data(){
        return {
            // 歌单id
            id: '',
            // 歌单名称
            top:'',
            // 歌单列表信息
            list: [],
            // 正在播放音乐名称高亮的索引
            mlist1:'',
        }
    },
    watch: {
        updateone: function(newone,oldone){
            this.mlist1 = newone
        }
    },
    props:{
        updateone:''
    },
    methods: {
        // mounted进行请求，获取歌曲列表每首歌曲信息,这个发送的id是歌单id
        getMusic(){
            axios.post('/api/playlist/detail?id=' + this.id,{
                id: this.id
            }).then((res)=>{
                this.list = res.data.playlist.tracks
                console.log(this.list)
            })
        },
        // 向父级组件传递点击歌曲的id，这个id是歌曲id,并且将正在播放音乐的列表存在vuex中
        getmusics(li, item){
            axios.post('/api/song/url?id=' + li.id,{
                id: li.id
            }).then((res)=>{
                if(!res.data.data[0].url)
                Toast('暂无版权，或权限不足')
                else{
                    this.$store.dispatch('setPlayList', this.list)
                    this.$store.dispatch('setlistId', this.id)
                    this.mlist1 = item
                    this.$emit('getid',li.id,li.al.picUrl,li.name, item, li.dt)
                }
            })
        },
        // 点击返回，返回主页
        goMain(){
            this.$router.push({path:'/'})
        },
        // 获取正在播放歌曲的索引i，以此来设置正在播放音乐的高亮
        getColor(){
            let i = this.$store.state.user.playMusic.i
            let id = this.$store.state.user.listId
            console.log("正在播放的索引",i)
            if(i !== null && id == this.id){
                this.mlist1 = i
            }
        }
    },
    mounted() {
        // mounted完成获取歌单名称top，以及歌单id
        this.id = this.$route.query.id
        this.top = this.$route.query.top
        this.getMusic()
        this.getColor()
    },
}
</script>

<style lang="">
.mlist{
    list-style: none;
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    text-align:left;
    padding-left: 0.3rem;
    background: rgb(245, 245, 245);
    border-left: 2px solid white;
}
.playMlist{
    list-style: none;
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    text-align:left;
    padding-left: 0.3rem;
    color: #65D25B;
    background: rgb(245, 245, 245);
    border-left: 2px solid #65D25B;
}
.musicName{
    font-size: 0.4rem;
    line-height: 1rem;
}
.icon{
    font-size: 0.5rem;
    float: left;
    line-height: 1.2rem;
}
.topName{
    line-height: 1.2rem;
    font-size: 0.4rem;
    clear: both;
    margin-left: -1rem;
}
</style>