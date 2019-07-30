<template>
    <div class="main"  @touchmove.prevent>
        <div style="height:1.5rem;background:rgba(25,137,250,0.3);margin-bottom:1.5rem;">
            <van-icon @click="goLogin" name="arrow-left" class="icon" />
            <span style="font-size:0.7rem;line-height:1.5rem;text-align:center;clear:both;margin-left:-0.8rem;">{{ tittle }}</span>
        </div>
        <div v-show="Sign">
            <van-cell-group>
                <van-field
                    v-model="SignUp.phone"
                    label="手机号"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-model="SignUp.captcha"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                >
                    <van-button slot="button" size="small" type="primary" @click="getCaptcha" :disabled="!show">
                        <span v-if="show">发送验证码</span>
                        <span v-if="!show">{{ count }}s后获取</span>
                    </van-button>
                </van-field>
            </van-cell-group>
            <van-button @click="SignUpIt" type="info" style="margin-top:0.5rem;border-radius:5px;padding-right:1rem;padding-left:1rem;">下一步</van-button>
        </div>
        <div v-show="!Sign">
            <van-cell-group>
                <van-field
                    v-model="SignUp.nickname"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon="$toast('注册账号的用户名')"
                />
                <van-field
                    v-model="SignUp.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                />
                <van-field
                    v-model="isPassword"
                    type="password"
                    label="确认密码"
                    placeholder="请确认密码"
                    required
                />
            </van-cell-group>
            <van-button @click="SignUpNum" type="info" style="border-radius:5px;padding-left:1rem;padding-right:1rem;">注册</van-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Notify } from 'vant';
import { Icon } from 'vant';
import md5 from 'js-md5';

export default {
    data() {
        return {
            tittle:'注册',
            SignUp: {
                captcha: '',
                phone: '',
                password: '',
                nickname: '',
            },
            Sign:true,
            isPassword:'',
            show:true,
            count:'',
            timer:null
        }
    },
    mounted() {
        this.changeTittle()
    },
    methods: {
        changeTittle(){
            this.tittle = this.$route.query.value
        },
        getCaptcha(){
            let phone = this.SignUp.phone
            if(!phone){
                Notify('请输入手机号码！');
            }else{
                if (!(/^1[34578]\d{9}$/.test(phone))) {
                    Notify('手机号码格式错误')
                }else{
                    axios.post('/api/captcha/sent?phone=' + phone,{
                        phone: phone,
                    }).then((res)=>{
                        Notify({
                            message: '发送成功',
                            duration: 1000,
                            background: 'rgb(127,174,66)'
                        })
                        this.count = 120;
                        this.show = false;
                        this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= 120) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                        }, 1000)
                        console.log(res)
                    }).catch(function(error){
                        Notify('获取验证码失败！')
                    })
                }
            }
        },
        SignUpIt(){
            axios.post('/api/captcha/verify?phone=' + this.SignUp.phone + '&captcha=' + this.SignUp.captcha,{
                phone:this.SignUp.phone,
                captcha:this.SignUp.captcha
            }).then((res1)=>{
                if(res1.statusText == 'OK'){
                    this.Sign = false
                }
            }).catch(function(error) {
                if(error.response.data.code === 503)
                Notify('验证码错误')
            })
        },
        SignUpNum(){
            if(this.SignUp.nickname && this.SignUp.password && this.isPassword){
                if(this.SignUp.password !== this.isPassword){
                    Notify('两次密码不相等！')
                }
                else{
                    this.SignUp.password = md5(this.SignUp.password)
                    this.isPassword = md5(this.isPassword)
                    console.log(this.SignUp.password)
                    axios.post('/api/cellphone/existence/check?phone=' + this.SignUp.phone,{
                        phone:this.SignUp.phone
                    }).then((res)=>{
                        console.log(res)
                        if(res.statusText === 'OK'){
                            axios.post('/api/register/cellphone?phone=' + this.SignUp.phone + '&password=' + this.SignUp.password + '&captcha=' + this.SignUp.captcha + '&nickname=' + this.SignUp.nickname,{
                                phone: this.SignUp.phone,
                                password: this.SignUp.password,
                                captcha: this.SignUp.captcha,
                                nickname: this.SignUp.nickname
                            }).then((res1)=>{
                                if(res1.statusText === 'OK'){
                                    Notify({
                                        message: '注册成功',
                                        duration:1000,
                                        background: 'rgb(127,174,66)'
                                    })
                                }
                            }).catch(function(error) {
                                Notify('该用户名已被占用！')
                            })
                        }
                        
                    }).catch(function(error) {
                        Notify('该账号已经被注册！')
                    })
                }
            }else{
                Notify('信息不完整！')
            }
        },
        goLogin(){
            this.$router.push({path:'/Login'})
        }
    },
}
</script>

<style lang="">
.main{
    width:100%;
    height:50rem;
    background-size:contain;
    background-image: url(../../assets/login.jpeg);
    background-repeat: no-repeat
}
.theseIn{
    margin-top:0.5rem;
}
.icon{
    float:left;
    line-height:1.5rem;
    font-size:0.8rem;
}
</style>