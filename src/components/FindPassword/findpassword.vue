<template>
    <div class="container">
        <div class="password_email">
            邮箱：<input type="text" class="password_text" v-model="email"><button @touchstart="handleToVerify">发送验证码</button>
        </div>
        <div class="">
            新密码：<input type="password" class="password_text" v-model="password">
        </div>
        <div>
            验证码：<input type="text" class="password_text"  v-model="verify">
        </div>
        <div class="password_btn" @touchstart="handleToPassword">
            <input type="button" value="修改">
        </div>
        <div class="password_link">
            <router-link to="/mine/login">立即登录</router-link>
            <router-link to="/mine/findpassword">立即注册</router-link>
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS'
export default {
    name:'findpassword',
    data(){
        return{
            email:'',
            password:'',
            verify:"",
        }
    },
    methods:{
        handleToVerify(){
            this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                var status=res.data.status;
                if(status==0){
                    messageBox({
                        title:'验证码',
                        content:'验证码已发送',
                        ok:'确定'
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
        handleToPassword(){
            this.axios.post('/api2/users/findPassword',{
                email:this.email,
                password:this.password,
                verify:this.verify
            }).then((res)=>{
                var status=res.data.status;
                var that=this
                // console.log(res)
                if(status==0){
                    messageBox({
                        title:"修改",
                        content:'修改密码成功',
                        ok:'确定',
                        handleOk(){
                            that.$router.push('/mine/login')
                        }
                    })
                }else{
                    messageBox({
                        title:"修改",
                        content:'修改密码失败',
                        ok:'确定',
                        
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
    .container{
        padding:55px 10px 10px 10px;
    }
    .password_email{
        position: relative;
    }
    .password_email button{
        position: absolute;
        right:10px;
        top:10px;
    }
    .password_text {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 1px #ccc solid;
    margin-bottom: 5px;
    outline: none;
    text-indent: 10px;
}

 .password_btn {
    height: 50px;
    margin: 10px;
    
}

 .password_btn input {
    width: 100%;
    height: 100%;
    background: #e54847;
    border-radius: 3px;
    border: none;
    display: block;
    color: white;
    font-size: 20px;
}

 .password_link {
    display: flex;
    justify-content: space-between;
}

 .password_link a {
    text-decoration: none;
    margin: 0 5px;
    font-size: 12px;
    color: #e54847;
}
div button{
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    
}
</style>