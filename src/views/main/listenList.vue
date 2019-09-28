<template>
    <div>
        <!-- 更新歌单名称 -->
        <van-dialog
        v-model="show"
        title="更新歌单名称"
        show-cancel-button
        @confirm="updateName"
        >
            <van-cell-group>
                <van-field v-model="top" placeholder="歌单名称" />
            </van-cell-group>
        </van-dialog>
        <!-- 删除歌曲 -->
        <van-dialog
        v-model="deleteList"
        title="确认删除该歌曲？"
        show-cancel-button
        @confirm="deleteMusic"
        >
        </van-dialog>

        <!-- 歌单内容 -->
        <div style="background: rgba(51,51,51);overflow:hidden;height:1.2rem;text-align:center;">
            <van-icon @click="goMain" name="arrow-left" class="iconlist" />
            <span class="topNamelisten">{{ top }}</span>
        </div>
        <div style="height:5rem;background: rgba(51,51,51);">
            <div style="width:100%;height:3rem;">
                <img style="width:2.5rem;width:2.5rem;" :src="listImg" alt="">
                <p @click="writeName" v-if="userId == creatorId" style="color: white;">编辑歌单</p>
                <van-icon @click="loveItList" v-if="userId != creatorId && !subscribed" class="unlove" name="like-o" />
                <van-icon @click="loveNoList" v-if="userId != creatorId && subscribed" class="loveList" name="like" />
            </div>
            <div style="width:100%;height:1.5rem;">
                <span style="color: white;line-height:1rem;">创建人:</span>
                <span style="color: white;line-height:1rem;">{{ nickname }}</span>
                <img style="width:1rem;height: 1rem;border-radius:50%;position: relative;top: 0.4rem;" :src="userImg" alt="">
            </div>
        </div>
        <div style="margin-bottom:1rem;">
            <li @touchstart="startdele(li.id)" @touchend="enddele" @touchmove="enddele" :class="mlist1 === item ? 'playMlist' : 'mlist'" @click="getmusics(li, item)" v-for="(li ,item) in list" :key="item">
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
            listImg: '',
            userImg:'',
            creatorId: '',
            userId: '',
            nickname:'',
            //是否收藏
            subscribed: '',
            show: false,
            deleteList: false,
            deleteId: ''

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
    mounted() {
        // mounted完成获取歌单名称top，以及歌单id
        this.id = this.$route.query.id
        this.top = this.$route.query.top
        this.getuserInfo()
        this.getMusic()
        this.getColor()
    },
    methods: {
        getuserInfo(){
            axios.post('/api/login/status').then((res)=>{
                this.userId = res.data.profile.userId
            })
        },
        // mounted进行请求，获取歌曲列表每首歌曲信息,这个发送的id是歌单id
        getMusic(){
            axios.post('/api/playlist/detail?id=' + this.id + '&timestamp=' + Math.random()*100,{
                id: this.id
            }).then((res)=>{
                console.log(res)
                this.list = res.data.playlist.tracks
                this.listImg = res.data.playlist.coverImgUrl
                this.nickname = res.data.playlist.creator.nickname
                this.userImg = res.data.playlist.creator.avatarUrl
                this.creatorId = res.data.playlist.creator.userId
                this.subscribed = res.data.playlist.subscribed
                console.log(res)
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
            history.go(-1)
        },
        // 获取正在播放歌曲的索引i，以此来设置正在播放音乐的高亮
        getColor(){
            let i = this.$store.state.user.playMusic.i
            let id = this.$store.state.user.listId
            console.log("正在播放的索引",i)
            if(i !== null && id == this.id){
                this.mlist1 = i
            }
        },
        // 点击收藏这个歌单
        loveItList(){
            axios.post('/api/playlist/subscribe?t=1&id=' +this.id).then((res)=>{
                console.log('收藏成功',res)
                if(res.data.code == 200){
                    Toast('收藏成功！')
                    this.subscribed = true    
                }
            })
        },
        //取消收藏歌单
        loveNoList(){
            axios.post('/api/playlist/subscribe?t=2&id=' + this.id).then((res)=>{
                console.log('取消成功',res)
                if(res.data.code == 200){
                    Toast('取消收藏成功！')
                    this.subscribed = false
                }
            })
        },
        writeName(){
            this.show = true
        },
        updateName(){
            axios.post('/api/playlist/name/update?id=' + this.id + '&name=' + this.top).then((res)=>{
                console.log(res)
                this.show = false
            })
        },
        deleteMusic(){
            axios.post('/api/playlist/tracks?op=del&pid=' + this.id + '&tracks=' + this.deleteId).then((res)=>{
                console.log(res)
                if(res.data.code == 200) Toast('删除成功！')
            })
        },
        // 开始按下去的时候设置定时器，定时器开始计时
        startdele(id){
            var that = this
            console.log('开始')
            clearTimeout(this.timer);
            this.timer = window.setTimeout(function(){
                that.deleteList = true
                that.deleteId = id
            },600);//这里设置定时
        },
        // 进行滑动或者手指拿开清除定时器
        enddele(){
            console.log('结束')
            clearTimeout(this.timer);
        },
    },
}
</script>

<style scoped>
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
.iconlist{
    font-size: 0.5rem;
    float: left;
    color: white;
    line-height: 1.2rem;
}
.users {
    list-style: none;
    height: 1.4rem;
    overflow: hidden;
}
.topNamelisten{
    color: azure;
    line-height: 1.2rem;
    font-size: 0.4rem;
    clear: both;
    margin-left: -0.4rem;
}
.unlove {
    color: white;
    font-size: 0.6rem;
    float: right;
    margin-right: 0.4rem;
}
.loveList {
    color: rgb(255,0,51);
    font-size: 0.6rem;
    float: right;
    margin-right: 0.4rem;
}
</style>