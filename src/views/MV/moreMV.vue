<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmoreMV" />
            <span style="font-size: 0.3rem;line-height: 1rem;color: white;">更多MV</span>
        </div>
        <div style="width:100%;min-height: 4rem;">
            <div style="font-size: 0.4rem;line-height: 1rem;width: 20%;height: 1rem;border-bottom: 1px solid black;margin-left: 0.2rem;">
                网易出品
            </div>
            <div @click="playMV(MV.id)" class="wangyi" v-for="(MV, item) in wangyiMV" :key="item">
                <div class="iconwangyi">
                    <van-icon name="play-circle" />
                    <span>{{ MV.playCount}}</span>
                </div>
                <img style="width: 96%;" v-lazy="MV.cover" alt="">
                <span>
                    {{ MV.name }} ({{ MV.artistName }})
                </span>
            </div>
        </div>
        <div>
            <div style="clear: both;margin-left: 0.2rem;width: 25%;height: 0.9rem;border-bottom: 2px solid black;">
                <span style="font-size: 0.4rem;line-height: 0.8rem;">MV排行</span>
            </div>
            <div style="width: 100%;min-height: 5rem;">
                <li class="paiMV" v-for="(more, item) in paiMV" :key="item" @click="playMV(more.id)">
                    <div style="width:100%;">
                        <div class="iconwangyi">
                            <van-icon name="play-circle" />
                            <span>{{ more.playCount}}</span>
                        </div>
                        <img style="width: 100%;" v-lazy="more.cover" alt="">
                    </div>
                    <div style="line-height:1rem;word-wrap: break-word;word-break: break-all;overflow: hidden;text-align: left;font-size: 0.4rem;width: 100%;min-height: 1rem;">
                        {{ more.name }}
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            wangyiMV: [],
            paiMV: []
        }
    },
    mounted() {
        this.getwangyi()
    },
    methods: {
        getwangyi(){
            axios.get('/api/mv/exclusive/rcmd?limit=6').then((res)=>{
                console.log(res)
                this.wangyiMV = res.data.data
                axios.get('/api/mv/all?area=').then((res1)=>{
                    console.log(res1)
                    this.paiMV = res1.data.data
                })
            })
        },
        playMV(id){
            this.$router.push({path:'/playMV',query:{id: id}})
        },
        goUp(){
            history.go(-1)
        },
    }
}
</script>

<style scoped>
.wangyi {
    float: left;
    width: 50%;
    height: 4.2rem;
    margin-top: 0.2rem;
    overflow:hidden;
}
.iconwangyi {
    position:absolute;
    margin-left: 0.3rem;
    margin-top: 0.1rem;
}
.paiMV {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.2rem;
    min-height:5rem;
    list-style: none;
}
.iconmoreMV {
    float: left;
    color: azure;
    font-size: 0.4rem;
    line-height: 1rem;
}
</style>