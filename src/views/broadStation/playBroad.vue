<template>
    <div>
        播放电台
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            songId: '',
            broadId: ''
        }
    },
    mounted() {
        this.broadId = this.$route.query.id
        this.songId = this.$route.query.songId
        this.playBroad()
    },
    methods: {
        playBroad(info){
            axios.post('/api/song/url?id=' + this.songId).then((res)=>{
                console.log(res)
                this.getInfo()
            })
        },
        getInfo(){
            axios.post('/api/dj/program/detail?id=' + this.broadId).then((res)=>{
                console.log(res)
            })
        }
    },
}
</script>

<style lang="">
    
</style>