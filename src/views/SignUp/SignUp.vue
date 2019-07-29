<template>
    <div class="main">
        <div style="padding-bottom:0.5rem;margin:0.5rem 0rem;border-bottom:2px solid rgb(75,105,201)">
            <h2>注册：</h2>
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

export default {
    data() {
        return {
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
        
    },
    methods: {
        getCaptcha(){
            let phone = this.SignUp.phone
            if(!phone){
                Notify('请输入手机号码！');
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
                })
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
                else{
                    Notify('验证码错误！')
                }
            })
        },
        SignUpNum(){
            if(this.SignUp.nickname && this.SignUp.password && this.isPassword){
                if(this.SignUp.password !== this.isPassword){
                    Notify('两次密码不相等！')
                }
                else{
                    axios.post('/cellphone/existence/check?phone=' + this.SignUp.phone,{
                        phone:this.SignUp.phone
                    }),then((res)=>{
                        console.log(res)
                    })
                }
            }else{
                Notify('信息不完整！')
            }
        }
    },
}
</script>

<style lang="">
.main{
    min-height:5rem;
    width:100%;
}
.theseIn{
    margin-top:0.5rem;
}
</style>