<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">专辑</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
        goUp(){
            history.go(-1)
        },
    },
}
</script>

<style lang="">
.iconmusicList {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}
</style>