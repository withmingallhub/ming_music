<template>
    <div>
        <div style=";background: rgb(51,51,51);;overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconclassinfo" />
            <span style="font-size: 0.4rem;line-height: 1rem;">{{ className }}</span>
        </div>
        <ul style="margin-bottom: 2rem;margin-top: 0.5rem;">
            <li @click="getBroadInfo(classOne.id)" v-for="(classOne, item) in classList" :key="item" style="width: 100%;height: 2.5rem;">
                <div style="float: left;width: 3rem;height: 2.5rem;">
                    <img style="width: 2rem;height: 2rem;margin-top: 0.25rem;" v-lazy="classOne.picUrl" alt="">
                </div>
                <div style="padding: 0.4rem;text-align: left;float: left;width: 6rem;height: 2.5rem;">
                    <p style="font-size: 0.4rem;">{{ classOne.name }}</p>
                    <p style="font-size: 0.3rem;color: rgb(180,180,180)">{{ classOne.rcmdtext }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            classId:'',
            className: '',
            classList: []
        }
    },
    mounted() {
        this.classId = this.$route.query.id
        this.className = this.$route.query.name
        this.getItInfo()
    },
    methods: {
        getItInfo(){
            axios.post('/api/dj/recommend/type?type=' + this.classId + '&limit=30').then((res)=>{
                console.log(res)
                this.classList = res.data.djRadios
            })
            // axios.post('/api/dj/program?rid=792451385&limit=40').then((res)=>{
            //     console.log(res)
            // })
        },
        goUp(){
            history.go(-1)
        },
        getBroadInfo(id){
            this.$router.push({path: '/broadUserInfo',query:{id: id}})
        }
    },
}
</script>

<style lang="">
.iconclassinfo {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
}
</style>