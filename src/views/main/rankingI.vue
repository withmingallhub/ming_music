<template>
    <div>
        <div style="border-top: 1px solid rgb(200,200,200);background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconRankingList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">{{ ranking.name }}</span>
        </div>
        <div style="margin-bottom: 1.2rem;">
            <li :class="mlist1 === item ? 'playMlists' : 'mlists'" @click="getmusics(li, item)" v-for="(li ,item) in rankingList" :key="item">
                <div class="musicNames" style="margin-right:0.2rem;">{{li.name}}</div>
                <div style="margin-left:0.2rem;width:70%;height:0.5rem;font-size:10%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">{{li.ar[0].name}} - {{ li.al.name }}</div>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            ranking: {
                item: '',
                name: '',
            },
            listId:'',
            rankingList: [],
            // 播放的音乐
            mlist1:Number,
        }
    },
    mounted() {
        this.ranking.item = this.$route.query.item
        this.getRankingList()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getRankingList(){
            axios.post('/api/top/list?idx=' + this.ranking.item).then((res)=>{
                console.log(res)
                this.ranking.name = res.data.playlist.name
                this.rankingList = res.data.playlist.tracks
                this.listId = res.data.playlist.id
                this.getColor()
            })
        },
        getmusics(li, item){
            axios.post('/api/song/detail?ids=' + li.id,{
                id: li.id
            }).then((res)=>{
                this.mlist1 = item
                this.$store.dispatch('setPlayList', this.rankingList)
                this.$store.dispatch('setlistId', this.listId)
                this.$emit('getid',li.id,res.data.songs[0].al.picUrl,res.data.songs[0].name, item, res.data.songs[0].dt)
            })
        },
        // 获取正在播放歌曲的索引i，以此来设置正在播放音乐的高亮
        getColor(){
            let i = this.$store.state.user.playMusic.i
            let id = this.$store.state.user.listId
            console.log("正在播放的索引",i)
            if(i !== null && id == this.listId){
                this.mlist1 = i
            }
        }
    },
}
</script>

<style lang="">
.iconRankingList {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}
.playMlists{
    list-style: none;
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    text-align:left;
    padding-left: 0.3rem;
    color: #65D25B;
    border-top: 1px solid rgb(230,230,230);
    background: rgb(245, 245, 245);
    border-left: 2px solid #65D25B;
}
.mlists{
    list-style: none;
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    text-align:left;
    padding-left: 0.3rem;
    border-top: 1px solid rgb(230,230,230);
    border-left: 2px solid white;
}
.musicNames{
    width: 70%;
    font-size: 0.4rem;
    line-height: 0.8rem;
    height:0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
}
</style>