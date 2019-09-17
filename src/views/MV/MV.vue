<template>
    <div>
        <div @click="goMoreMV" style="line-height: 1rem;font-size: 0.4rem;width: 4rem;height: 1rem;border-bottom: 1px solid black">
            查看更多MV
        </div>
        <div style="width: 100%;min-height: 9.5rem;;margin-bottom: 1.6rem" >
            <div style="margin-left: 0.2rem;width: 25%;height: 0.9rem;">
                <span style="font-size: 0.4rem;line-height: 0.8rem;">
                    精彩推荐
                </span>
            </div>
            <div @click="playMV(MV.id)" class="well" v-for="(MV, item) in well" :key="item">
                <div class="iconplay">
                    <van-icon name="play-circle" />
                    <span>{{ MV.playCount}}</span>
                </div>
                <img style="width: 96%;" :src="MV.picUrl" alt="">
                <span>
                    {{ MV.name }} ({{ MV.artistName }})
                </span>
            </div>
            
            <div style="clear: both;margin-left: 0.2rem;width: 25%;height: 0.9rem;">
                <span style="font-size: 0.4rem;line-height: 0.8rem;">更多MV</span>
            </div>
            <div style="width: 100%;min-height: 5rem;">
                <li class="moreMV" v-for="(more, item) in moreMV" :key="item" @click="playMV(more.id)">
                    <div style="width:100%;">
                        <div class="iconplay">
                            <van-icon name="play-circle" />
                            <span>{{ more.playCount}}</span>
                        </div>
                        <img style="width: 100%;" :src="more.cover" alt="">
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
            well: [],
            moreMV: []
        }
    },
    mounted() {
        this.writeMv()
    },
    methods: {
        writeMv(){
            axios.post('/api/personalized/mv').then((res)=>{
                this.well = res.data.result
                axios.post('/api/mv/first?limit=10').then((res1)=>{
                    console.log(res1.data.data)
                    this.moreMV = res1.data.data
                })
            })
        },
        playMV(id){
            this.$router.push({path:'/playMV',query:{id: id}})
        },
        goMoreMV(){
            this.$router.push({path:'/moreMV'})
        }
    }
}
</script>

<style lang="">
.well {
    float: left;
    width: 50%;
    height: 4.2rem;
    margin-top: 0.2rem;
    overflow:hidden;
}
.iconplay {
    position:absolute;
    margin-left: 0.3rem;
    margin-top: 0.1rem;
}
.moreMV {
    width: 96%;
    margin-left: 2%;
    margin-top: 0.2rem;
    min-height:5rem;
    list-style: none;
}
</style>