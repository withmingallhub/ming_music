<template>
    <div>
        <div style=";background: rgb(255,0,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconMyLove" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">我的关注</span>
        </div>
        <ul>
            <li class="myLoves" @click="goMyLoveUser">我关注的用户</li>
            <li class="myLoves" @click="goMyLoveSinger">我关注的歌手</li>
            <li class="myLoves" @click="goMyLoveBroad">我关注的电台</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userId: ''    
        }
    },
    mounted() {
        this.userId = this.$route.query.id
    },
    methods: {
        goUp(){
            history.go(-1)  
        },
        goMyLoveUser(){
            this.$router.push({path: '/loveUser',query:{id: this.userId}})
        },
        goMyLoveMe(){
            this.$router.push({path: '/loveMe',query:{id: this.userId}})
        },
        goMyLoveSinger(){
            this.$router.push({path: '/loveSinger',query:{id: this.userId}})
        },
        goMyLoveBroad(){
            this.$router.push({path: '/sublist'})
        }
        
    },
}
</script>

<style lang="">
.iconMyLove {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}
.myLoves {
    height: 0.9rem;
    width: 92%;
    margin-left: 4%;
    text-align: left;
    border-bottom: 1px solid rgb(200,200,200);
    line-height: 0.9rem;
}
</style>