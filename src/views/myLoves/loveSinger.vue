<template>
    <div>
        <div style=";background: rgb(255,0,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconMyLove" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">我关注的歌手</span>
        </div>
        <div style="clear: both;">
            <li @click="goSinger(sing)" class="singer" v-for="(sing, item) in loveSingers" :key="item">
                <div style="float: left;width: 25%;height: 2.5rem;">
                    <img style="width: 2rem;height: 2rem;margin-top: 0.25rem;" :src="sing.img1v1Url" alt="">
                </div>
                <div style="float: left;width: 60%;height: 3.5rem;">
                    <div style="width: 80%;height: 2rem;line-height: 2.5rem;font-size: 0.4rem;text-align: left;padding-left: 0.3rem;">
                        {{ sing.name }}
                    </div>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
    data() {
        return {
            userId: '',
            loveSingers: [

            ]
        }
    },
    mounted() {
        this.userId = this.$route.query.id
        this.getSingers()
    },
    methods: {
        goUp(){
            history.go(-1)  
        },
        getSingers(){
            axios.get('/api/artist/sublist?timestamp=' + Math.random()*100).then((res)=>{
                this.loveSingers = res.data.data
            })
        },
        // 点击歌手进入详细页面
        goSinger(sing){
            this.$router.push({path: '/singerInfo',query:{id: sing.id,img: sing.img1v1Url,name: sing.name}})
        },
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
.singer{
    height: 2.5rem;
    width: 100%;
    overflow: hidden;
    list-style: none;
    border-bottom: 1px solid rgb(200, 200, 200);
    margin-right:0.3rem;
}
</style>