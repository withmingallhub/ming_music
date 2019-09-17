<template>
    <div>
        <div style="height: 1.2rem;width: 100%;background: #FF0033;">
            <van-icon @click="goUp" name="arrow-left" class="iconsearch" />
            <van-search 
            class="searchInput"
            style="height:1.2rem;" 
            background="#FF0033" 
            placeholder="请输入搜索关键词" 
            v-model="value" 
            @focus="hotAndHist"
            maxlength="40"
            autofocus="autofocus"
            @search="onSearch"
            />
        </div>
        <div v-if="!show">
            <div v-if="suggestDiv && value" style="postition: absolute;top: 1.2rem;width: 96%;margin-left: 2%;background: rgb(249,249,249)">
                <ul>
                    <li @click="searchHot(suggestInfo.keyword)" style="height:1rem;width:100%;" v-for="(suggestInfo, item) in suggestText" :key="item + 10">
                        <span style="line-height: 1rem;float: left;margin-left: 0.3rem;font-size: 0.4rem;">{{ item + 1 }}</span>
                        <span style="line-height: 1rem;float: left;margin-left: 0.4rem;font-size: 0.4rem;">{{ suggestInfo.keyword }}</span>
                    </li>
                </ul>
            </div>
                <div style="width:100%;height: 30rem;margin-top: 0.4rem;"  @touchmove.prevent>
                    <ul>
                        <li style="font-size:0.3rem;font-weight: 800;width: 20%;border-bottom: 1px solid black;margin-bottom: 0.4rem;">热门搜索</li>
                        <li @click="searchHot(hot.first)" class="hotSearch" v-for="(hot, item) in hotsSearch" :key="item">
                            <div>
                                {{ hot.first }}
                                <van-icon v-if="hot.iconType == 1" class="hotOrNew" name="fire" />
                            </div>
                        </li>
                    </ul>
                    <van-loading v-if="jiazai" style="clear:both" type="spinner" color="#1989fa" />
                </div>
        </div>
        <div v-if="show" style="width: 100%;height: 20rem;">
                <ul style="height:0.7rem;width:100%;overflow-y:hidden;display: inline;;white-space:nowrap;overflow-x:scroll;float:left;background: #FF0033">
                    <li @click="Searchmusic('1')" :class="searchType == 1 ? 'searchIs' : 'others'">单曲</li>
                    <li @click="Searchuser('1002')" :class="searchType == 1002 ? 'searchIs' : 'others'">用户</li>
                    <li @click="Searchsinger('100')" :class="searchType == 100 ? 'searchIs' : 'others'">歌手</li>
                    <li @click="Searchspecial('10')" :class="searchType == 10 ? 'searchIs' : 'others'">专辑</li>
                    <li @click="SearchmusicList('1000')" :class="searchType == 1000 ? 'searchIs' : 'others'">歌单</li>
                    <li @click="SearchbroadStation('1009')" :class="searchType == 1009 ? 'searchIs' : 'others'">主播电台</li>
                </ul>
                <div v-if="searchType == 1" style="clear: both;">
                    <li :class="mlist1 === item ? 'playMlist' : 'mlist'" @click="getmusics(li, item)" v-for="(li ,item) in music" :key="item">
                        <span class="musicName" style="margin-right:0.2rem;">{{li.name}}</span>
                        <span style="margin-left:0.2rem;line-height:1.2rem;">{{li.artists[0].name}} - {{ li.album.name }}</span>
                    </li>
                </div>
                <div v-if="searchType == 1002" style="clear: both;">
                    <li @click="goUserInfo(user.userId)" class="users" v-for="(user, item) in user" :key="item">
                        <div style="height: 100%;width: 15%;float:left;">
                            <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  :src="user.avatarUrl" alt="">
                        </div>
                        <div style="height: 100%;width: 68%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                            <div style="clear: both;height: 0.8rem;width: 80%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ user.nickname }}</div>
                            <div style="clear: both;height: 0.6rem;width:80%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ user.signature }}</div>
                            
                        </div>
                        <div @click="loveUser(user.userId, item)" v-if="!user.followed" style="width: 15%;height: 0.8rem;color: rgb(255,0,51);border:1px solid rgb(255,0,51);float:right;line-height: 0.7rem;margin-top:0.3rem;border-radius: 0.3rem;margin-right: 2%;">
                            关注
                        </div>
                        <div @click="noloveUser(user.userId, item)" v-if="user.followed" style="width: 15%;height: 0.8rem;color: rgb(170,170,170);border:1px solid rgb(170,170,170);float:right;line-height: 0.7rem;margin-top:0.3rem;border-radius: 0.3rem;margin-right: 2%;">
                            已关注
                        </div>
                    </li>
                </div>
                <div v-if="searchType == 100" style="clear: both;">
                    <li @click="goSinger(sing)" class="singer" v-for="(sing, item) in singer" :key="item">
                        <div style="float: left;width: 25%;height: 2.5rem;">
                            <img style="width: 2rem;height: 2rem;margin-top: 0.25rem;" :src="sing.img1v1Url" alt="">
                        </div>
                        <div style="float: left;width: 60%;height: 3.5rem;">
                            <div style="width: 80%;height: 2rem;line-height: 2.5rem;font-size: 0.4rem;text-align: left;padding-left: 0.3rem;">
                                {{ sing.name }}
                            </div>
                        </div>
                    </li>
                </div>
                <div v-if="searchType == 10" style="clear: both;">
                    <li @click="goSpecial(spec)" class="users" v-for="(spec, item) in special" :key="item">
                        <div style="height: 100%;width: 15%;float:left;">
                            <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  :src="spec.picUrl" alt="">
                        </div>
                        <div style="height: 100%;width: 80%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                            <div style="clear: both;height: 0.8rem;width: 80%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ spec.name }}</div>
                            <div style="clear: both;height: 0.6rem;width:80%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ spec.artists[0].name }}</div>
                        </div>
                    </li>
                </div>
                <div v-if="searchType == 1000" style="clear: both;">
                    <li @click="getList(list.id,list.name)" class="users" v-for="(list, item) in musicList" :key="item">
                        <div style="height: 100%;width: 15%;float:left;">
                            <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  :src="list.coverImgUrl" alt="">
                        </div>
                        <div style="height: 100%;width: 80%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                            <div style="clear: both;height: 0.8rem;width: 80%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ list.name }}</div>
                            <div style="clear: both;height: 0.6rem;width:80%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ list.trackCount }}首- {{ list.playCount }} 播放- by{{ list.creator.nickname }}</div>
                        </div>
                    </li>
                </div>
                <div v-if="searchType == 1009" style="clear: both;">
                    <li @click="getBroadInfo(broad.id)" class="users" v-for="(broad, item) in broadStation" :key="item">
                        <div style="height: 100%;width: 15%;float:left;">
                            <img style="width:1rem;height:1rem;border-radius: 50%;margin-top: 0.2rem;"  :src="broad.picUrl" alt="">
                        </div>
                        <div style="height: 100%;width: 80%;float: left;border-bottom: 1px solid rgb(230,230,230)">
                            <div style="clear: both;height: 0.8rem;width: 80%;line-height: 0.9rem;float:left;margin-left: 0.4rem;font-size: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align:left;">{{ broad.name }}</div>
                            <div style="clear: both;height: 0.6rem;width:80%;margin-left: 0.4rem;font-size: 0.2rem;line-height: 0.4rem; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;text-align: left;">{{ broad.dj.nickname }}</div>
                        </div>
                    </li>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';

export default {
    data() {
        return {
            value: '',
            show: false,
            hotsSearch:[],
            jiazai: false,
            suggestDiv: false,
            suggestText: [],
            searchType: 1,
            // 搜索单曲
            music:[],
            // 播放的音乐
            mlist1:Number,
            // 搜索用户
            user: [],
            // 搜索歌手
            singer: [],
            // 搜索专辑
            special: [],
            // 搜索歌单
            musicList: [],
            // 搜索电台
            broadStation: []
        }
    },
    watch: {
        value: function(newvalue,oldvalue){
            if(newvalue)
                this.suggest()
        }
    },
    mounted() {
        this.hotSearch()
    },
    methods:{
        goUp(){
            history.go(-1)
        },
        // 搜索
        onSearch(){
            this.jiazai = true
            this.searchType = 1
            axios.post('/api/search?keywords=' + this.value + '&type=1&limit=100').then((res)=>{
                console.log(res)
                this.show = true
                this.jiazai = false
                this.music = res.data.result.songs
                if(this.$store.state.user.playList == this.music)
                    this.mlist1 = this.$store.state.user.playMusic.i
            })
        },
        // 光标自动到搜索框
        hotAndHist(){
            this.show = false
        },
        // 热门搜索
        hotSearch(){
            axios.get('/api/search/hot').then((res)=>{
                this.hotsSearch = res.data.result.hots
            })
        },
        // 点击热搜 进行搜索
        searchHot(text){
            this.value = text
            this.jiazai = true
            this.onSearch()
        },
        // 搜索建议
        suggest(){
            axios.post('/api/search/suggest?keywords= ' + this.value + '&type=mobile').then((res)=>{
                this.suggestText = res.data.result.allMatch
                this.suggestDiv = true
            })
        },
        Searchmusic(item){
            this.searchType = item
        },
        Searchuser(item){
            this.searchType = item
            console.log(item)
            console.log(this.user)
            axios.post('/api/search?keywords=' + this.value + '&type=' + item + '&limit=100&timestamp=' + Math.random()*100).then((res)=>{
                console.log(res)
                this.user = res.data.result.userprofiles
            })
        },
        Searchsinger(item){
            this.searchType = item
            console.log(item)
            console.log(this.singer)
            axios.post('/api/search?keywords=' + this.value + '&type=' + item).then((res)=>{
                console.log(res)
                this.singer = res.data.result.artists
            })
        },
        Searchspecial(item){
            this.searchType = item
            console.log(item)
            console.log(this.special)
            axios.post('/api/search?keywords=' + this.value + '&type=' + item).then((res)=>{
                console.log(res)
                this.special = res.data.result.albums
            })
        },
        SearchmusicList(item){
            this.searchType = item
            console.log(item)
            console.log(this.musicList)
            axios.post('/api/search?keywords=' + this.value + '&type=' + item).then((res)=>{
                console.log(res)
                this.musicList = res.data.result.playlists
            })
        },
        SearchbroadStation(item){
            this.searchType = item
            console.log(item)
            console.log(this.broadStation)
            axios.post('/api/search?keywords=' + this.value + '&type=' + item).then((res)=>{
                console.log(res)
                this.broadStation = res.data.result.djRadios
            })
        },
        getmusics(li, item){
            axios.post('/api/song/detail?ids=' + li.id,{
                id: li.id
            }).then((res)=>{    
                this.mlist1 = item
                this.$store.dispatch('setPlayList', this.music)
                this.$store.dispatch('setlistId', 0)
                this.$emit('getid',li.id,res.data.songs[0].al.picUrl,res.data.songs[0].name, item, res.data.songs[0].dt)
            })
        },
        //  前往主播电台信息页面
        getBroadInfo(id){
            this.$router.push({path: '/broadUserInfo',query:{id: id}})
        },
        // 点击歌手进入详细页面
        goSinger(sing){
            this.$router.push({path: '/singerInfo',query:{id: sing.id,img: sing.img1v1Url,name: sing.name}})
        },
        // 前往歌单
        getList(id,name){
            this.$router.push({path:'/listenList',query:{id:id,top:name}})
        },
        // 前往专辑详细页面
        goSpecial(user){
            this.$router.push({path: '/albumsInfo',query:{id: user.id}})
        },
        loveUser(id, i){
            // 阻止冒泡事件
            window.event.cancelBubble = true
            axios.post('/api/follow?id=' + id +'&t=1').then((res)=>{
                if(res.data.code == 200){
                    this.user[i].followed = true
                    Toast('已关注')
                }
            })
        },
        noloveUser(id, i){
            // 阻止冒泡事件
            window.event.cancelBubble = true
            axios.post('/api/follow?id=' + id +'&t=2').then((res)=>{
                if(res.data.code == 200){
                    this.user[i].followed = false
                    Toast('已取消关注')
                }
            })
        },
        goUserInfo(id){
            this.$router.push({path: '/loveUserInfo',query:{id: id}})
        }
    }
}
</script>

<style>
.iconsearch {
    float:left;
    margin-left:0.2rem;
    line-height: 1.2rem;
    font-size: 0.4rem;
}
.van-search__content {
    background: #FF0033;
}
.van-search__content div.van-cell__value div input{
    color: azure !important
}
.van-search__content div.van-cell__value div input::-webkit-input-placeholder{
    color: rgba(250,250,250,0.7)
}
.van-search__content div.van-cell__value div input::-moz-placeholder{
    color: white;
}
.van-search__content div.van-cell__value div input:-moz-placeholder{
    color: white;
}
.van-search__content div.van-cell__value div input:-ms-input-placeholder{
    color: white;
}
.hotOrNew {
    color: red;
}
.hotSearch {
    height: 0.6rem;
    line-height: 0.6rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    border-radius: 0.3rem;
    margin-bottom: 0.3rem;
    min-width: 1rem;
    background: rgb(237,237,237);
    float: left;
    margin-right: 1rem;
}
.searchInput {
    margin-top: -0.1rem;
}
.searchIs{
    list-style: none;
    height: 0.7rem;
    width: 2rem;
    color: white;
    display: inline-block;
}
.others {
    list-style: none;
    height: 0.7rem;
    width: 2rem;
    color: rgb(220,220,220);
    display: inline-block;
}
.mlist{
    list-style: none;
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    text-align:left;
    padding-left: 0.3rem;
    background: rgb(245, 245, 245);
    border-left: 2px solid white;
}
.playMlist{
    list-style: none;
    height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    text-align:left;
    padding-left: 0.3rem;
    color: #65D25B;
    background: rgb(245, 245, 245);
    border-left: 2px solid #65D25B;
}
.musicName{
    font-size: 0.4rem;
    line-height: 1rem;
}
.users {
    list-style: none;
    height: 1.4rem;
    overflow: hidden;
}
.singer{
    height: 2.5rem;
    width: 100%;
    overflow: hidden;
    list-style: none;
    border-bottom: 1px solid rgb(200, 200, 200);
    margin-right:0.3rem;
}
</style>