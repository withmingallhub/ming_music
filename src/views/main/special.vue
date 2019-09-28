<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">专辑</span>
        </div>
        <div style="width: 100%;height: 0.5rem;text-align:left;margin-left: 0.3rem;margin-top: 0.2rem;">
            最新专辑
        </div>
        <ul style="margin-bottom: 1.2rem;">
            <li @click="gobumer(album)" class="albumer" v-for="(album, item) in albums" :key="item">
                <div style="float: left;width: 25%;height: 2.5rem;">
                    <img style="width: 2rem;height: 2rem;margin-top: 0.25rem;" v-lazy="album.blurPicUrl" alt="">
                </div>
                <div style="float: left;width: 70%;height: 2.5rem;">
                    <div style="margin-top: 0.2rem;width: 100%;height: 1.4rem;padding-top: 0.7rem;ont-size: 0.4rem;text-align: left;padding-left: 0.3rem;">
                        {{ album.name }}
                    </div>
                    <div style="width: 80%;height: 0.5rem;font-size: 0.3rem;text-align: left;padding-left: 0.3rem;color: rgb(150,150,150)">
                        {{ album.artists[0].name }}
                    </div>
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
            albums: []
        }
    },
    mounted() {
        this.getNewSpecial()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getNewSpecial(){
            axios.get('/api/album/newest').then((res)=>{
                console.log(res)
                this.albums = res.data.albums
            })
        },
        gobumer(album){
            this.$router.push({path: '/albumsInfo',query:{id: album.id}})
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
.albumer {
    height: 2.5rem;
    width: 100%;
    overflow: hidden;
    list-style: none;
    border-bottom: 1px solid rgb(200, 200, 200);
    margin-right:0.3rem;
}
</style>