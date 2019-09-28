<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconBuy" />
            <span style="font-size: 0.3rem;line-height: 1rem;color: white;">付费精选</span>
        </div>
        <ul>
            <li @click="getBroadInfo(broad.id)" class="users" v-for="(broad, item) in wellList" :key="item">
                <div style="height: 100%;width: 15%;float:left;">
                    <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  v-lazy="broad.picUrl" alt="">
                </div>
                <div style="height: 100%;width: 65%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                    <div style="float: left;height: 0.8rem;width: 100%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ broad.name }}</div>
                    <div style="float: left;height: 0.6rem;width:100%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ broad.name }}</div>
                    
                </div>
                <div style="color: red;text-align: left;margin-right: 3%;width: 17%;line-height: 100%;height: 100%;border-bottom: 1px solid rgb(230,230,230);float: right;">
                    <van-icon class="money" name="gold-coin-o"></van-icon>
                    <span style="font-size: 0.4rem;position: relative;bottom: 0.1rem;">{{ broad.originalPrice / 100 }}</span>
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
            wellList: []
        }
    },
    mounted() {
        this.getWell()
    },
    methods: {
        getWell(){
            axios.get('/api/dj/paygift?limit=50').then((res)=>{
                console.log(res)
                this.wellList = res.data.data.list
            })
        },
        goUp(){
            history.go(-1)
        },
        //  电台的信息页面
        getBroadInfo(id){
            this.$router.push({path: '/broadUserInfo',query:{id: id}})
        },
    },
}
</script>

<style scoped>
.iconBuy {
    float: left;
    color:azure;
    font-size: 0.4rem;
    line-height: 1rem;
}
.users {
    list-style: none;
    height: 1.4rem;
    overflow: hidden;
}
.money {
    font-size: 0.5rem;
    line-height: 1.4rem;
}
</style>