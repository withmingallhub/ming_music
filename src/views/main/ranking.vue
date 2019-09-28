<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">歌曲排行</span>
        </div>
        <div style="width: 96%;margin-left: 2%;min-height: 5rem;margin-bottom: 1.2rem;">
            <li @click="goRanking(cla)" class="rankingList" v-for="(cla, item) in rankingClass" :key="item">
                <div style="float:left;width: 25%;height: 100%;">
                    <img style="width: 1.8rem;height: 1.8rem;margin-top: 0.1rem;" v-lazy="cla.coverImgUrl" alt="">
                </div>
                <div style="text-align: left;flaot:left;width: 75%;height: 2rem;font-size: 0.4rem;line-height: 2rem;">
                    {{ cla.name }}
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
            rankingClass: [
                {
                    item: '0',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '1',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '2',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '3',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '4',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '5',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '6',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '7',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '8',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '9',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '10',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '11',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '12',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '13',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '14',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '15',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '16',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '17',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '18',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '19',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '20',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '21',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '22',
                    coverImgUrl:'',
                    name: ''
                },
                {
                    item: '23',
                    coverImgUrl:'',
                    name: ''
                },
            ],
        }
    },
    mounted() {
        this.getInfo()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getInfo(){
            for(let i = 0;i < this.rankingClass.length;i ++){
                axios.post('/api/top/list?idx=' + i).then((res)=>{
                    this.rankingClass[i].name = res.data.playlist.name
                    this.rankingClass[i].coverImgUrl = res.data.playlist.coverImgUrl
                })
            }
        },
        goRanking(ranking){
            this.$router.push({path:'/rankingI',query:{item: ranking.item}})
        }
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
.rankingList {
    height: 2rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    list-style: none;
    border-bottom: 1px solid rgb(200, 200, 200)
}
</style>