<template>
    <div>
        <div>
            <li class="musiclist" @click="getList(list.id,list.name)" v-for="(list ,item) in musicList" :key="item">{{list.name}}</li>
        </div>
        <div>
            我的电台
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
    },
    methods: {
        getMusicList(){
            const that = this
            axios.get('/api/login/status').then((res)=>{
                console.log(res)
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
                console.log(res.data.playlist)
                this.musicList = res.data.playlist
            })
        },
        getList(id,name){
            console.log('aaa')
            this.$router.push({path:'/listenList',query:{id:id,top:name}})
        }
    }
}
</script>

<style lang="">
.musiclist{
    list-style: none;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 0.5rem;
}
</style>