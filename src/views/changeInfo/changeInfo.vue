<template>
    <div>
        <div style="background:white;overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconInfo" />
            <span style="line-height: 1rem;font-size: 0.4rem;position:relative;right: 0.26rem;">我的信息</span>
        </div>
        <div>
            <div :style="{height: '5rem',border:'1px solid black',backgroundImage: 'url(' + userInfo.profile.backgroundUrl + ')'}">
                <img :src="userInfo.profile.avatarUrl" style="height: 2rem;width:2rem;border-radius: 50%;margin-top: 1rem;margin-left: 0.3rem;" alt="">
                <br>
                <br>
                <span style="color: white">{{ userInfo.profile.nickname }}</span>
            </div>
            <div style="width: 90%;min-height: 5rem;border: 1px solid black;position: relative;left: 5%;">
                <van-cell-group>
                    <van-field style="border-bottom: 1px solid rgb(177,177,177)" v-model="nickname" placeholder="请输入用户名" />
                    <van-field style="border-bottom: 1px solid rgb(177,177,177)" v-model="signature" placeholder="个性签名" />
                </van-cell-group>
            </div>
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
                profile: {
                    backgroundUrl: ''
                }
            },
            nickname:'',
            signature:''
        }
    },
    watch:{

    },
    mounted() {
        this.userId = this.$route.query.userId
        this.getInfo()
    },
    methods: {
        // 获取用户信息
        getInfo(){
            const that = this
            axios.post('/api/user/detail?uid=' + that.userId,{
                uid:that.userId
            }).then(function(res){
                that.userInfo = res.data
                that.nickname = res.data.profile.nickname
                that.signature = res.data.profile.signature
            })
        },
        goUp(){
            history.go(-1)
        },
    },
}
</script>

<style lang="">
.iconInfo {
    float:left;
    margin-left:0.2rem;
    line-height: 1rem;
    font-size: 0.4rem;
}
</style>