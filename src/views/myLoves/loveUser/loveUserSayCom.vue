<template>
    <div>
        <div style=";background: rgb(255,0,51);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconmusicList" />
            <span style="line-height: 1rem;font-size: 0.3rem;color: azure">动态</span>
        </div>
        <van-cell-group
        :style="{width: '80%',float: 'left'}"
        >
            <van-field v-model="myComment" placeholder="发表意见" />
        </van-cell-group>
        <van-button @click="sendComment()" size="small" type="info" style="margin-top: 0.2rem">评论</van-button>
        
        <div style="clear: both">
            <div v-for="(comment, item) in comments" :key="item" :style="{width: '96%',marginLeft: '2%'}">
                <div v-if="comment.beReplied.length == 0" :style="{width: '100%',paddingTop: '0.2rem'}">
                    <div :style="{float: 'left',width: '1.3rem',height: '1.2rem'}">
                        <img @click="goUserInfo(comment.user.userId)" v-lazy="comment.user.avatarUrl" alt="" :style="{width: '1rem',height: '1rem',float: 'left',marginLeft: '0.1rem',borderRadius: '50%'}">
                        
                    </div>
                    <div @click="goUserInfo(comment.user.userId)" :style="{float: 'left',width: '4rem',color: 'rgb(120,120,120)',height: '1.2rem',textAlign: 'left',lineHeight: '0.8rem',paddingLeft: '0.2rem'}">{{ comment.user.nickname }}</div>
                    <div :style="{clear: 'both',textAlign: 'left',paddingLeft: '0.6rem',marginBottom: '0.2rem'}">
                        {{ comment.content }}
                    </div>
                </div>
                <div v-if="comment.beReplied.length != 0" :style="{width: '100%',background: 'rgb(240,240,240)',padding: '0.2rem 0.5rem 0.2rem 0.4rem',textAlign: 'left'}">
                    <div>
                        <span @click="goUserInfo(comment.user.userId)" style="color: rgb(61,162,254)">{{ comment.user.nickname }}:</span>
                    </div>
                    <div>
                        {{ comment.content }}
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'

export default {
    data() {
        return {
            commentId: '',
            comments: [

            ],
            myComment: ''
        }
    },
    mounted() {
        this.commentId = this.$route.query.id
        this.getComment()
    },
    methods: {
        goUp(){
            history.go(-1)
        },
        getComment(){
            axios.post('/api/comment/event?threadId=' + this.commentId + '&timestamp=' + Math.random()*100).then((res)=>{
                console.log(res)
                this.comments =res.data.comments
                this.comments = this.comments.reverse()
                console.log(this.comments)
            })
        },
        goUserInfo(id){
            this.$router.push({path: '/loveUserInfo',query:{id: id}})
        },
        sendComment(){
            Toast('由于接口问题，评论暂时不能使用')
        }
    },
}
</script>

<style scoped>
.iconmusicList {
    float: left;
    font-size: 0.4rem;
    line-height: 1rem;
    color: azure;
}
</style>