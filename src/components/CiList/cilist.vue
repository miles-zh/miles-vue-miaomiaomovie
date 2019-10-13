<template>
    <div id="content">        
        <div class="cinema_body">
            <loading v-if="isLoading"></loading>
            <scroller v-else>
                <ul>
                
                    <li v-for="item in cinemaList" :key="item.id">
                        <div>
                            <span>{{item.nm}}</span>
                            <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
                        </div>
                        <div class="address">
                            <span>{{item.addr}}</span>
                            <span>{{item.distance}}</span>
                        </div>
                        <div class="card">
                            <div v-for="(val,key,i) in item.tag" :key="key"  :class="key | classCard" v-if="val===1">
                                {{ key | formatCard }}
                            </div>
                            
                        </div>
                        
                    </li>
                    
                </ul>
            </scroller>
           
        </div>
    </div>
</template>

<script>
export default {
    name:'CiList',
    data(){
        return {
            cinemaList:[],
            isLoading:true,
            prevCityId:-1
        }
    },
    activated(){

        var cityId=this.$store.state.city.id;
        if(this.prevCityId===cityId){
            return
        }
        this.isLoading=true;
        this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
            var msg=res.data.msg;
            if(msg=='ok'){
                this.cinemaList=res.data.data.cinemas;
                this.isLoading=false;
                this.prevCityId=cityId
            }
        });
        
    },
    filters:{
        formatCard(key){
            var card =[
                {key:'allowRefund',value:'改签'},
                {key:'endorse',value:'退'},
                {key:'sell',value:'折扣'},
                {key:'snack',value:'小吃'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return ''
        },
        classCard(key){
            var card =[
                {key:'allowRefund',value:'or'},
                {key:'endorse',value:'or'},
                {key:'sell',value:'bl'},
                {key:'snack',value:'bl'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return ''
        }
    }
}
</script>
<style scoped>
    .cinema_body{
        overflow: auto;
    }
    .q{
        float: right;
    }
</style>