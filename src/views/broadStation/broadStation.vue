<template>
    <div>
        <div style="width； 100%;height: 1.7rem;border-bottom: 1px solid rgb(230,230,230);">
            <div @click="goclass" style="width: 33.4%;height: 1.5rem;float: left;">
                <van-icon class="broadIcon" name="apps-o" />
                <p>电台分类</p>
            </div>
            <div @click="gosublist" style="width: 33.4%;height: 1.5rem;float: left;">
                <van-icon class="broadIcon" name="user-circle-o" />
                <p>我的订阅</p>
            </div>
            <div @click="goBuyWell" style="width: 33.2%;height: 1.5rem;float: left;">
                <van-icon class="broadIcon" name="after-sale" />
                <p>付费精选</p>
            </div>
        </div>
        <div style="width: 100%;min-height: 1.5rem;">
            <div style="font-size: 0.4rem;line-height: 1rem;margin-left: 0.2rem;width: 25%;height: 1rem;">
                今日优选
            </div>
            <ul>
                <li @click="getBroadInfo(broad.id)" class="users" v-for="(broad, item) in todayChoise" :key="item">
                    <div style="height: 100%;width: 15%;float:left;">
                        <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  :src="broad.picUrl" alt="">
                    </div>
                    <div style="height: 100%;width: 80%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                        <div style="clear: both;height: 0.8rem;width: 80%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ broad.name }}</div>
                        <div style="clear: both;height: 0.6rem;width:80%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ broad.name }}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div style="width； 100%;min-height: 5.5rem;">
            <div style="font-size: 0.4rem;line-height: 1rem;margin-left: 0.2rem;width: 25%;height: 1rem;">
                精品推荐
            </div>
            <ul>
                <li @click="getBroadInfo(recommend.id)" v-for="(recommend, item) in recommends.slice(0,3)" :key="item" style="text-align: left;margin-left: 1%;float: left;width: 32%;min-height: 3rem;">
                    <img style="width: 100%;height: 3rem;" :src="recommend.picUrl" alt="">
                    <p>{{ recommend.rcmdtext }}</p>
                </li>
            </ul>
        </div>
        <div style="width； 100%;min-height: 1.5rem;">
            <div style="font-size: 0.4rem;line-height: 1rem;margin-left: 0.2rem;width: 25%;height: 1rem;">
                热门电台
            </div>
            <ul style="margin-bottom: 2rem;">
                <li @click="getBroadInfo(hotB.id)" class="hotBroad" v-for="(hotB, item) in hotBroads" :key="item">
                    <div style="width:100%;">
                        <!-- <div class="iconplay">
                            <van-icon name="play-circle" />
                            <span>{{ hotB.playCount}}</span>
                        </div> -->
                        <img style="width: 100%;"  v-lazy="hotB.picUrl" >
                    </div>
                    <div style="line-height:1rem;word-wrap: break-word;word-break: break-all;overflow: hidden;text-align: left;font-size: 0.4rem;width: 100%;min-height: 1rem;">
                        {{ hotB.name }}--{{ hotB.rcmdtext }}
                    </div>
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
            todayChoise: [],
            recommends: [],
            hotBroads: []

        }
    },
    mounted() {
        this.getInfoToday()
    },
    methods: {
        // 获取电台今日优选信息
        getInfoToday(){
            axios.get('/api/dj/today/perfered').then((res)=>{
                this.todayChoise = res.data.data
                this.recommend()
            })
        },
        // 获取精品推荐
        recommend(){
            axios.get('/api/dj/recommend').then((res)=>{
                this.recommends = res.data.djRadios
                // this.getclass()
                this.hotBroad()
            })
        },
        hotBroad(){
            axios.get('/api/dj/hot').then((res)=>{
                console.log(res)
                this.hotBroads = res.data.djRadios
            })
        },
        // 获取电台分类名称
        goclass(){
            this.$router.push({path: '/goclass'})
        },
        getBroadInfo(id){
            this.$router.push({path: '/broadUserInfo',query:{id: id}})
        },
        // 我的电台订阅
        gosublist(){
            this.$router.push({path: '/sublist'})
        },
        //  付费精选
        goBuyWell(){
            this.$router.push({path: '/buyWell'})
        }
    },
}
</script>

<style lang="">
.broadIcon {
    font-size: 0.8rem;
    margin-top: 0.2rem;
    color: rgb(25, 181, 254);
}
.users {
    list-style: none;
    height: 1.4rem;
    overflow: hidden;
}
.hotBroad {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.2rem;
    min-height:5rem;
    list-style: none;
}
</style>