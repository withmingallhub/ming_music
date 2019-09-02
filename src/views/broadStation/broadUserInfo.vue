<template>
    <div>
        <div style="background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconUserbroad" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">{{ userInfo.dj.nickname }}--电台</span>
        </div>
        <div class="userBroad">
            <div style="width: 2rem;height: 2rem;position: relative;left: 50%;margin-left: -1rem;">
                <img :src="userInfo.picUrl" alt="" style="width: 2rem;height: 2rem;">
            </div>
            <div style="width: 100%;height: 1rem;">
                <span style="color: azure">创建人：</span>
                <span style="color: azure">{{ userInfo.dj.nickname }}</span>
                <img style="width: 1rem;height: 1rem;border-radius: 50%;position: relative;top: 0.3rem;" :src="userInfo.dj.avatarUrl" alt="">
            </div>
        </div>
        <div>
            <ul style="margin-bottom: 1.2rem;">
                <li class="userBroads" @click="playBroad(userBroad, item)" v-for="(userBroad, item) in userBroads" :key="item">
                    <van-icon class="iconBroadInfo" name="play-circle-o" />
                    <span style="font-size: 0.4rem;line-height: 1.5rem;">{{ userBroad.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userId: '',
            userInfo: {
                dj:{
                    nickname:''
                }
            },
            userBroads: []
        }
    },
    mounted() {
        this.userId = this.$route.query.id
        this.getUserInfo()
    },
    methods: {
        // 获取用户电台的信息，介绍
        getUserInfo(){
            axios.post('/api/dj/detail?rid=' + this.userId).then((res)=>{
                this.userInfo = res.data.djRadio
                console.log(res)
                this.getuserBroads()
            })
        },
        // 获取用户的电台数组
        getuserBroads(){
            axios.post('/api/dj/program?rid=' + this.userId + '&limit=40').then((res)=>{
                console.log(res)
                this.userBroads = res.data.programs
            })
        },
        goUp(){
            history.go(-1)
        },
        playBroad(info, item){
            // this.$router.push({path: '/playBroad',query:{songId: info.mainSong.id,id: info.id}})
            console.log(info)
            this.$store.dispatch('setPlayList', this.userBroads)
            this.$store.dispatch('setlistId', null)
            this.$emit('getid',info.mainSong.id,info.coverUrl,info.mainSong.name, item, info.duration,info.id)
        }
    },
}
</script>

<style lang="">
.iconUserbroad {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}   
.userBroad {
    width: 100%;
    height: 5rem;
    background: rgb(51, 51, 51);
    padding-top: 1rem;
} 
.userBroads {
    width: 94%;
    height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    text-align: left;
    margin-left: 3%;
    margin-right: 3%;
    border-bottom: 1px solid rgb(200,200,200);
}
.iconBroadInfo {
    font-size: 0.4rem;
}
</style>