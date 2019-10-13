<template>
  <div id="content">
      
      <div class="movie_body" >
            <!-- 后台获取数据更新 -->
            <div ref="movie_body" style="width:100%">
                <loading v-if="isLoading"></loading>
                <scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" v-else>
                    <ul>
                        <li  style="margin:0;text-align:center;border:none;display:inline-block" v-if="pullDownMsg">{{pullDownMsg}}</li>
                        <li v-for="item in movieList" :key="item.id">
                            <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img|setWH('128.180')" ></div>
                            <div class="info_list" @tap="handleToDetail(item.id)">
                                <h2>{{item.nm}} <img src="@/assets/maxs.png" v-if="item.version"> </h2>
                                <p>观众评 <span class="grade">{{item.sc}}</span></p>
                                <p>主演: {{item.star}}</p>
                                <p>{{item.showInfo}}</p>
                            </div>
                            <div class="btn_mall">
                                购票
                            </div>
                        </li>
                    </ul>
                </scroller>
            </div>
            


        </div>
  </div>
</template>

<script>

// 引入better-scroll插件，增进滑动效果
// import BScroll from 'better-scroll'

export default {
    name:'NowPlaying',
    data(){
        return {
            movieList:[],
            pullDownMsg:'',
            isLoading:true,
            prevCityId:-1
        }
    },
    activated(){
        // console.log('aaa');

        var cityId = this.$store.state.city.id;
        if(this.prevCityId ===cityId){
            return ;
        }
        // console.log('aaa');
        this.isLoading=true
        this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
            var msg=res.data.msg;
            var list=[];
            var ary=res.data.data.movieList;
            if(msg=='ok'){

                
                for(var i=0;i<ary.length;i++){
                    var str=new Date(ary[i].rt).getTime();
                    // console.log(str);
                    var nowDate=new Date().getTime();
                    if(nowDate >= str){
                        list.push(ary[i]);
                    }
                }
                this.prevCityId=cityId;
                this.movieList=list;
                this.isLoading=false;
            }   
        })
        // console.log(this.movieList);
        /* this.$nextTick(()=>{  // 这个方法确认页面渲染完成后才执行，
            var scroll = new BScroll(this.$refs.movie_body,{   // 使用better-scroll增加滑动效果
                tap:true,
                probeType:1
            });
            scroll.on('scroll',(pos)=>{ // 滑动时触发事件
                // console.log('scroll')
                
                if(pos.y > 30){
                    this.pullDownMsg="正在更新中..."
                } 


            })
            scroll.on('touchEnd',(pos)=>{  // 滑动结束后触发事件
                // console.log('touchend')
                if(pos.y > 30){
                    this.axios.get('/api/movieOnInfoList?cityId=10').then((res)=>{
                        var msg=res.data.msg;
                        var list=[];
                        var ary=res.data.data.movieList;
                        if(msg=='ok'){
                            for(var i=0;i<ary.length;i++){
                                var str=new Date(ary[i].rt).getTime();
                                // console.log(str);
                                var nowDate=new Date().getTime();
                                if(nowDate >= str){
                                    list.push(ary[i]);
                                }
                            }
                            this.pullDownMsg="更新成功"
                            setTimeout(()=>{
                                this.movieList=list;
                                this.pullDownMsg=""
                            },1000)
                            
                        }   
                    })
                }
            })
        }) */
                

    },
    methods:{
        handleToDetail(movieId){  // 点击图片触发事件
            // console.log(movieId);
            this.$router.push('/movie/detail/1/'+movieId)
        },
        handleToScroll(pos){
            if(pos.y > 30){
                this.pullDownMsg="正在更新中..."
                // console.log('a')
            }
        },
        handleToTouchEnd(pos){
            if(pos.y > 30){
                // console.log("ddad");
                this.axios.get('/api/movieOnInfoList?cityId='+this.prevCityId).then((res)=>{
                    var msg=res.data.msg;
                    var list=[];
                    var ary=res.data.data.movieList;
                    // console.log(a);
                    if(msg=='ok'){
                        for(var i=0;i<ary.length;i++){
                            var str=new Date(ary[i].rt).getTime();
                            // console.log(str);
                            var nowDate=new Date().getTime();
                            if(nowDate >= str){
                                list.push(ary[i]);
                            }
                        }
                        this.pullDownMsg="更新成功"
                        setTimeout(()=>{
                            this.movieList=list;
                            this.pullDownMsg=""
                        },1000)
                        
                    }   
                })
            }
        }
        
    }
}
</script>

<style scoped>
    
</style>


