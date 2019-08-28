<template>
    <div>
        <div style="border-top: 1px solid rgb(200,200,200);background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconclass" />
            <span style="font-size: 0.3rem;line-height: 1rem;color: white;">全部分类</span>
        </div>
        <ul style="margin-bottom: 2rem;">
            <li @click="getclass(classinfo)" v-for="(classinfo, item) in classInfo" :key="item" style="text-align: left;width: 94%;height: 1rem;border-top: 1px solid rgb(230,230,230);margin: 0rem 3%;">
                <span style="line-height: 1rem;font-size: 0.4rem;">{{ classinfo.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            classInfo: []
        }
    },
    mounted() {
        this.getclassInfo()
    },
    methods: {
        getclassInfo(){
            axios.get('/api/dj/catelist').then((res)=>{
                console.log(res)
                this.classInfo = res.data.categories
            })
        },
        goUp(){
            history.go(-1)
        },
        getclass(info){
            this.$router.push({path: '/getclass',query:{id: info.id,name: info.name}})
        }
    },
}
</script>
<style lang="">
.iconclass {
    float: left;
    color:azure;
    font-size: 0.4rem;
    line-height: 1rem;
}
</style>