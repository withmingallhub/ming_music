<template>
    <div>
        <div style="border-top: 1px solid rgb(200,200,200);background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">歌手</span>
        </div>
        <div style="margin-bottom: 1.2rem;width: 96%;margin-left: 2%;min-height: 5rem;margin-top: 0.2rem;">
            <li class="singer">
                <div style="float: left;width: 25%;height: 2.5rem;">
                    <i style="font-size: 1.25rem;margin-top: 0.625rem;" class="fa fa-user-o"></i>
                </div>
                <div style="float: left;width: 60%;height: 3.5rem;">
                    <div style="width: 80%;height: 2rem;line-height: 2.5rem;font-size: 0.4rem;text-align: left;padding-left: 0.3rem;">
                        歌手分类
                    </div>
                </div>
            </li>
            <p style="text-align: left;margin: 0.3rem 0rem 0.4rem 0.3rem;font-weight: 700;">热门歌手</p>
            <li class="singer" v-for="(sing, item) in singers" :key="item">
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

export default {
    data() {
        return {
            singers: []
        }
    },
    mounted() {
        this.getHotSinger()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        //  获取歌手列表
        getHotSinger(){
            axios.get('/api/top/artists?limit=20').then((res)=>{
                console.log(res)
                this.singers = res.data.artists
            })
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
.singer {
    height: 2.5rem;
    width: 100%;
    overflow: hidden;
    list-style: none;
    border-bottom: 1px solid rgb(200, 200, 200);
    margin-right:0.3rem;
}
</style>