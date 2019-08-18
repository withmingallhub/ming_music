<template>
    <div>
        <div class="pai">
            <van-icon class="iconPai" name="bar-chart-o" />
        </div>
        <div>
            <li class="musiclist" @click="getList(list.id,list.name)" v-for="(list ,item) in musicList" :key="item">
                <img style="width:1.3rem;height: 1.3rem;line-height:1.5rem;float:left;margin-left: 0.4rem;" :src="list.coverImgUrl" alt="">
                <span style="line-height: 1.5rem;margin-left: -1.7rem;">{{list.name}}</span>
            </li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            musicList: [],
            userId:''
        }
    },
    computed: {
        
    },
    mounted() {
        this.getMusicList()
        this.getgouhao()
    },
    methods: {
        getgouhao(){
            axios.get('/api/user/playlist?uid=48353&limit=1000').then((res)=>{
                console.log(res)
            })
        },
        getMusicList(){
            const that = this
            axios.get('/api/login/status').then((res)=>{
                that.userId = res.data.profile.userId
                that.musicInfo()
            }).catch(function(error){
                if(error.response.data.code === 301){
                    that.$router.push({path:'/Login'})
                }
            })
        },
        musicInfo(){
            axios.post('/api/user/playlist?uid=' + this.userId,{
                uid:this.userId
            }).then((res)=>{
                this.musicList = res.data.playlist
                console.log(res)
            })
        },
        getList(id,name){
            this.$router.push({path:'/listenList',query:{id:id,top:name}})
        }
    }
}
</script>

<style lang="">
.musiclist{
    list-style: none;
    height: 1.5rem;
    font-size: 0.4rem;
}
.pai {
    height: 5rem;
    width: 100%;
    padding-top: 0.7rem;
    border: 1px solid black;
}
.iconPai {
    font-size: 1rem;
}
</style>