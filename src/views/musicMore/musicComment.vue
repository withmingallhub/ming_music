<template>
    <div>
        <div style=";background: #FF0033;overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="icon" />
            <span class="topName">{{ playMusic.musicName }}</span>
        </div>
        <van-cell-group
        :style="{width: '80%',float: 'left'}"
        >
            <van-field v-model="writeComment" placeholder="快来发表你的意见" />
        </van-cell-group>
        <van-button @click="sendComment" size="small" type="info" style="margin-top: 0.2rem">评论</van-button>
        <div>
            <ul style="width: 100%;">
                <li style="width:40%;float: left;margin-left: 0.2rem;margin-bottom:0.3rem;"><span style="float: left;margin-left: 0.2rem;font-weight: 700">精彩评论</span></li>
                <li class="comment" v-for="(hotComment, item) in hotComments" :key="item">
                    <div style="width:15%;height: 2rem;float: left;">
                        <img @click="goUserInfo(hotComment.user.userId)" class="imgHead" v-lazy="hotComment.user.avatarUrl" alt="">
                    </div>
                    <div class="commentRight">
                        <div class="commentName">
                            <span style="float: left;line-height: 0.5rem;font-size:0.3rem;">{{ hotComment.user.nickname }}</span>
                            <br>
                            <span style="float:left;font-size: 0.1rem;line-height:0.4rem;">{{ hotComment.timeDay }}</span>
                            <span @click="send" style="position:relative;bottom:0.5rem;float: right;font-size:0.3rem;color: #0c73c2;margin-left: 0.3rem;">回复</span>
                            <span style="position:relative;bottom:0.5rem;float: right;line-height: 0.5rem;font-size:0.3rem;">{{ hotComment.likedCount }}</span>
                            <i @click="liked(hotComment, item, 'hot')" :class="hotComment.liked == false ? 'likedNo' : 'liked'" class="fa fa-thumbs-o-up"></i>
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


                <li style="width:40%;float: left;margin-left: 0.2rem;margin-top: 1rem;margin-bottom:0.3rem;"><span style="float: left;margin-left: 0.2rem;font-weight: 700">最新评论</span></li>
                <li class="comment" v-for="(newComment, item1) in newComments" :key="item1 + 15">
                    <div style="width:15%;height: 2rem;float: left;">
                        <img @click="goUserInfo(newComment.user.userId)" class="imgHead" v-lazy="newComment.user.avatarUrl" alt="">
                    </div>
                    <div class="commentRight">
                        <div class="commentName">
                            <span style="float: left;line-height: 0.5rem;font-size:0.3rem;">{{ newComment.user.nickname }}</span>
                            <br>
                            <span style="float:left;font-size: 0.1rem;line-height:0.4rem;">{{ newComment.timeDay }}</span>
                            <span @click="send" style="position:relative;bottom:0.5rem;float: right;font-size:0.3rem;color: #0c73c2;margin-left: 0.3rem;">回复</span>
                            <span style="position:relative;bottom:0.5rem;float: right;line-height: 0.5rem;font-size:0.3rem;">{{ newComment.likedCount }}</span>
                            <i @click="liked(newComment, item1, 'new')" :class="newComment.liked == false ? 'likedNo' : 'liked'" class="fa fa-thumbs-o-up"></i>
                        </div>
                        <div class="commentWord">
                            <span style="float:left;text-align: left;">{{ newComment.content }}</span>
                        </div>
                        <!-- 如果有回复就显示出来 -->
                        <div class="replied" v-if="newComment.beReplied[0]">
                            <span style="line-height:0.6rem;font-size: 0.2rem;color:#0c73c2;float:left;">{{ newComment.beReplied[0].user.nickname }} :</span>
                            <span style="line-height: 0.6rem;">{{ newComment.beReplied[0].content }}</span>
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
            playMusic:{
                i:'',
                musicName:'',
                musicId:'',
                img: '',
                write:'',
                picUrl: '',
            },
            hotComments: [],
            newComments: [],
            writeComment:''
        }
    },
    mounted() {
        this.playMusic = this.$route.query.playMusic
        this.getComment()
    },
    methods:{
        goUp(){
            history.go(-1)
        },
        getComment(){
            axios.post('/api/comment/music?id=' + this.playMusic.musicId + '&limit=20&timestamp=' + Date.now()).then((res)=>{
                this.hotComments = this.getTime(res.data.hotComments)
                this.newComments = this.getTime(res.data.comments)
            })
        },
        getTime(list){
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
        // 为评论点赞
        liked(comment, item, type){
            let like = comment.liked
            if(type == 'hot'){
                this.hotComments[item].liked = !like
                if(!like)
                    this.hotComments[item].likedCount ++
                else if(like)
                    this.hotComments[item].likedCount --
            }
            else if(type == 'new'){
                this.newComments[item].liked = !like
                if(!like)
                    this.newComments[item].likedCount ++
                else if(like)
                    this.newComments[item].likedCount --
            }
            let liked
            if(like === false) liked = 1
            else liked = 0
            axios.post('/api/comment/like?id=' + this.playMusic.musicId + '&cid=' + comment.commentId + '&t=' + liked + '&type=0').then((res)=>{
            })
        },
        // 发送评论、
        sendComment(){
            if(this.writeComment){
                axios.post('/api/comment?t=1&type=0&id=' + this.playMusic.musicId + '&content=' + this.writeComment).then((res)=>{
                    if(res.data.code == 200)
                    Toast('发送成功')
                    this.writeComment = ''
                })
            }
        },
        // 没有接口
        send(){
            Toast('暂时没有回复评论的接口，但是你可以评论歌曲或者点赞哦')
        },
        goUserInfo(id){
            this.$router.push({path: '/loveUserInfo',query:{id: id}})
        }
    }
}
</script>

<style scoped>
.icon {
    color: white;
    font-size: 0.5rem;
    float: left;
    line-height: 1rem;
}
.topName {
    color:white;
    display: inline-block;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    line-height: 1rem;
    font-size: 0.4rem;
    clear: both;
    margin-left: -0.5rem;
}
.comment {
    width:100%;
    min-height: 2rem;
    clear: both;
    margin-top: 0.2rem;
    list-style: none;
}
.commentRight {
    min-height: 2rem;
    width: 80%;
    float:left;
    padding-bottom: 0.3rem; 
    margin-bottom: 0.3rem;
    border-bottom: 1px solid rgb(170, 170, 170);
}
.imgHead {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
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