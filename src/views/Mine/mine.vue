<template>
    <div class="container">
        <Header title="我的喵喵"></Header>
        <div id="content">
            <router-view></router-view>
        </div>
        
        <Tabbar></Tabbar>
    </div>
</template>
<script>
import Header from '@/components/Header/header.vue'
import Tabbar from '@/components/Tabbar/tabbar.vue'
import Login from '@/components/Login/login.vue'

export default {
    name:'Mine',
    components:{
        
        Header,
        Tabbar,
        Login

    }
}
</script>
<style scoped>
    
    

</style>