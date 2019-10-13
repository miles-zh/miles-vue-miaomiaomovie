<template>
    <div id="content">
        <div class="login_body">
            <div>
                <input class="login_text" type="text" placeHolder="账户名/手机号/Email" v-model="username">
            </div>
            <div>
                <input class="login_text" type="password" placeHolder="请输入您的密码" v-model="password">
            </div>
            <div>
                <input type="text" v-model="verifyImg" class="login_text" placeHolder="请输入您的验证码"><img src="/api2/users/verifyImg" @touchstart="handleToVerifyImg">
            </div>
            <div class="login_btn">
                <input type="submit" value="登录" @touchstart="handleToLogin">
            </div>
            <div class="login_link">
                <router-link to="/mine/register">立即注册</router-link>
                <router-link to="/mine/findpassword">找回密码</router-link>
            </div>
        </div>
    </div>
</template>
<script>

import {messageBox} from '@/components/JS'

export default {
    name:'Login',
    data(){
        return {
            username:'',
            password:'',
            verifyImg:''
        }
    },
    methods:{
        handleToLogin(){
            this.axios.post('/api2/users/login',{
                username:this.username,
                password:this.password,
                verifyImg:this.verifyImg,
            }).then((res)=>{
                var status=res.data.status;
                var that=this
                if(status==0){
                    messageBox({
                        title:"登录",
                        content:'登录成功',
                        ok:'确定',
                        handleOk(){
                            that.$router.push('/mine/center')
                        }
                    })
                }else{
                    messageBox({
                        title:"登录",
                        content:res.data.msg,
                        ok:'确定'
                    })
                }
            })
        },
        handleToVerifyImg(e){
            e.target.src="/api2/users/verifyImg?"+Math.random();
        }
    }
}
</script>
<style scoped>
    
</style>