<template>
    <div>
        <div style=";background: rgb(255,0,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">username</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            uid: ''
        }
    },
    mounted() {
        this.uid = this.$route.query.id
        this.getHisoryInfo()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getHisoryInfo(){
            axios.post('/api/msg/private/history?uid=' + this.uid).then((res)=>{
                console.log(res)
            })
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
</style>