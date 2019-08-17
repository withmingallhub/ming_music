<template>
    <div>
        <div style="height: 1.2rem;width: 100%;background: rgb(25, 181, 254);">
            <van-icon @click="goUp" name="arrow-left" class="iconsearch" />
            <van-search 
            class="searchInput"
            style="height:1.2rem;" 
            background="rgb(25, 181, 254)" 
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
                    <li @click="searchHot(suggestInfo.keyword)" style="height:1rem;width:100%;border-bottom: 1px solid rgb(240,240,240)" v-for="(suggestInfo, item) in suggestText" :key="item + 10">
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
                <ul style="overflow: hidden;white-space:nowrap;">
                    <li @click="changerSearchTop('0')" :class="searchType == 0 ? 'searchIs' : 'others'">单曲</li>
                    <li @click="changerSearchTop('1')" :class="searchType == 1 ? 'searchIs' : 'others'">用户</li>
                    <li @click="changerSearchTop('2')" :class="searchType == 2 ? 'searchIs' : 'others'">歌手</li>
                    <li @click="changerSearchTop('3')" :class="searchType == 3 ? 'searchIs' : 'others'">专辑</li>
                    <li @click="changerSearchTop('4')" :class="searchType == 4 ? 'searchIs' : 'others'">歌单</li>
                    <li @click="changerSearchTop('5')" :class="searchType == 5 ? 'searchIs' : 'others'">主播电台</li>
                </ul>
                <div v-if="searchType == 0">
                    单曲
                </div>
                <div v-if="searchType == 1">
                    视频
                </div>
                <div v-if="searchType == 2">
                    歌手
                </div>
                <div v-if="searchType == 3">
                    专辑
                </div>
                <div v-if="searchType == 4">
                    歌单
                </div>
                <div v-if="searchType == 5">
                    主播电台
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            value: '',
            show: false,
            hotsSearch:[],
            jiazai: false,
            suggestDiv: false,
            suggestText: [],
            searchType: 0
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
            axios.post('/api/search?keywords=' + this.value + '&type=1018').then((res)=>{
                console.log(res)
                this.show = true
                this.jiazai = false
            })
        },
        // 光标自动到搜索框
        hotAndHist(){
            this.show = false
        },
        // 热门搜索
        hotSearch(){
            axios.get('/api/search/hot').then((res)=>{
                console.log(res)
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
        changerSearchTop(item){
            this.searchType = item

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
    background: rgb(25, 181, 254)
}
.van-search__content div.van-cell__value div input{
    color: azure !important
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
.searchIs{
    list-style: none;
    float:left;
    height: 0.7rem;
    width: 2rem;
    background: white;
    border:1px solid black;
}
.others {
    list-style: none;
    float:left;
    height: 0.7rem;
    width: 2rem;
    background: orange;
    border:1px solid black;    
}
</style>