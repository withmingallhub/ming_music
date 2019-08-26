<template>
    <div> 
        <video width="100%" :src="playMV.playMV" controls="controls" autoplay="autoplay">
        </video> 
        <div>
            <div style="min-height: 3.25rem;width: 100%;">
                <div style="word-wrap: break-word;word-break: break-all;overflow: hidden;text-align: left;min-height: 0.75rem;width: 100%;margin-left: 0.2rem;margin-right: 0.2rem;">
                    {{ playMV.name }}
                </div>
                <div style="text-align: left;width: 100%;height: 2.5rem;">
                    <p style="color: rgb(160,160,160);margin-left: 0.2rem;">发布时间：{{ playMV.pushTime }}---播放：{{ playMV.look }}</p>
                    <ul>
                        <li @click="good" style="text-align: center;width: 33%;height: 2rem;float:left;">
                            <van-icon class="inconPlayMV" name="thumb-circle-o" />
                            <p>{{ playMV.good }}</p>
                        </li>
                        <li @click="loveIt" style="text-align: center;width: 33%;height: 2rem;float:left;">
                            <van-icon class="inconPlayMV" name="bookmark-o" />
                            <p>{{ playMV.love }}</p>
                        </li>
                        <a style="color: black;text-align: center;width: 33%;height: 2rem;float:left;display: block;" href="#div1" onclick="javascript:location.replace(this.href);">
    
                                <van-icon class="inconPlayMV" name="comment-o" />
                                <p>{{ playMV.comment }}</p>
                            
                        </a>
                    </ul>
                </div>
                <div style="height:10rem;width: 100%;">
                    <li @click="lookMV(likes)" class="likesMV" v-for="(likes, item) in likesMV" :key="item">
                        <div style="float:left;width: 36%;height: 100%;">
                            <img style="height:96%;margin-top: 2%;width: 94%;" :src="likes.cover" alt="">
                        </div>
                        <div style="word-wrap: break-word;word-break: break-all;float: left;width: 62%;height: 100%;text-align: left;overflow: hidden;">
                            {{ likes.name }}
                        </div>
                    </li>
                </div>
            </div>
            <!-- 评论 -->
            <ul id="div1" style="width: 100%;">
                <li style="width:40%;float: left;margin-left: 0.2rem;border-bottom: 1px solid black;margin-bottom:0.3rem;"><span style="float: left;margin-left: 0.2rem;font-weight: 700">精彩评论</span></li>
                <li class="comment" v-for="(hotComment, item) in comment" :key="item">
                    <div style="width:15%;height: 2rem;float: left;">
                        <img class="imgHead" :src="hotComment.user.avatarUrl" alt="">
                    </div>
                    <div class="commentRight">
                        <div class="commentName">
                            <span style="float: left;line-height: 0.5rem;font-size:0.3rem;">{{ hotComment.user.nickname }}</span>
                            <br>
                            <span style="float:left;font-size: 0.1rem;line-height:0.4rem;">{{ hotComment.timeDay }}</span>
                            <span @click="send" style="position:relative;bottom:0.5rem;float: right;font-size:0.3rem;color: #0c73c2;margin-left: 0.3rem;">回复</span>
                            <span style="position:relative;bottom:0.5rem;float: right;line-height: 0.5rem;font-size:0.3rem;">{{ hotComment.likedCount }}</span>
                            <i @click="liked(hotComment, item,)" :class="hotComment.liked == false ? 'likedNo' : 'liked'" class="fa fa-thumbs-o-up"></i>
                        </div>
                        <div class="commentWord">
                            <span style="float:left;text-align: left;">{{ hotComment.content }}</span>
                        </div>
                        <!-- 如果有回复就显示出来 -->
                        <div class="replied" v-if="hotComment.beReplied[0]">
                            <span style="line-height:0.6rem;font-size: 0.2rem;color:#0c73c2;float:left;">{{ hotComment.beReplied[0].user.nickname }} :</span>
                            <span style="line-height: 0.6rem;">{{ hotComment.beReplied[0].content }}</span>
                        </div>
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
            playMV:{
                id: '',
                name: '',
                playMV: '',
                MVurlmin: '',
                MVurlsmall: '',
                MVurlheigh: '',
                MVurlmax: '',
                MVurlid: '',
                // 发布时间
                pushTime: '',
                // 播放量
                look: '',
                // 收藏数量
                love: '',
                // 评论量
                comment: '',
                // 点赞量
                good: ''

            },
            likesMV: [],
            comment: []
        }
    },
    mounted() {
        this.playMV.id = this.$route.query.id
        this.getInfo()
    },
    methods: {
        // 获取推荐MV
        getInfo(){
            axios.post('/api//mv/detail?mvid=' + this.playMV.id).then((res)=>{
                console.log(res)
                this.playMV.MVurlmin = res.data.data.brs[240]
                this.playMV.MVurlsmall = res.data.data.brs[480]
                this.playMV.MVurlheigh = res.data.data.brs[720]
                this.playMV.MVurlmax = res.data.data.brs[1080]
                this.playMV.name = res.data.data.name
                this.playMV.pushTime = res.data.data.publishTime
                this.playMV.playMV = this.playMV.MVurlheigh
                this.playMV.look = res.data.data.playCount
                this.playMV.love = res.data.data.subCount
                this.playMV.comment = res.data.data.commentCount
                this.playMV.good = res.data.data.likeCount
                axios.post('/api//mv/url?id=' + this.playMV.id).then((res1)=>{
                    this.playMV.MVurlid = res1.data.data.url
                    this.getlikeMV()
                })
            })
        },
        good(){
            Toast('由于后台没有返回是否已经点赞,此功能暂不支持')
        },
        loveIt(){
            Toast('由于后台没有返回是否已经收藏,此功能暂不支持')
        },
        // 获取MV信息
        getlikeMV(){
            axios.post('/api//simi/mv?mvid=' + this.playMV.id + '&limit=5').then((res)=>{
                this.likesMV = res.data.mvs
                axios.post('/api/comment/mv?id=' + this.playMV.id).then((res1)=>{
                    // console.log(res1)
                    this.comment = this.setTime(res1.data.comments)
                })
            })
        },
        // 将时间转化成年月日
        setTime(list){
            for(let i = 0;i < list.length;i ++){
                var date = new Date(list[i].time)
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                month = month < 10 ? ('0' + month) : month;
                let day = date.getDate()
                day = day < 10 ? ('0' + day) : day
                let hour = date.getHours()
                hour = hour < 10 ? ('0' + hour) : hour
                let min = date.getMinutes()
                min = min < 10 ? ('0' + min) : min
                let time = year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + min
                list[i].timeDay = time
            }
            return list
        },
        // 给评论回复，暂不支持
        send(){
            Toast('暂不支持')
        },
        // 查看更多音乐
        lookMV(MV){
            this.playMV.id = MV.id
            this.getInfo()
        },
        // 为评论点赞
        liked(comment, item, type){
            let like = comment.liked
            this.comment[item].liked = !like
            if(!like)
                this.comment[item].likedCount ++
            else if(like)
                this.comment[item].likedCount --
            let liked
            if(like === false) liked = 1
            else liked = 0
            axios.post('/api/comment/like?id=' + this.playMV.id + '&cid=' + comment.commentId + '&t=' + liked + '&type=1').then((res)=>{
            })
        },

    },
}
</script>

<style lang="">
.inconPlayMV {
    font-size: 0.7rem;
    margin-top: 0.3rem;
}
.likesMV {
    width: 100%;
    height: 2rem;
    list-style: none;
}
.comments {
    width: 100%;
    list-style: none;
    min-height: 2rem;
    border: 1px solid black;
}
.comment {
    width:100%;
    min-height: 2rem;
    clear: both;
    margin-top: 0.2rem;
    list-style: none;
}
.imgHead {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
}
.commentRight {
    min-height: 2rem;
    width: 80%;
    float:left;
    padding-bottom: 0.3rem;
    padding-top: 0.3rem;
    border-bottom: 1px solid rgb(170, 170, 170);
}
.commentName {
    height: 0.9rem;
    width: 100%;
}
.commentWord {
    min-height:1rem;
    width: 90%;
    padding-top: 0.2rem;
}
.replied {
    width: 90%;
    min-height: 0.6rem;
    padding-left: 0.2rem;
    background: rgb(244, 244, 244);
    text-align: left;
}
.likedNo {
    float: right;
    line-height: 0.5rem;
    font-size:0.3rem;
    position:relative;
    bottom:0.5rem;
}
.liked {
    float: right;
    line-height: 0.5rem;
    font-size:0.3rem;
    color:orange;
    position:relative;
    bottom:0.5rem;
}
</style>