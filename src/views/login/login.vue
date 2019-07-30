<template>
    <div class="login" @touchmove.prevent>
        <div style="height:1.5rem;background:rgba(25,137,250,0.3);margin-bottom:1.5rem;">
            <span style="font-size:0.7rem;line-height:1.5rem;">登录</span>
        </div>
        <van-cell-group>
            <van-field
                v-model="Login.phone"
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-field
                v-model="Login.password"
                type="password"
                label="密码"
                placeholder="请输入密码"
            
            />
        </van-cell-group>
        <van-button @click="LoginButton" type="info"  style="margin-top:0.5rem;border-radius:5px;padding-right:1rem;padding-left:1rem;">登录</van-button>
        <div style="text-align:center;width:100%;margin-top:0.5rem;overflow:hidden;">
            <span style="color:rgb(25,137,250);font-size:0.4rem;float:left;margin-left:1rem;" @click="goSignUp">没有账号？注册一个</span>
            <span style="color:rgb(25,137,250);font-size:0.4rem;float:right;margin-right:1rem;" @click="findPassword">忘记密码？找回密码</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant';
import md5 from 'js-md5';

export default {
    data() {
        return {
            Login: {
                phone:'',
                password: ''
            },
        }
    },
    mounted() {
        
    },
    methods: {
        LoginButton(){
            // this.Login.password = md5(this.Login.password)
            if(this.Login.phone && this.Login.password){
                if (!(/^1[34578]\d{9}$/.test(this.Login.phone)))
                       Toast('电话号码格式错误')
                else
                axios.post('/api/login/cellphone?phone=' + this.Login.phone + '&password=' + this.Login.password,this.Login).then((res)=>{
                    if(res.statusText === 'OK'){
                        Toast('登陆成功！')
                        this.$router.push({path:'/'})
                    }
                }).catch(function (error) {
                    if(error.response.data.code === 502)
                    Toast('密码错误！')
                    if(error.response.data.code === 509)
                    Toast('密码错误太多，请稍后再试！')
                    if(error.response.data.code === 501)
                    Toast('账号不存在！')
                });
            }
            else{
                Toast('账号或密码不能为空！')
            }
        },
        goSignUp(){
            this.$router.push({path:'/SignUp',query:{value:'注册'}})
        },
        findPassword(){
            this.$router.push({path:'/SignUp',query:{value:'找回密码'}})
        }
    }
}
</script>

<style lang="">
.login{
    height:50rem;
    background-size:contain;
    background-image: url(../../assets/login.jpeg);
    background-repeat: no-repeat
}
.van-cell{
    background-color: transparent;
}
</style>