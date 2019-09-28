<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">历史记录</span>
        </div>
        <div style="clear: both;">
            <li :class="mlist1 === item ? 'playMlist' : 'mlist'" @click="getmusics(li, item)" v-for="(li ,item) in listenHistory" :key="item">
                <span class="musicName" style="margin-right:0.2rem;">{{li.name}}</span>
                <span style="margin-left:0.2rem;line-height:1.2rem;">{{li.ar[0].name}} - {{ li.al.name }}</span>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userId: '',
            listenHistory: [

            ],
            mlist1: Number
        }
    },
    mounted() {
        this.userId = this.$route.query.id
        this.getHistory()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getHistory(){
            axios.post('/api/user/record?uid=' + this.userId).then((res)=>{
                console.log(res)
                let arry = []
                for(let i = 0;i < res.data.weekData.length;i ++){
                    arry.push(res.data.weekData[i].song)
                }
                this.listenHistory = arry
            })
        },
        getmusics(li, item){
            axios.post('/api/song/detail?ids=' + li.id).then((res)=>{
                this.mlist1 = item
                this.$store.dispatch('setPlayList', this.listenHistory)
                this.$store.dispatch('setlistId', 0)
                this.$emit('getid',li.id,res.data.songs[0].al.picUrl,res.data.songs[0].name, item, res.data.songs[0].dt)
            })
        },
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
</style>