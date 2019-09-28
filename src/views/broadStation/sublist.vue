<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconsublist" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">我的订阅</span>
        </div>
         <ul>
                <li @click="getBroadInfo(broad.id)" class="users" v-for="(broad, item) in sublist" :key="item">
                    <div style="height: 100%;width: 15%;float:left;">
                        <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  v-lazy="broad.picUrl" alt="">
                    </div>
                    <div style="height: 100%;width: 80%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                        <div style="clear: both;height: 0.8rem;width: 80%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ broad.name }}</div>
                        <div style="clear: both;height: 0.6rem;width:80%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ broad.name }}</div>
                    </div>
                </li>
            </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            sublist: []
        }
    },    
    mounted() {
        this.getsublist()
    },
    methods: {
        getsublist(){
            axios.get('/api/dj/sublist').then((res)=>{
                console.log(res)
                this.sublist = res.data.djRadios
            })
        },
        getBroadInfo(id){
            this.$router.push({path: '/broadUserInfo',query:{id: id}})
        },
        goUp(){
            history.go(-1)
        },
    },
}
</script>

<style scoped>
.users {
    list-style: none;
    height: 1.4rem;
    overflow: hidden;
}
.iconsublist {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}
</style>