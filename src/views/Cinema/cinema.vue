<template>
    <div>
        <Header title="喵喵影院"></Header>
        <div id="content">
            <div class="cinema_menu">
                <div class="city_switch">
                    全城 <i class="iconfont icon-lower-triangle"></i>
                </div>
                <div class="brand_swtich">
                    品牌 <i class="iconfont icon-lower-triangle"></i>
                </div>
                <div class="feature_switch">
                    特色 <i class="iconfont icon-lower-triangle"></i>
                </div>
            </div>
            <CiList></CiList>
        </div>

        <Tabbar></Tabbar>
    </div>
</template>
<script>
import Header from '@/components/Header/header.vue'
import Tabbar from '@/components/Tabbar/tabbar.vue'
import CiList from '@/components/CiList/cilist.vue'

export default {
    name:"Cinema",
    components:{
        
        Header,
        Tabbar,
        CiList
    
    }
}
</script>
<style scoped>

</style>