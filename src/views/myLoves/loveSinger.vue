<template>
    <div>
        <div style=";background: rgb(255,0,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconMyLove" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">我关注的歌手</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userId: ''    
        }
    },
    mounted() {
        this.userId = this.$route.query.id
    },
    methods: {
        goUp(){
            history.go(-1)  
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
</style>