<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">歌手描述</span>
        </div>
        <div style="height:5.5rem;background: rgba(51,51,51);">
            <div style="width:100%;height:3rem;">
                <img style="height:2.5rem;margin-top: 0.5rem;" :src="picUrl" alt="">
            </div>
            <div style="width:100%;height:1.5rem;">
                <span style="color: white;line-height:1rem;">{{ singerName }}</span>
            </div>
            <ul style="width: 100%;height: 1rem;border: 1px solid black;">
                <li @click="goIt(1)" :class="choise == '1' ? 'singerit' : 'singerChoise'">单曲</li>
                <li @click="goIt(2)" :class="choise == '2' ? 'singerit' : 'singerChoise'">专辑</li>
                <li @click="goIt(3)" :class="choise == '3' ? 'singerit' : 'singerChoise'">MV</li>
                <li @click="goIt(4)" :class="choise == '4' ? 'singerit' : 'singerChoise'">详情</li>
            </ul>
        </div>
        <div>
            <div v-if="choise == '1'" style="margin-bottom: 1.2rem;">
                <li :class="mlist === item ? 'playMlist' : 'mlist'" @click="getmusics(li, item)" v-for="(li ,item) in singerMusic" :key="item">
                    <span class="musicName" style="margin-right:0.2rem;">{{li.name}}</span>
                    <span style="margin-left:0.2rem;line-height:1.2rem;" v-for="(name, item1) in li.ar" :key="item1">{{ name.name }}</span>
                </li>
            </div>
            <div v-if="choise == '2'" style="margin-bottom: 1.2rem;">
                <li class="users" v-for="(spec, item) in singerSpecial" :key="item">
                    <div style="height: 100%;width: 15%;float:left;">
                        <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  v-lazy="spec.picUrl" alt="">
                    </div>
                    <div style="height: 100%;width: 80%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                        <div style="clear: both;height: 0.8rem;width: 80%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ spec.name }}</div>
                        <div style="clear: both;height: 0.6rem;width:80%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ spec.artists[0].name }}</div>
                    </div>
                </li>
            </div>
            <div v-if="choise == '3'" style="margin-bottom: 1.2rem;">
                 <li @click="playMV(likes.id)" class="likesMV" v-for="(likes, item) in singerMV" :key="item">
                    <div style="float:left;width: 36%;height: 100%;">
                        <img style="height:96%;margin-top: 2%;width: 94%;" v-lazy="likes.imgurl16v9" alt="">
                    </div>
                    <div style="word-wrap: break-word;word-break: break-all;float: left;width: 62%;height: 100%;text-align: left;overflow: hidden;padding-top: 0.5rem;padding-right: 0.3rem;">
                        {{ likes.name }}
                    </div>
                </li>
            </div>
            <div v-if="choise == '4'" style="margin-bottom: 1.2rem;background: rgb(245,245,245)">
                <div style="text-align: left;line-height: 0.6rem;font-size: 0.3rem;width: 96%;margin-left: 2%;min-height:2rem;">
                    <p style="border-left: 5px solid orange;padding-left: 0.2rem;margin-bottom: 0.2rem;margin-top: 0.2rem;">歌手信息</p>
                    {{ singerintroduct }}
                </div>
                <div v-for="(info, item) in singerInfo" :key="item" style="text-align: left;line-height: 0.6rem;font-size: 0.3rem;width: 96%;margin-left: 2%;min-height:2rem;">
                    <p style="border-left: 5px solid orange;padding-left: 0.2rem;margin-bottom: 0.2rem;margin-top: 0.2rem;">{{ info.ti }}</p>
                    {{ info.txt }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
    data() {
        return {
            singerId: '',
            singerName: '',
            picUrl: '',
            // 选择歌手-单曲，专辑，mv，和详细信息
            choise: '1',
            // 播放的音乐，颜色变化
            mlist: '',
            singerMusic: [],
            singerSpecial: [],
            singerMV: [],
            singerInfo: [],
            singerintroduct: ''
        }
    },
    mounted() {
        this.singerId = this.$route.query.id
        this.picUrl = this.$route.query.img
        this.singerName = this.$route.query.name
        this.getSingerInfo()
        this.getColor()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getSingerInfo(){
            axios.post('/api/artists?id=' + this.singerId).then((res)=>{
                console.log(res)
                this.singerMusic = res.data.hotSongs
            })
        },
        goIt(item){
            this.choise = item
            if(this.choise == 2 && this.singerSpecial.length == 0){
                axios.post('/api/artist/album?id=' + this.singerId + '&limit=30').then((res)=>{
                    console.log(res)
                    this.singerSpecial = res.data.hotAlbums
                })
            }
            else if(this.choise == 3 && this.singerMV.length == 0){
                axios.post('/api/artist/mv?id=' + this.singerId).then((res)=>{
                    console.log(res)
                    this.singerMV = res.data.mvs
                })
            }
            else if(this.choise == 4 && !this.singerintroduct){
                axios.post('/api/artist/desc?id=' + this.singerId).then((res)=>{
                    console.log(res)
                    this.singerintroduct = res.data.briefDesc
                    this.singerInfo = res.data.introduction
                })
            }
        },
        // 点击音乐进行播放
        getmusics(li, item){
            axios.post('/api/song/detail?ids=' + li.id,{
                id: li.id
            }).then((res)=>{
                this.mlist = item
                this.$store.dispatch('setPlayList', this.singerMusic)
                this.$store.dispatch('setlistId', this.singerId)
                this.$emit('getid',li.id,res.data.songs[0].al.picUrl,res.data.songs[0].name, item, res.data.songs[0].dt)
            })
        },
        // 获取正在播放歌曲的索引i，以此来设置正在播放音乐的高亮
        getColor(){
            let i = this.$store.state.user.playMusic.i
            let id = this.$store.state.user.listId
            console.log("正在播放的索引",i)
            if(i !== null && this.singerId == id){
                this.mlist = i
            }
        },
        // 播放MV
        playMV(id){
            this.$router.push({path:'/playMV',query:{id: id}})
        },
    },
}
</script>

<style lang="">
.iconmusicList {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}
.singerChoise {
    width: 25%;
    height: 100%;
    float: left;
    color: rgb(200,200,200);
    text-align: center;
    line-height: 1rem;
    font-size: 0.4rem;
}
.singerit {
    width: 25%;
    height: 100%;
    float: left;
    color: white;
    text-align: center;
    line-height: 1rem;
    font-size: 0.4rem;
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
.musicName{
    font-size: 0.4rem;
    line-height: 1rem;
}
.likesMV {
    width: 100%;
    height: 2rem;
    list-style: none;
}
</style>