<template>
    <div id="scroll">
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">歌单</span>
        </div>
        <div style="clear: both;width: 100%;text-align: left;padding-left: 0.4rem;margin-top: 0.23rem;margin-bottom: 0.23rem;">
            推荐歌单
        </div>
        <ul style="width: 96%;margin-left: 2%;">
            <li class="recommendList" @click="getList(recommends.id,recommends.name)" v-for="(recommends, item) in recommend" :key="item">
                <div style="float:left;width: 2rem;height: 100%;">
                    <img :src="recommends.picUrl" alt="" style="width: 1.8rem;height: 1.8rem;margin-top: 0.1rem;">
                </div>
                <div style="text-align: left;padding-left: 0.2rem;float: left;width: 7rem;height: 100%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
                    <span style="font-size: 0.4rem;line-height: 2rem;">{{ recommends.name }}</span>
                </div>
            </li>
        </ul>
        <div style="width: 100%;text-align: left;padding-left: 0.4rem;margin-top: 0.23rem;margin-bottom: 0.23rem;">
            精品歌单
        </div>
        <ul style="width: 96%;margin-left: 2%;margin-bottom: 1.2rem;">
            <li class="recommendList" @click="getList(recommends.id,recommends.name)" v-for="(recommends, item) in wellList" :key="item">
                <div style="float:left;width: 2rem;height: 100%;">
                    <img :src="recommends.coverImgUrl" alt="" style="width: 1.8rem;height: 1.8rem;margin-top: 0.1rem;">
                </div>
                <div style="text-align: left;padding-left: 0.2rem;float: left;width: 7rem;height: 100%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
                    <span style="font-size: 0.4rem;line-height: 2rem;">{{ recommends.name }}</span>
                </div>
            </li>
            <li id="more" style="width: 100%;height: 1rem;">
                <van-loading />
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            recommend: [],
            wellList: [],
            classfiy: [],
            hotclass: []
        }
    },
    mounted() {
        window.addEventListener('scroll',this.getMore)
        this.getRecommendList()
        this.getWellList()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getRecommendList(){
            axios.get('/api/recommend/resource').then((res)=>{
                console.log(res)
                this.recommend = res.data.recommend
            })
        },
        getList(id,name){
            this.$router.push({path:'/listenList',query:{id:id,top:name}})
        },
        getWellList(){
            axios.get('/api/top/playlist/highquality').then((res)=>{
                console.log(res)
                this.wellList = res.data.playlists
            })
        },
        getMore(){
            console.log('判断')
        },
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
.recommendList{
    width: 100%;
    height: 2rem;
}
</style>