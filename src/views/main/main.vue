<template>
    <div>
        <div>
            <li class="musiclist" @click="getList(list.id)" v-for="(list ,item) in musicList" :key="item">{{list.name}}</li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            musicList: [],
        }
    },
    computed: {
        getMusicList(){
            this.musicList = this.$store.state.user.musicInfo.playlist
        },
    },
    mounted() {
        
    },
    methods: {
        getList(id){
            console.log('aaa')
            this.$router.push({path:'/listenList',query:{id:id}})
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