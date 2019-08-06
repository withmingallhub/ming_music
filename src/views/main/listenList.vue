<template>
    <div>
        <div style="overflow:hidden;height:2rem;background:rgba(25,137,250,0.3);text-align:center;">
            <van-icon @click="goMain" name="arrow-left" class="icon" />
            <span class="topName">{{ top }}</span>
        </div>
        <div>
            <li class="mlist" @click="getmusics(li)" v-for="(li ,item) in list" :key="item">{{li.name}}</li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            id: '',
            top:'',
            list: []
        }
    },
    methods: {
        getMusic(){
            axios.post('/api/playlist/detail?id=' + this.id,{
                id: this.id
            }).then((res)=>{
                this.list = res.data.playlist.tracks
            })
        },
        getmusics(li){
            this.$emit('getid',li.al)    
            // console.log(li.al)
            // this.$router.push({path:'/listenMusic',query:{id:li.al.id}})
        },
        goMain(){
            this.$router.push({path:'/'})
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.top = this.$route.query.top
        this.getMusic()
    },
}
</script>

<style lang="">
.mlist{
    list-style: none;
    height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    font-size: 0.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid rgb(155,155,155)
}
.icon{
    font-size: 1rem;
    float: left;
    line-height: 2rem;
}
.topName{
    line-height: 2rem;
    font-size: 0.6rem;
    clear: both;
    margin-left: -1rem;
}
</style>