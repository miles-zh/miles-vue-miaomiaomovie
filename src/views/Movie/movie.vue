<template>
    <div id="app2">
        <Header title="喵喵电影"></Header>
        <div id="content">
            <div class="movie_menu">
				<router-link class="city_name" tag="div" to='/movie/city'>
					<span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link class="hot_item" tag="div" to="/movie/nowplaying">正在热映</router-link>
					<router-link class="hot_item" tag="div" to="/movie/comingsoon">即将上映</router-link>
				</div>
				<router-link class="search_entry" tag="div" to="/movie/search">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
			
        </div>
        
        <Tabbar></Tabbar>
        <transition>
            <router-view name="detail"></router-view>
        </transition>
        
    </div>
</template>
<script>
import Header from '@/components/Header/header.vue'
import Tabbar from '@/components/Tabbar/tabbar.vue'
import {messageBox} from '@/components/JS/index.js'   // 引入弹窗js组件

export default {
    name:'Movie',
    components:{
        Header,
        Tabbar,
        
    },
    mounted(){

        setTimeout(()=>{
            this.axios.get('/api/getLocation').then((res)=>{
                var msg=res.data.msg;
                if(msg==='ok'){

                    var nm=res.data.data.nm;
                    var id=parseInt(res.data.data.id);
                    
                    if(parseInt(this.$store.state.city.id) === id ){return;}
                    messageBox({
                        title:'定位',
                        content:nm,
                        cancel:'取消',
                        ok:'切换定位',
                        handleCancel:function () {
                            // console.log('1')
                        },
                        handleOk:function () {
                            // console.log('2')
                            window.localStorage.setItem('nowNm',nm);
                            window.localStorage.setItem('nowId',id);
                            window.location.reload();
                        }
                    })
                }
            })
        },3000)
        

        /* messageBox({
            title:'定位1',
            content:'沈阳',
            cancel:'取消',
            ok:'切换定位',
            handleCancel:function () {
                console.log('1')
            },
            handleOk:function () {
                console.log('2')
            }
        }) */
    }
}
</script>
<style scoped>
    .movie_menu .city_name.router-link-active,
    .movie_menu .hot_item.router-link-active,
    .movie_menu .search_entry.router-link-active{
        color:#f40;
    }
    
    
</style>