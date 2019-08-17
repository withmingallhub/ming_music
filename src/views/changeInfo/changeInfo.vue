<template>
    <div>
        <div style="background: rgb(25, 181, 254);overflow:hidden;height:1rem;text-align:center;">
            <van-icon @click="goUp" name="arrow-left" class="iconInfo" />
            <span style="line-height: 1rem;font-size: 0.4rem;position:relative;right: 0.26rem;">我的信息</span>
        </div>
        <div>
            <div :style="{height: '7rem',border:'1px solid black',backgroundImage: 'url(' + userInfo.profile.backgroundUrl + ')'}">
                <img :src="userInfo.profile.avatarUrl" style="height: 2rem;width:2rem;border-radius: 50%;margin-top: 1rem;margin-left: 0.3rem;" alt="">
                <br>
                <br>
                <span style="color: white">{{ userInfo.profile.nickname }}</span>
            </div>
            <div style="width: 90%;min-height: 5rem;position: relative;left: 5%;">
                <van-cell-group>
                    <van-field label="用户名" style="border-bottom: 1px solid rgb(177,177,177)" v-model="nickname" placeholder="请输入用户名" />
                    <van-field label="签名" style="border-bottom: 1px solid rgb(177,177,177)" v-model="signature" placeholder="个性签名" />
                    <van-field @click="selectSex" label="性别" disabled style="border-bottom: 1px solid rgb(177,177,177)" v-model="sex" placeholder="选择性别" />
                    <van-field @click="selectBirth" label="生日" disabled style="border-bottom: 1px solid rgb(177,177,177)" v-model="birth" placeholder="我的生日" />
                    <van-button @click="changeInfo" style="margin-top:1rem;" size="small" type="primary">保存</van-button>
                </van-cell-group>

            </div>
        </div>
        <!-- 选择性别的地步弹出层 -->
        <van-action-sheet
        v-model="sexShow"
        :actions="sexs"
        cancel-text="取消"
        @select="onSelect"
        />
        <!-- 选择生日的底部弹出层 -->
        <van-popup
        v-model="birthShow"
        position="bottom"
        :style="{ height: '7rem',width: '100%' }"
        >
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="changeBirth"
            @cancel="cancel"
            />
        </van-popup>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';

export default {
    data() {
        return {
            userId: '',
            userInfo: {
                profile: {
                    backgroundUrl: ''
                }
            },
            nickname:'',
            signature:'',
            // 是否显示下边选择性别弹框
            sexShow:false,
            // 发送的性别的code
            sendSex: 0,
            // 性别
            sex: '',
            // 可选择得到性别
            sexs: [
                {
                    code: 0,
                    name: '保密'
                },
                {
                    code: 1,
                    name: '男'
                },
                {
                    code: 2,
                    name: '女'
                }
            ],
            // 是否显示下边选择生日的弹框
            birthShow: false,
            // 发送生日的数据
            sendBirth:'',
            // 页面显示的生日
            birth: '',
            currentDate: new Date(),
            maxDate: new Date(),
            minDate: new Date()
        }
    },
    watch:{

    },
    mounted() {
        this.userId = this.$route.query.userId
        this.getInfo()
        this.getTime()
    },
    methods: {
        // 获取用户信息
        getInfo(){
            const that = this
            axios.post('/api/user/detail?uid=' + that.userId,{
                uid:that.userId
            }).then(function(res){
                that.userInfo = res.data
                that.nickname = res.data.profile.nickname
                that.signature = res.data.profile.signature
                that.sendSex = res.data.profile.gender
                if(that.sendSex == 0)
                    that.sex = '保密'
                else if (that.sendSex == 1)
                    that.sex = '男'
                else if(that.sendSex == 2)
                    that.sex = '女'
                that.sendBirth = res.data.profile.birthday
                let birth = new Date(that.sendBirth)
                let year = birth.getFullYear()
                let month = birth.getMonth() + 1
                month = month < 10 ? ('0' + month) : month;
                let day = birth.getDate()
                day = day < 10 ? ('0' + day) : day
                that.birth = year + '年' + month + '月' + day + '日'
            })
        },
        goUp(){
            history.go(-1)
        },
        onSelect(item){
            this.sexShow = false
            this.sendSex = item.code
            this.sex = item.name
        },
        selectSex(){
            this.sexShow = true
        },
        selectBirth(){
            this.birthShow = true
        },
        getTime(){
            let now = this.maxDate.getTime()
            let tenTime = (365*3+366)*24*60*60*25*1000
            let tenYear = now - tenTime
            let time = new Date(tenYear)
            this.minDate = time
        },
        // 选择了生日后，更新相对数据
        changeBirth(){
            this.sendBirth = new Date(this.currentDate)
            let birth = this.sendBirth
            let year = birth.getFullYear()
            let month = birth.getMonth() + 1
            month = month < 10 ? ('0' + month) : month;
            let day = birth.getDate()
            day = day < 10 ? ('0' + day) : day
            this.birth = year + '年' + month + '月' + day + '日'
            this.birthShow = false
        },
        cancel(){
            this.birthShow = false
        },
        changeInfo(){
            axios.post('/api/user/update?gender=' + this.sendSex + '&signature=' + this.signature + '&city=&nickname=' + this.nickname + '&birthday=' + this.sendBirth + '&province=').then((res)=>{
                console.log(res)
                if(res.data.code == 200)
                    Toast('保存成功')
            }).catch((error)=>{
                if(error.response.data.code == 505){
                    Toast('改昵称已被占用')
                }
            })
        }
    },
}
</script>

<style lang="">
.iconInfo {
    float:left;
    margin-left:0.2rem;
    line-height: 1.2rem;
    font-size: 0.4rem;
}
</style>