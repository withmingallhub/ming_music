<template>
    <div>
        <div>
            <li class="mlist" @click="getmusics(li.id)" v-for="(li ,item) in list" :key="item">{{li.name}}</li>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            id: '',
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
        getmusics(id){
            axios.post('/api/song/url?id=' + id,{
                id: id
            }).then((res)=>{
                console.log(res)
            })
        }
    },
    mounted() {
        this.id = this.$route.query.id
        this.getMusic()
    },
}
</script>

<style lang="">
.mlist{
    list-style: none;
    height: 1.5rem;
    font-size: 0.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid rgb(155,155,155)
}
</style>