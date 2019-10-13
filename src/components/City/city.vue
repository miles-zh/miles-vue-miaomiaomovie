<template>
    <div id="content">
        <div class="city_body">
            <div class="city_list">
                <loading v-if="isLoading"></loading>
                <scroller ref="city_List" v-else>
                    <div>
                       <div class="city_hot">
                            <h2>热门城市</h2>
                            <ul class="clearfix">
                                <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
                                
                            </ul>
                        </div>
                        <div class="city_sort" ref="city_sort">
                            <div v-for="item in cityList" :key="item.index">
                                <h2>{{item.index}}</h2>
                                <ul>
                                    <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)"> {{itemList.nm}} </li>
                                    
                                </ul>
                            </div>
                        </div> 
                    </div>
                    
                </scroller>
                
            </div>
            <div class="city_index">
                <ul>
                    <li v-for="(item,i) in cityList" :key="item.index" @click="handleToIndex(i)"> {{item.index}} </li>
                    
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name:'city',
    data(){
        return {
            cityList:[],
            hotList:[],
            pullDownMsg:'',
            isLoading:true
        }
    },
    mounted(){
        var cityList=window.localStorage.getItem('cityList');
        var hotList=window.localStorage.getItem('hotList');
        if(cityList&&hotList){
            this.cityList=JSON.parse(cityList);
            this.hotList=JSON.parse(hotList);
            this.isLoading=false;
        }else{
            this.axios.get('/api/cityList').then((res)=>{
                // console.log(res.data.data.cities)
                var msg=res.data.msg;
                if(msg==='ok'){
                    var cities=res.data.data.cities;
                    // console.log(cities)
                    var {cityList,hotList} = this.formatCity(cities);
                    this.cityList=cityList;
                    this.hotList=hotList;
                    this.isLoading=false;
                    window.localStorage.setItem('cityList',JSON.stringify(cityList))
                    window.localStorage.setItem('hotList',JSON.stringify(hotList))  
                }
            })
        }
    },
    methods:{
        formatCity(cities){
            let cityList=[];
            let hotList=[];
            
            for(let i=0;i<cities.length;i++){
                if(cities[i].isHot===1){
                    hotList.push(cities[i])
                }
            }


            for(let i=0;i<cities.length;i++){
                let firstLetter=cities[i].py.substring(0,1).toUpperCase();
                if(toCom(firstLetter)){ //新增加的
                    cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})

                }else{ // 累加到已有索引
                    for(let j=0;j<cityList.length;j++){
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
                        }
                    }
                }
            }

            cityList.sort((n1,n2)=>{
                if(n1.index>n2.index){
                    return 1;
                }else{
                    return -1;
                }
            })
            function toCom(firstLetter){
                for(let i=0;i<cityList.length;i++){
                    if(cityList[i].index === firstLetter){
                        return false;
                    }
                }
                return true
            }
            // console.log(cityList)
            // console.log(hotList)
            return {
                cityList,
                hotList
            }
        },
        handleToIndex(index){  // 点击字母跳转到相应的城市列表
            let h2=this.$refs.city_sort.getElementsByTagName('h2');
            // this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;
            this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
        },
        handleToCity(nm,id){
            this.$store.commit('city/CITY_INFO',{nm,id})
            window.localStorage.setItem("nowNm",nm)
            window.localStorage.setItem("nowId",id)
            this.$router.push('/movie/nowplaying')
        }

        
    }
}
</script>

<style scoped>
    
</style>