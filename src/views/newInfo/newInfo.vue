<template>
    <div>
        <div style=";background: rgb(255,0,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">我的消息</span>
        </div>
        <ul>
            <li @click="changeItem(0)" :class="item == 0 ? 'it' : 'others'">私信</li>
            <li @click="changeItem(1)" :class="item == 1 ? 'it' : 'others'">评论</li>
            <li @click="changeItem(2)" :class="item == 2 ? 'it' : 'others'">@我</li>
            <li @click="changeItem(3)" :class="item == 3 ? 'it' : 'others'">通知</li>
        </ul>
        <div v-if="item == 0" style="clear: both;overflow: hidden;">
            <li class="infoClass" v-for="(info, item1) in newInfo" :key="item1">
                <div style="width: 1.6rem;height: 100%;float: left;">
                    <img @click="goUserInfo(info.fromUser.userId)" v-lazy="info.fromUser.avatarUrl" alt="" style="width: 1.3rem;hegith: 1.3rem;margin-top: 0.1rem;border-radius: 50%;">
                </div>
                <div @click="gonewInfo(info.fromUser.userId)" style="width: 7.5rem;height: 100%;float: left;">
                    <div style="width: 100%;height: 0.8rem;text-align: left;padding-top: 0.25rem;font-size: 0.4rem">   
                        {{ info.fromUser.nickname }}
                    </div>
                    <div style="width: 7.5rem;height: 0.7rem;font-size: 0.3rem;line-height: 0.4rem;text-align: left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color: rgb(175,175,175);border-bottom: 1px solid rgb(200,200,200)">
                        {{ JSON.parse(info.lastMsg).msg }}
                    </div>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            item: 0,
            userId: '',
            newInfo: [],
            tellMe: []
        }
    },
    mounted() {
        this.userId = this.$route.query.id
        this.getInfo()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getInfo(){
            axios.get('/api/msg/private?limit=10').then((res)=>{
                console.log(res)
                this.newInfo = res.data.msgs
                this.tellmeInfo()
            })
        },
        tellmeInfo(){
            axios.post('/api/msg/notices?limit=15').then((res)=>{
                console.log(res)
                this.tellMe = res.data.notices
            })
        },
        changeItem(i){
            this.item = i
        },
        goUserInfo(id){
            this.$router.push({path: '/loveUserInfo',query:{id: id}})
        },
        gonewInfo(id){
            this.$router.push({path: '/sendInfo',query: {id: id}})
        }
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
.it {
    list-style: none;
    float: left;
    width: 25%;
    height: 1rem;
    background: rgb(51, 51, 51);
    color: white;
    line-height: 1rem
}
.others {
    list-style: none;
    float: left;
    width: 25%;
    height: 1rem;
    background: rgb(81, 81, 81);
    color: white;
    line-height: 1rem
}
.infoClass {
    list-style: none;
    height: 1.5rem;
    width: 96%;
    margin-left: 2%;
}
</style>