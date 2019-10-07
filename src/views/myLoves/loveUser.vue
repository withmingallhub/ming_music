<template>
    <div>
        <div style=";background: rgb(255,0,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconMyLove" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">我关注的用户</span>
        </div>
        <div>
            <li @click="goUserInfo(user.userId)" class="users" v-for="(user, item) in loveUsers" :key="item">
                <div style="height: 100%;width: 15%;float:left;">
                    <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  :src="user.avatarUrl" alt="">
                </div>
                <div style="height: 100%;width: 68%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                    <div style="clear: both;height: 0.8rem;width: 80%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ user.nickname }}</div>
                    <div style="clear: both;height: 0.6rem;width:80%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ user.signature }}</div>
                    
                </div>
                <div @click="noLoveUser(user.userId)" style="width: 15%;height: 0.8rem;float:right;background: rgb(255,0,51);color:rgb(230,230,230);line-height: 0.8rem;margin-top:0.3rem;border-radius: 0.3rem;margin-right: 2%;">
                    已关注
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'
import { Dialog } from 'vant';


export default {
    data() {
        return {
            userId: '',
            loveUsers: [

            ]
        }
    },
    mounted() {
        this.userId = this.$route.query.id
        this.getMyLoveUsers()
    },
    methods: {
        goUp(){
            history.go(-1)  
        },
        getMyLoveUsers(){
            axios.post('/api/user/follows?uid=' + this.userId + '&timestamp=' + Date.now()).then((res)=>{
                console.log(res)
                this.loveUsers = res.data.follow
            })
        },
        goUserInfo(id){
            this.$router.push({path: '/loveUserInfo',query:{id: id}})
        },
        noLoveUser(id){
            // 阻止冒泡事件
            window.event.cancelBubble = true
            // 弹窗
            Dialog.confirm({
                title: '关注信息',
                message: '取消关注该用户？'
            }).then(() => {
                axios.post('/api/follow?id=' + id +'&t=0').then((res)=>{
                    if(res.data.code == 200) Toast('已取消关注')
                })
            }).catch(() => {
               console.log('取消')
            });
        }
    },
}
</script>

<style scoped>
.iconMyLove {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}
.users {
    list-style: none;
    height: 1.4rem;
    overflow: hidden;
}
</style>