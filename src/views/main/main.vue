<template>
    <div>
        <!-- 新建歌单 -->
        <van-dialog
        v-model="show"
        title="新建歌单"
        show-cancel-button
        @confirm="createlist"
        >
            <van-cell-group>
                <van-field v-model="newlistName" placeholder="歌单名称" />
            </van-cell-group>
        </van-dialog>
        <!-- 删除歌单 -->
        <van-dialog
        v-model="deleteList"
        title="确认删除该歌单？"
        show-cancel-button
        @confirm="deleList"
        >
        </van-dialog>
        <div class="pai">
            <div @click="ranking" style="width: 25%;float: left;">
                <i style="font-size: 0.8rem;color: rgb(255,0,51)" class="fa fa-signal"></i>
                <p>排行</p>
            </div>
            <div @click="singer" style="width: 25%;float: left;">
                <i style="font-size: 0.8rem;color: rgb(255,0,51)" class="fa fa-user-o"></i>
                <p>歌手</p>
            </div> 
            <div @click="gomusicList" style="width: 25%;float: left;">
                <i style="font-size: 0.8rem;color: rgb(255,0,51)" class="fa fa-tasks"></i>
                <p>歌单</p>
            </div>
            <div @click="special" style="width: 25%;float: left;">
                <i style="font-size: 0.8rem;color: rgb(255,0,51)" class="fa fa-dot-circle-o"></i>
                <p>专辑</p>
            </div>
        </div>
        <div style="width: 100%;margin-bottom: 1.2rem;">
            <div @click="apearence()" style="text-align: left;padding-left: 2%;width: 96%;height: 1rem;margin-left: 2%;line-height: 1rem;">
                我创建的歌单
                <van-icon v-if="myList == 0" style="position: relative;top: 0.3rem;float: right;" name="arrow" />
                <van-icon v-if="myList == 1" style="position: relative;top: 0.3rem;float: right;" name="arrow-down" />
            </div>
            <ul v-if="myList == 1" style="width: 96%;margin-left: 2%;">
                <li @click="buildNewList" style="margin-left: 2%;width: 96%;height: 0.7rem;line-height: 0.7rem;font-size: 0.3rem;text-align: left;">
                    新建歌单
                    <van-icon style="position: relative;top: 0.05rem;" name="plus" />
                </li>
                <li class="recommendListmain" @click="getList(list.id,list.name)" v-for="(list, item) in musicList" :key="item" v-if="list.userId == userId">
                    <div style="float:left;width: 1.8rem;height: 100%;">
                        <img :src="list.coverImgUrl" alt="" style="width: 1.3rem;height: 1.3rem;margin-top: 0.1rem;">
                    </div>
                    <div style="text-align: left;padding-left: 0.2rem;float: left;width: 7rem;height: 100%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
                        <span style="font-size: 0.4rem;line-height: 1.5rem;">{{ list.name }}</span>
                    </div>
                </li>
            </ul>
            <div @click="loveApear()" style="text-align: left;padding-left: 2%;width: 96%;height: 1rem;margin-left: 2%;line-height: 1rem;">
                我收藏的歌单
                <van-icon v-if="loveList == 0" style="position: relative;top: 0.3rem;float: right;" name="arrow" />
                <van-icon v-if="loveList == 1" style="position: relative;top: 0.3rem;float: right;" name="arrow-down" />
            </div>
            <ul v-if="loveList == 1" style="width: 96%;margin-left: 2%;clear: both;">
                <li @touchstart="startdele(list.id)" @touchend="enddele" @touchmove="enddele" class="recommendListmain" @click="getList(list.id,list.name)" v-for="(list, item) in musicList" :key="item" v-if="list.userId != userId">
                    <div style="float:left;width: 1.8rem;height: 100%;">
                        <img :src="list.coverImgUrl" alt="" style="width: 1.3rem;height: 1.3rem;margin-top: 0.1rem;">
                    </div>
                    <div style="text-align: left;padding-left: 0.2rem;float: left;width: 7rem;height: 100%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
                        <span style="font-size: 0.4rem;line-height: 1.5rem;">{{ list.name }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';

export default {
    data() {
        return {
            musicList: [],
            userId:'',
            myList: '0',
            loveList: '0',
            // 新建个单名称
            newlistName: '',
            show: false,
            // 定时器
            timer: null,
            deleteList: false,
            deleteId: '',
            number: '1'
        }
    },
    computed: {
        
    },
    mounted() {
        this.getMusicList()
        this.getgouhao()
    },
    methods: {
        getgouhao(){
            axios.get('/api/user/playlist?uid=48353&limit=1000').then((res)=>{
                console.log(res)
            })
        },
        getMusicList(){
            const that = this
            axios.get('/api/login/status').then((res)=>{
                that.userId = res.data.profile.userId
                that.musicInfo()
            }).catch(function(error){
                if(error.response.data.code === 301){
                    that.$router.push({path:'/Login'})
                }
            })
        },
        musicInfo(){
            axios.post('/api/user/playlist?uid=' + this.userId + '&timestamp=' + Math.random()*100,{
                uid:this.userId
            }).then((res)=>{
                this.musicList = res.data.playlist
                console.log(res)
            })
        },
        getList(id,name){
            this.$router.push({path:'/listenList',query:{id:id,top:name}})
        },
        //  排行
        ranking(){
            this.$router.push({path: '/ranking'})
        },
        // 歌单
        gomusicList(){
            this.$router.push({path: '/musicList'})
        },
        // 歌手
        singer(){
            this.$router.push({path: '/singer'})
        },
        //  专辑
        special(){
            this.$router.push({path: '/special'})
        },
        apearence(){
            if(this.myList == '1') this.myList = '0'
            else if(this.myList == '0') this.myList = '1'
        },
        loveApear(){
            if(this.loveList == '1') this.loveList = '0'
            else if(this.loveList == '0') this.loveList = '1'
        },
        buildNewList(){
            this.show = true
        },
        createlist(){
            axios.post('/api/playlist/create?name=' + this.newlistName).then((res)=>{
                console.log(res)
            })
        },
        // 开始按下去的时候设置定时器，定时器开始计时
        startdele(id){
            var that = this
            console.log('开始')
            clearTimeout(this.timer);
            this.timer = window.setTimeout(function(){
                that.deleteList = true
                that.deleteId = id
            },600);//这里设置定时
        },
        // 进行滑动或者手指拿开清除定时器
        enddele(){
            console.log('结束')
            clearTimeout(this.timer);
        },
        deleList(){
            console.log(this.deleteId)
            axios.post('/api/playlist/subscribe?t=2&id=' + this.deleteId).then((res)=>{
                console.log(res)
                if(res.data.code == 200) Toast('删除成功！')
            })
        }
    }
}
</script>

<style scoped>
.musiclist{
    list-style: none;
    height: 1.5rem;
    font-size: 0.4rem;
}
.pai {
    height: 3rem;
    width: 100%;
    overflow: hidden;
    padding-top: 0.7rem;
    border-bottom: 0.5rem solid rgb(245,245,245);
}
.iconPai {
    font-size: 1rem;
    color: rgb(255,0,51);
}
.recommendListmain{
    width: 100%;
    height: 1.5rem;
    background: rgb(245,245,245);
}
</style>