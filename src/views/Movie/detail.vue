<template>
  <div id="detailContainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <loading v-if="isLoading"></loading>
        <div id="content" class="contentDetail" v-else>
            <div class="detail_list">
                <div class="detail_list_bg" :style="{ 'background-image':'url('+detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img :src="detailMovie.img|setWH('148.208')" alt="">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{detailMovie.nm}}</h2>
                        <p>{{detailMovie.enm}}</p>
                        <p>{{detailMovie.sc}}</p>
                        <p>{{detailMovie.cat}}</p>
                        <p>{{detailMovie.src}}/{{detailMovie.dur}}</p>
                        <p>{{detailMovie.pubDesc}}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>{{detailMovie.dra}}</p>
            </div>
            <div class="detail_player swiper-container" ref="detail_player">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide" v-for="(item,index) in detailMovie.photos" :key="index">
                        <div>
                            <img :src="item | setWH('140.140')" alt="">
                        </div>
                        
                    </li> 
                </ul>
            </div>
            
        </div>
        <Footer></Footer>
  </div>
</template>

<script>

import Header from '@/components/Header/header.vue'
import Footer from '@/components/Tabbar/tabbar.vue'

export default {
    name:'Detail',
    data(){
        return {
            detailMovie:{},
            isLoading:true
        }
    },
    components:{
        Header,
        Footer
    },
    props:['movieId'],   // 获取到
    methods:{
        handleToBack(){
            this.$router.back();
        }
    },
    mounted(){
        // console.log(this.movieId)
        this.axios.get('/api/detailmovie?movieId='+this.movieId).then((res)=>{
            var msg=res.data.msg
            
            // console.log(res.data)
            if(msg==='ok'){
                // console.log('a')
                this.detailMovie=res.data.data.detailMovie
                // console.log(res.data)
                // setTimeout(()=>{
                //     this.isLoading=false
                // },1000);
                this.isLoading=false
                this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player , {
                        slidesPerView : 'auto',
                        freeMode : true,
                        freeModeSticky: true
                    });
                })
                
                
            }
        })
    }
}


</script>

<style scoped>

    #detailContainer{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;

        width: 100%;
        min-height: 100%;
        background-color: #fff;
    }
    
    #detailContainer.slide-enter-active{
        animation: 0.5s slideMove;
    }
    @keyframes slideMove {
        0%{
            transform: translateX(100%);
        }
        100%{
            transform: translateX(0);
        }
    }

    #content.contentDetail{ display: block; margin-bottom:0;position: relative;overflow-y: scroll;top:50px;z-index: -2;background-color: #fff;padding-bottom:50px;}
    #content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
    .detail_list .detail_list_bg{ width:100%; height:100%; filter: blur(5px); background-size:cover; position: absolute; left: 0; top: 0;}
    .detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
    .detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
    .detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
    .detail_list .detail_list_img img{ width:100%; height: 100%;}
    .detail_list .detail_list_info{ margin-top: 20px;}
    .detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
    .detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

    #content .detail_intro{ padding: 10px;}
    #content .detail_player{ margin:20px;}
    .detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px; height: 70px;background-color: #ccc;}
    .detail_player .swiper-slide img{ width:70px;  height: 70px;}
    .detail_player .swiper-slide p:nth-of-type(2){ color:#999;}

</style>