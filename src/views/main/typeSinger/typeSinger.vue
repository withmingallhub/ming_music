<template>
    <div>
        <div style=";background: rgb(51,51,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">歌手分类</span>
        </div>
        <ul style="margin-bottom: 2rem;">
            <li @click="getclass(classinfo)" v-for="(classinfo, item) in typeSinger" :key="item" style="text-align: left;width: 94%;height: 1rem;border-top: 1px solid rgb(230,230,230);margin: 0rem 3%;">
                <span style="line-height: 1rem;font-size: 0.4rem;">{{ classinfo.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            typeSinger: [
                {
                    item: '5001',
                    name: '入驻歌手'
                },
                {
                    item: '1001',
                    name: '华语男歌手'
                },
                {
                    item: '1002',
                    name: '华语女歌手'
                },
                {
                    item: '1003',
                    name: '华语组合/乐队'
                },
                {
                    item: '2001',
                    name: '欧美男歌手'
                },
                {
                    item: '2002',
                    name: '欧美女歌手'
                },
                {
                    item: '2003',
                    name: '欧美组合/乐队'
                },
                {
                    item: '6001',
                    name: '日本男歌手'
                },
                {
                    item: '6002',
                    name: '日本女歌手'
                },
                {
                    item: '6003',
                    name: '日本组合/乐队'
                },
                {
                    item: '7001',
                    name: '韩国男歌手'
                },
                {
                    item: '7002',
                    name: '韩国女歌手'
                },
                {
                    item: '7003',
                    name: '韩国组合/乐队'
                },
                {
                    item: '4001',
                    name: '其他男歌手'
                },
                {
                    item: '4002',
                    name: '其他女歌手'
                },
                {
                    item: '4003',
                    name: '其他组合/乐队'
                },

            ]
        }
    },
    mounted() {
        
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getclass(info){
            this.$router.push({path: '/thisType',query:{id: info.item,name: info.name}})
        }
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