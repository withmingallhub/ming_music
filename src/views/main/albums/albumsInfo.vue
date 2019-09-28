<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">{{ albumInfo.name }}</span>
        </div>

        <div style="height:5rem;background: rgba(51,51,51);">
            <div style="width:100%;height:3rem;">
                <img style="width:2.5rem;width:2.5rem;" :src="albumInfo.blurPicUrl" alt="">
                <br>
                <van-icon @click="loveItno" v-if="loveIt" class="loveAlbum" name="like-o" />    
                <van-icon @click="loveItAlbum" v-if="!loveIt" class="unloveAlbum" name="like" />
            </div>
            <br>
            <div style="width:100%;height:1.5rem;">
                <span style="color: white;line-height:1rem;">{{ albumInfo.artist.name }}</span>
            </div>
        </div>
        <ul style="width: 100%;background: rgb(51,51,51);height: 0.8rem;border-top: 1px solid black;">
            <li @click="changeMusicColor()" :class="music ? 'changeAlbum light' : 'changeAlbum'">作品</li>
            <li @click="changeMusicInfo()" :class="!music ? 'changeAlbum light' : 'changeAlbum'">专辑详情</li>
        </ul>
        <div v-if="music" style="margin-bottom:1rem;clear: both;">
            <li :class="mlist1 === item ? 'playMlist' : 'mlist'" @click="getmusics(album, item)" v-for="(album ,item) in albums" :key="item">
                <span class="musicName" style="margin-right:0.2rem;">{{album.name}}</span>
                <span style="margin-left:0.2rem;line-height:1.2rem;" v-for="(name, item1) in album.ar" :key="item1">{{ name.name }}</span>
            </li>
        </div>
        <div v-if="!music" style="width: 100%;margin-bottom:1rem;clear: both;">
            <div style="width: 92%;height: 0.5rem;border-left: 0.15rem solid rgb(255,0,51);text-align: left;margin-left: 4%;line-height: 0.5rem;margin-top: 0.2rem;">
                专辑介绍：
            </div>
            <div style="width: 92%;margin-left: 4%;text-align: left;margin-top: 0.2rem;">
                {{ albumInfo.description }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';

export default {
    data() {
        return {
            albumId: '',
            // 正在播放音乐名称高亮的索引
            mlist1:'',
            albumInfo: {
                artist: ''
            },
            // 歌单列表信息
            albums: [],
            music: true,
            loveIt: Boolean
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
        this.albumId = this.$route.query.id
        this.getalbumsInfo()
        this.getColor()
        this.getLoveIt()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getalbumsInfo(){
            axios.post('/api/album?id=' + this.albumId).then((res)=>{
                console.log(res)
                this.albumInfo = res.data.album
                this.albums = res.data.songs
            })
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
        // 向父级组件传递点击歌曲的id，这个id是歌曲id,并且将正在播放音乐的列表存在vuex中
        getmusics(li, item){
            axios.post('/api/song/url?id=' + li.id,{
                id: li.id
            }).then((res)=>{
                if(!res.data.data[0].url)
                Toast('暂无版权，或权限不足')
                else{
                    this.$store.dispatch('setPlayList', this.albums)
                    this.$store.dispatch('setlistId', this.albumId)
                    this.mlist1 = item
                    this.$emit('getid',li.id,li.al.picUrl,li.name, item, li.dt)
                }
            })
        },
        // 是否收藏了该专辑
        getLoveIt(){
            axios.post('/api/album/detail/dynamic?id=' + this.albumId).then((res)=>{
                console.log(res)
                this.loveIt = res.data.isSub
            })
        },
        changeMusicColor(){
            this.music = true
        },
        changeMusicInfo(){
            this.music = false
        },
        // 取消收藏
        loveItno(){
            axios.post('/api/album/sub?id=' + this.albumId + '&t=1').then((res)=>{
                console.log(res)
            }).catch((error)=>{
                Toast('该接口不可访问！')
            })
        },
        // 收藏该专辑
        loveItAlbum(){
            axios.post('/api/album/sub?id=' + this.albumId + '&t=0').then((res)=>{
                console.log(res)
            }).catch((error)=>{
                Toast('该接口不可访问！')
            })
        }
    },
}
</script>

<style scoped>
.iconmusicList {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}
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
.users {
    list-style: none;
    height: 1.4rem;
    overflow: hidden;
}
.unloveAlbum {
    color: white;
    font-size: 0.6rem;
    float: right;
    margin-right: 0.4rem;
}
.loveAlbum {
    color: rgb(255,0,51);
    font-size: 0.6rem;
    float: right;
    margin-right: 0.4rem;
}
.changeAlbum{
    height: 0.8rem;
    width: 30%;
    color: rgb(200, 200, 200);
    float: left;
    line-height: 0.8rem;
}
.light {
    color: white;
}
</style>