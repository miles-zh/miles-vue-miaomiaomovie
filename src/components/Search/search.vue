<template>
    <div id="content">
        <div class="search_body">
            <div class="search_input">
                <div class="search_input_wrapper">
                    <i class="iconfont icon-sousuo"></i>
                    <input type="text" v-model="message">
                </div>					
            </div>
            <!-- 从后台获取数据实现搜索功能 -->
            <div class="search_result">
                <h3>电影/电视剧/综艺</h3>
                
                    
                    <ul>
                        <li v-for="item in searchList" :key="item.id">
                            <div class="img"><img :src="item.img|setWH('128.180')"></div>
                            <div class="info">
                                <p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
                                <p>{{item.enm}}</p>
                                <p>{{item.cat}}</p>
                                <p>{{item.rt}}</p>
                            </div>
                        </li>
                        
                    </ul>
                
                
            </div>
        </div>

        
        

    </div>
</template>

<script>
export default {
    name:'Search',
    data(){
        return {
            message:'',
            searchList:[],
            source:'',
            prevCityId:-1
        }
    },
    watch:{

        message(newVal){
            var that=this;
            
            var cityId=this.$store.state.city.id;
            // if(this.prevCityId==cityId){
            //     return
            // }
            // console.log('a')
            this.cancelRequest();
            this.axios.get('/api/searchList?cityId='+cityId+'&kw='+newVal,{
                cancelRequest:this.axios.CancelToken(function executor(c){
                    that.source=c;
                })
            }).then((res)=>{
                var msg=res.data.msg;
                var movies=res.data.data.movies;
                // console.log(this.searchList)
                if(msg && movies ){
                    this.searchList=movies.list;
                    this.prevCityId=cityId;
                }
            }).catch((err)=>{
                if(this.axios.isCancel(err)){
                    console.log('Rquest canceled',err.message);
                }else{
                    console.log(err)
                }
            })
            
        }
    },
    methods:{
        cancelRequest(){
            if(typeof this.source==='function'){
                this.source('终止请求')
            }
        }
    },
    activated(){
        var cityId=this.$store.state.city.id;
        // console.log(cityId)
        this.axios.get('/api/searchList?cityId='+cityId+'&kw=a').then((res)=>{
                var msg=res.data.msg;
                var movies=res.data.data.movies;
                // console.log(this.searchList)
                if(msg && movies ){
                    this.searchList=movies.list;
                }
            })
    }
}
</script>

<style scoped>

</style>