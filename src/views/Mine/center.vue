<template>
    <div class="container">
        <h3>
            个人中心：
        </h3>
        <div class="userimg"><img :src="$store.state.user.userHead" class="userhead"></div>
        <div class="userimgupload">
            <input type="file" name="file" value="上传头像ddddddd" @change="handleToUpload" multiple>
        </div>
        <div class="currentuser">
            当前用户：<span>{{$store.state.user.name}}</span>    <a href="javascrit:;" @click="handleToLogout" class="quit">退出</a>
        </div>
        <div v-if="$store.state.user.isAdmin">用戶身份：管理員 &nbsp;&nbsp;<a href="/admin" target="_blank" class="entermanagement">进入管理后台</a> </div>
        <div v-else>用戶身份：普通會員</div>
        
        
    </div>
</template>

<script>
import axios from 'axios';
import {messageBox} from '@/components/JS'
    export default{
        name:"center",
        methods:{
            handleToLogout(e){
                // console.log('a')
                axios.get('/api2/users/logout').then((res)=>{
                    // console.log(res)
                    var status=res.data.status;
                    if(status==0){
                        localStorage.removeItem("name")
                        localStorage.removeItem("isAdmin")
                        this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,userHead:''})
                        // console.log(this.$store.state.user.name)
                        this.$router.push('/mine/login')
                    }

                });
            },
            handleToUpload(e){ // 上传文件
                var file=e.target.files[0];
                
                var param=new FormData();
                param.append('file',file,file.name);
                var config={
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
                this.axios.post('/api2/users/uploadUserHead',param,config).then((res)=>{
                    var status=res.data.status;
                    var that=this
                    // console.log(res.data.data)
                    var userHead=res.data.data.userHead
                    // console.log(userHead);
                    if(status==0){
                        messageBox({
                            title:"信息",
                            content:'上传头像成功',
                            ok:'确定',
                            handleOk(){
                                // this.$store.commit('user/USER_NAME',{name:'',isAdmin:false,userHead:''})
                                // console.log(userHead)
                                that.$store.commit('user/USER_NAME',{
                                    name:that.$store.state.user.name,
                                    isAdmin:that.$store.state.user.isAdmin,
                                    userHead:userHead+"?"+Math.random()
                                });
                                console.log(that.$store.state.user.userHead)
                                // console.log(that)
                            }
                        })
                    }else{
                        messageBox({
                            title:"信息",
                            content:'上传头像失败',
                            ok:'确定',
                            
                        })
                    }
                })
            }
        },
        beforeRouteEnter (to, from, next) {
        //     // 在渲染该组件的对应路由被 confirm 前调用
        //     // 不！能！获取组件实例 `this`
        //     // 因为当守卫执行前，组件实例还没被创建

            axios.get('/api2/users/getUser').then((res)=>{
                var status=res.data.status;
                if(status==0){
                    next(vm=>{
                        localStorage.setItem("name", res.data.data.username)
                        localStorage.setItem("isAdmin", res.data.data.isAdmin)
                        localStorage.setItem('userHead',res.data.data.userHead)
                        vm.$store.commit('user/USER_NAME',{name:res.data.data.username,isAdmin:res.data.data.isAdmin,userHead:res.data.data.userHead})
                    })
                }else{
                    next('/mine/login')
                }
            })
        },
    }
</script>

<style scoped>
    .container{
        padding: 55px 10px 10px 10px;
        

    }
    .entermanagement,
    .quit{
        float: right;
        margin-right: 20px;
    }
    a{
        text-decoration:none;
    }
    .userhead{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: calc(50% - 50px);
    }
    .userimg{
        text-align: center;
       
    } 
    .userimgupload{
        width: 68px;
        overflow: hidden;
        display: flex;
        line-height: 40px;
        text-align: center;
        justify-content: center;
        margin-left: calc(50% - 34px);
    }
    .userimgupload>input{
        width:68px;
        height: 100%;
        background:red;
        border: none;
        
        display: inline-block;
    }
    .currentuser{
        line-height: 30px;
    }
    .currentuser span{
        font-size: 14px;
        font-weight: bolder;
    }
</style>