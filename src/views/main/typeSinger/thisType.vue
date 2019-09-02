<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">{{ typeName }}</span>
        </div>
        <li @click="goSinger(sing)" class="singer" v-for="(sing, item) in typeSingers" :key="item">
                <div style="float: left;width: 25%;height: 2.5rem;">
                    <img style="width: 2rem;height: 2rem;margin-top: 0.25rem;" v-lazy="sing.img1v1Url" alt="">
                </div>
                <div style="float: left;width: 60%;height: 3.5rem;">
                    <div style="width: 80%;height: 2rem;line-height: 2.5rem;font-size: 0.4rem;text-align: left;padding-left: 0.3rem;">
                        {{ sing.name }}
                    </div>
                </div>
            </li>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            typeName: '',
            item: '',
            typeSingers: []
        }
    },
    mounted() {
        this.typeName = this.$route.query.name
        this.item = this.$route.query.id
        this.getSinger()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getSinger(){
            axios.post('/api/artist/list?cat=' + this.item).then((res)=>{
                console.log(res)
                this.typeSingers = res.data.artists
            })
        },
        goSinger(sing){
            this.$router.push({path: '/singerInfo',query:{id: sing.id,img: sing.img1v1Url,name: sing.name}})
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