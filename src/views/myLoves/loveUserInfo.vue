<template>
    <div>
        <div :style="{backgroundImage: 'url(' + loveUserInfo.backgroundUrl + ')',overflow:'hidden',backgroundSize: '135%',height:'6.5rem','text-align':'center'}">
            <div :style="{height: '1rem',width: '100%'}">
                <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            </div>
            <div :style="{height: '3rem',width: '100%',textAlign: 'left',paddingLeft: '0.3rem',paddingTop: '0.2rem'}">
                <img :style="{height: '2.5rem',width: '2.5rem',borderRadius: '50%'}" :src="loveUserInfo.avatarUrl" alt="">
                <span :style="{marginTop: '0.1rem',marginLeft: '0.2rem',clear: 'both',display: 'inline-block',height: '0.4rem',width: '1rem',borderRadius: '1rem',background: 'rgba(255,255,255,0.5)',color: 'white',lineHeight: '0.4rem',textAlign: 'center'}">Lv.{{ loveUserInfoall.level }}</span>
            </div>
            <div :style="{height: '2.5rem',width: '100%'}">
                <div :style="{paddingTop: '0.2rem',height: '0.8rem',width: '100%',textAlign: 'left',color: 'white',fontSize: '0.4rem',paddingLeft: '0.3rem'}">
                    {{ loveUserInfo.nickname }}
                </div>
                <div :style="{lineHeight: '0.6rem',height: '0.8rem',width: '100%',color: 'rgb(170,170,170)',fontSize: '0.3rem'}">
                    <span :style="{float: 'left',marginLeft: '0.3rem'}">关注 {{ loveUserInfo.followeds }} | 粉丝 {{ loveUserInfo.follows }}</span>
                    <span :style="{float: 'right',marginRight: '0.3rem'}">{{ loveUserInfo.followTime }}</span>
                </div>
                <div style="lineHeight: 0.8rem;clear: both;height: 0.8rem;width: 90%;color: rgb(170,170,170);font-size: 0.3rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                    <p :style="{float: 'left',marginLeft: '0.3rem'}">ta说--{{ loveUserInfo.signature }}</p>
                </div>
            </div>
        </div>
        <div :style="{height: '1rem',width: '100%',background: 'rgb(51,51,51)'}">
            <li @click="goLists()" :class="userChange ? 'userChanges isChange' : 'userChanges'">ta的歌单</li>
            <li @click="gobeh()" :class="!userChange ? 'userChanges isChange' : 'userChanges'">ta的动态</li>
        </div>
        
        <div v-if="userChange">
            <div @click="apearence()" style="text-align: left;padding-left: 2%;width: 96%;height: 1rem;margin-left: 2%;line-height: 1rem;">
                ta创建的歌单
                <van-icon v-if="taList == 0" style="position: relative;top: 0.3rem;float: right;" name="arrow" />
                <van-icon v-if="taList == 1" style="position: relative;top: 0.3rem;float: right;" name="arrow-down" />
            </div>
            <ul v-if="taList == 1" style="width: 96%;margin-left: 2%;">
                <li class="recommendListmain" @click="getList(list.id,list.name)" v-for="(list, item) in loveUserLists" :key="item" v-if="list.creator.userId == userId">
                    <div style="float:left;width: 1.8rem;height: 100%;">
                        <img :src="list.coverImgUrl" alt="" style="width: 1.3rem;height: 1.3rem;margin-top: 0.1rem;">
                    </div>
                    <div style="text-align: left;padding-left: 0.2rem;float: left;width: 7rem;height: 100%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
                        <span style="font-size: 0.4rem;line-height: 1.5rem;">{{ list.name }}</span>
                    </div>
                </li>
            </ul>
            <div @click="loveApear()" style="text-align: left;padding-left: 2%;width: 96%;height: 1rem;margin-left: 2%;line-height: 1rem;">
                ta收藏的歌单
                <van-icon v-if="loveList == 0" style="position: relative;top: 0.3rem;float: right;" name="arrow" />
                <van-icon v-if="loveList == 1" style="position: relative;top: 0.3rem;float: right;" name="arrow-down" />
            </div>
            <ul v-if="loveList == '1'" style="width: 96%;margin-left: 2%;">
                <li class="recommendListmain" @click="getList(list.id,list.name)" v-for="(list, item) in loveUserLists" :key="item" v-if="list.userId != userId">
                    <div style="float:left;width: 1.8rem;height: 100%;">
                        <img :src="list.coverImgUrl" alt="" style="width: 1.3rem;height: 1.3rem;margin-top: 0.1rem;">
                    </div>
                    <div style="text-align: left;padding-left: 0.2rem;float: left;width: 7rem;height: 100%;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">
                        <span style="font-size: 0.4rem;line-height: 1.5rem;">{{ list.name }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 动态 -->
        <div v-if="!userChange"  :style="{width: '100%',background: 'rgb(250,250,250)'}">
            <li v-for="(say, item) in saysay" :key="item" :style="{width: '96%',minHeight: '3.5rem',marginLeft: '2%',listStyle: 'none',marginTop: '0.2rem',background: 'white'}">
                <div :style="{width: '100%',height: '1.5rem',background: 'white'}">
                    <img v-lazy="say.user.avatarUrl" alt="" :style="{float: 'left',widht: '1.3rem',height: '1.3rem',borderRadius: '50%'}">
                    <span :style="{float: 'left',fontSize: '0.3rem',marginTop: '0.2rem',marginLeft: '0.2rem'}">{{ say.user.nickname }}</span>
                    <span :style="{float: 'right',fontSize: '0.2rem',color: 'rgb(200,200,200)',marginTop: '0.2rem'}">
                        {{ say.isTime }}
                    </span>
                    <div v-if="userId == myId" @click="delet(say.id)" :style="{clear: 'right',width: '2rem',float: 'right',color: 'rgb(61,162,254)',marginTop: '0.1rem'}">删除</div>
                </div>
                <div v-if="say.all.msg" :style="{paddingLeft: '0.5rem',textAlign: 'left',lineHeight: '0.5rem',width: '100%',minHeight: '0.5rem',background: 'white'}">
                    {{ say.all.msg }}
                </div>
                <div v-if="say.pics.length != 0" :style="{width: '100%',minHeight: '2.9rem',paddingLeft: '0.5rem'}">
                    <img @click="lookingImg(img.pcSquareUrl)" v-lazy="img.originUrl" alt="" v-for="(img, item) in say.pics" :key="item" :style="{width: '2.7rem',height: '2.7rem',marginTop: '0.1rem',marginRight: '0.1rem',float: 'left'}">
                </div>
                <div v-if="say.all.song" :style="{clear: 'both',marginLeft: '2%',width: '96%',height: '1.5rem',background: 'rgb(250,250,250)'}">
                    <img v-lazy="say.all.song.album.picUrl" alt="" :style="{float: 'left',marginLeft: '3%',float: 'left',widht: '1.3rem',height: '1.3rem',marginTop: '0.1rem'}">
                    <div :style="{float: 'left',height: '0.8rem',width: '70%',fontSize: '0.4rem',textAlign: 'left',marginLeft: '0.4rem',lineHeight: '1rem'}">
                        {{ say.all.song.name }}
                    </div>
                    <div  :style="{float: 'left',height: '0.7rem',width: '70%',fontSize: '0.3rem',textAlign: 'left',marginLeft: '0.4rem'}">
                        <span v-for="(author, item) in say.all.song.album.artists" :key="item">
                            {{ author.name }}..
                        </span>
                    </div>
                </div>
                <div v-if="say.all.video" :style="{clear:'left',width: '100%',minHeight: '1.5rem',background: 'white'}">
                    <img :src="say.all.video.coverUrl" alt="" style="width: 90%">
                </div>
                <div v-if="say.all.event" :style="{clear: 'left',width: '100%',minHeight: '1.5rem',background: 'rgb(240,240,240)',textAlign: 'left'}">
                    <span style="color: rgb(61,162,254)">{{ say.all.event.user.nickname }}：</span>{{ JSON.parse(say.all.event.json).msg }}
                </div>
                <div v-if="say.all.resource" :style="{clear: 'left',width: '100%',minHeight: '1.5rem',background: 'white',background: 'rgb(240,240,240)',textAlign: 'left'}">
                    {{ say.all.resource.content }}
                </div>
                <!-- 点赞评论转发 -->
                <div :style="{clear: 'left',width: '100%',height: '1rem',background: 'white'}">
                    <div @click="loveSay(say.info.threadId,say.info.liked,item)" :style="{lineHeight: '1.2rem',float: 'left',width: '33.3%',height: '100%'}">
                        <van-icon v-if="!say.info.liked" name="thumb-circle-o" :style="{fontSize: '0.5rem',color: 'rgb(150,150,150)'}"/>
                        <van-icon v-if="say.info.liked" name="thumb-circle-o" :style="{fontSize: '0.5rem',color: 'red'}"/>
                        <span style="position: relative;bottom: 0.1rem;color: rgb(150,150,150)">{{ say.info.likedCount }}</span>
                    </div>
                    <div @click="comment(say.info.threadId)" :style="{lineHeight: '1.2rem',float: 'left',width: '33.3%',height: '100%',color: 'rgb(150,150,150)'}">
                        <van-icon name="chat-o" :style="{fontSize: '0.5rem'}"/>
                        <span style="position: relative;bottom: 0.1rem">{{ say.info.commentCount }}</span>
                    </div>
                    <div :style="{lineHeight: '1.2rem',float: 'left',width: '33.3%',height: '100%',color: 'rgb(150,150,150)'}">
                        <van-icon name="share" :style="{fontSize: '0.5rem'}"/>
                        <span @click="copyIt(say.id)" style="position: relative;bottom: 0.1rem">转发</span>
                    </div>
                </div>
            </li>
        </div>
        <!-- 图片预览 -->
        <van-image-preview
        v-model="show"
        :images="images"
        >
        
        </van-image-preview>
        <van-dialog
        v-model="showCopy"
        title="动态转发"
        show-cancel-button
        confirm-button-color="rgb(255,0,51)"
        confirm-button-text="转发"
        @confirm="copySay"
        >
            <van-cell-group>
                <van-field v-model="copyWord.value" placeholder="我的意见" />
            </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import { Dialog, Toast } from 'vant';

export default {
    data() {
        return {
            userId: '',
            myId: '',
            // 好友的所有信息
            loveUserInfoall: {

            },
            // 好友所有信息里的一个信息对象
            loveUserInfo: {

            },
            // 好友的歌单
            loveUserLists: [

            ],
            // 好友的动态
            saysay: [

            ],
            // 更改切换好友信息和好友动态的索引值
            userChange: true,
            // 好友的创建歌单展开或合起
            taList: '1',
            // 好友的收藏的歌单展开或者合起
            loveList: '0',
            // 是否打开图片预览
            show: false,
            // 预览图片的url
            images: [],
            // 转发确认
            showCopy: false,
            copyWord:{
                id: '',
                value: '',
                userId: ''
            }
        }
    },
    mounted() {
        this.userId = this.$route.query.id
        this.getMyId()
        this.getUserInfo()
        this.getUserMusicList()
    },
    methods: {
        goUp(){
            history.go(-1)  
        },
        getMyId(){
            axios.get('/api/login/status').then((res)=>{
                this.myId = res.data.profile.userId
            })
        },
        getUserInfo(){
            axios.post('/api/user/detail?uid=' + this.userId).then((res)=>{
                console.log(res)
                this.loveUserInfoall = res.data
                this.loveUserInfo = res.data.profile
            })
        },
        getUserMusicList(){
            axios.post('/api/user/playlist?uid=' + this.userId + '&limit=1000').then((res)=>{
                console.log(res)
                this.loveUserLists = res.data.playlist
            })
        },
        goLists(){
            this.userChange = true
        },
        gobeh(){
            this.userChange = false 
            if(this.saysay.length == 0){
                axios.post('/api/user/event?uid=' + this.userId + '&timestamp=' + Math.random()*100).then((res)=>{
                    console.log(res)
                    this.saysay = res.data.events
                    for(let i = 0;i < this.saysay.length;i ++){
                        this.saysay[i].all = JSON.parse(this.saysay[i].json)
                    }
                    for(let i = 0;i < this.saysay.length;i ++){
                        let time = new Date(this.saysay[i].showTime)
                        let year = time.getFullYear()
                        let month = time.getMonth() + 1
                        month = month < 10 ? ('0' + month) : month;
                        let day = time.getDate()
                        day = day < 10 ? ('0' + day) : day
                        let hour = time.getHours()
                        hour = hour < 10 ? ('0' + hour) : hour
                        let min = time.getMinutes()
                        min = min < 10 ? ('0' + min) : min
                        let times = year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + min
                        this.saysay[i].isTime = times
                    }
                })
            }
        },
        loveApear(){
            if(this.loveList == '1') this.loveList = '0'
            else if(this.loveList == '0') this.loveList = '1'
        },
        getList(id,name){
            this.$router.push({path:'/listenList',query:{id:id,top:name}})
        },
        apearence(){
            if(this.taList == '1') this.taList = '0'
            else if(this.taList == '0') this.taList = '1'
        },
        // 进行预览图片
        lookingImg(url){
            this.images[0] = url
            this.show = true
        },
        // 为动态点赞
        loveSay(id,liked, item){
            let that = this
            if(liked == false){
                axios.post('/api/resource/like?t=1&type=6&threadId=' +id).then((res)=>{
                    console.log('点赞成功',res)
                    that.saysay[item].info.liked = true
                    that.saysay[item].info.likedCount ++
                })
            }
            else if(liked == true){
                axios.post('/api/resource/like?t=0&type=6&threadId=' +id).then((res)=>{
                    console.log('取消点赞',res)
                    that.saysay[item].info.liked = false
                    that.saysay[item].info.likedCount --
                })
            }
        },
        comment(id){
            this.$router.push({path: '/loveUserSayCom',query:{id: id}})
        },
        copyIt(id){
            this.copyWord.id = id
            this.showCopy = true
        },
        copySay(){
            var that = this
            axios.get('/api/login/status').then((res)=>{
                if(res.data.code == 200){
                    that.copyWord.userId = res.data.profile.userId
                    axios.post('/api/event/forward?evId=' + that.copyWord.id + '&uid=' + that.userId + '&forwards=' + that.copyWord.value).then((res1)=>{
                        if(res.data.code == 200)
                        Toast('转发成功')
                    })
                }
            })
        },
        delet(id){
            Dialog.confirm({
                title: '确认删除该动态？',
                confirmButtonColor: '#FF0033',
                confirmButtonText: '删除'
            }).then(() => {
                axios.post('/api/event/del?evId=' + id).then((res)=>{
                    if(res.data.code == 200)
                    Toast('删除成功')
                })
            }).catch(() => {
                
            });
        }
    },
}
</script>

<style scoped>
.iconmusicList {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: white;
}
.userChanges {
    color: rgb(170, 170, 170);
    height: 100%;
    width: 50%;
    float: left;
    line-height: 1rem;
    list-style: none;
    text-align: center;
}
.isChange {
    color: white;
}
.recommendListmain{
    width: 100%;
    height: 1.5rem;
    background: rgb(245,245,245);
}
</style>