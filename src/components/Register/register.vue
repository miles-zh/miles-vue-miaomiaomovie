
<template>
    <div class="container register_body">
        <div><span class="left"> 邮箱：</span><input type="text" class="register_text" v-model="email"> <button @touchstart="handleToVerify" :disabled="disabled">{{verifyInfo}}</button></div>
        <div><span class="left"> 用户名：</span><input type="text" class="register_text" v-model="username"></div>
        <div><span class="left"> 密码：</span><input type="password" class="register_text" v-model="password"></div>
        <div><span class="left"> 确认密码：</span><input type="password" class="register_text"></div>
        <div><span class="left"> 验证码：</span><input type="text" class="register_text" v-model="verify"></div>
        <div class="register_btn"><input type="submit" value="注册" @touchstart="handleToRegister"></div>
        <div class="register_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/findpassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import { messageBox } from '@/components/JS';

export default {
    name:"register",
    data(){
        return {
            email:'',
            username:'',
            password:'',
            verify:'',
            verifyInfo:'发送验证码',
            disabled:false
        }
    },
    methods:{
        handleToRegister(){
            this.axios.post('/api2/users/register',{
                
                email:this.email,
                username:this.username,
                password:this.password,
                verify:this.verify
            }).then((res)=>{
                var status=res.data.status;
                // console.log(res)
                var that=this
                if(status==0){
                    messageBox({
                        title:'注册',
                        content:'用户注册成功',
                        ok:'确定',
                        handleOk(){
                            that.$router.push('/mine/login')
                        }
                    })
                }else{
                    messageBox({
                        title:'注册',
                        content:res.data.msg+',请重新注册',
                        ok:'确定'
                    })
                }
            })
        },
        handleToVerify(){
            if(this.disabled){
                return;
            }
            this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                var status=res.data.status;
                var that=this;
                if(status==0){
                    messageBox({
                        title:'验证码',
                        content:'验证码已发送',
                        ok:'确定',
                        handleOk(){
                            that.countDown();
                        }
                    })
                }else{
                    messageBox({
                        title:'验证码',
                        content:'验证码发送失败',
                        ok:'确定'
                    })
                }
            })
        },
        countDown(){
            this.disabled=true;
            var count=60;
            var timer=setInterval(()=>{
                count--;
                this.verifyInfo="剩余"+count+"秒";
                if(count==0){
                    this.disabled=false;
                    count=60;
                    this.verifyInfo="发送验证码";
                    clearInterval(timer);
                }
            },1000)
            
        }
    }
}
</script>

<style scoped>
    .container{
        padding-top:50px;
    }
    .register_body {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        margin-top:50px;
        z-index: 100;
    }   
    .left{
        width:25%;
        height:40px;
        line-height: 40px;
        /* background-color: #555; */
        display: inline-block;
        text-align: justify;
        text-align-last:justify;
    }

 .register_text {
    width: 68%;
    height: 40px;
    border: none;
    border-bottom: 1px #ccc solid;
    margin-bottom: 5px;
    outline: none;
    text-indent: 10px;
}

 .register_btn {
    height: 50px;
    margin: 10px;
    
}

 .register_btn input {
    width: 100%;
    height: 100%;
    background: #e54847;
    border-radius: 3px;
    border: none;
    display: block;
    color: white;
    font-size: 20px;
}

 .register_link {
    display: flex;
    justify-content: space-between;
}

 .register_link a {
    text-decoration: none;
    margin: 0 5px;
    font-size: 12px;
    color: #e54847;
}
div button{
    height: 30px;
    padding: 0 10px;
    line-height: 30px;
    
}
</style>