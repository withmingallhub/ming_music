<template>
    <div>
        <div style="background:white;overflow:hidden;height:2rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="icon" />
            <span class="topName">{{ playMusic.musicName }}</span>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            playMusic:{

            }
        }
    },
    mounted() {
        this.playMusic = this.$route.query.playMusic
    },
    methods:{
        goUp(){
            history.go(-1)
        },
    }
}
</script>

<style lang="">
    
</style>