<template>
    <div>
        <div id="content">
			<div class="movie_body">
				<loading v-if="isLoading"></loading>
					<scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd" >
						<ul>
							<li style="margin:0;text-align:center;border:none;display:inline-block" v-if="pullDownMsg">{{pullDownMsg}}</li>
							<li v-for="item in comingList" :key="item.id">
								<div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img|setWH('128.180')"></div>
								<div class="info_list" @tap="handleToDetail(item.id)">
									<h2>{{item.nm}} <img src="@/assets/maxs.png" v-if='item.version'> </h2>
									<p><span class="person">{{item.wish}}</span> 人想看</p>
									<p>主演:{{item.star}}</p>
									<p>{{item.comingTitle}}上映</p>
								</div>
								<div class="btn_pre">
									预售
								</div>
							</li>
							
						</ul>
					</scroller>
				
				
				
			</div>

		</div>
    </div>
</template>
<script>
    export default{
		name:"ComingSoon",
		data(){
			return {
				comingList:[],
				pullDownMsg:'',
				isLoading:true,
				prevCityId:-1,
			}
		},
		activated(){
			var cityId=this.$store.state.city.id;
			// console.log(cityId)
			if(this.prevCityId==cityId){
				return ;	
			}
			this.isLoading=true;
			this.axios.get('/api/movieComingList?cityId='+cityId).then((res)=>{
				var msg=res.data.msg;
				if(msg=='ok'){
					this.comingList=res.data.data.comingList;
					this.isLoading=false;
					this.prevCityId=cityId;
				}
			})
			
			
		},
		methods:{
			handleToDetail(movieId){  // 点击图片触发事件
				// console.log('handleToDetail');
				this.$router.push('/movie/detail/2/'+movieId)
			},
			handleToScroll(pos){
				if(pos.y > 30){
					this.pullDownMsg="正在更新中..."
					// console.log('a')
				}
			},
			handleToTouchEnd(pos){
				if(pos.y>30){
					// console.log("ddad");
					this.axios.get('/api/movieComingList?cityId='+this.prevCityId).then((res)=>{
						var msg=res.data.msg;
						// console.log(a);
						if(msg==='ok'){	
								this.pullDownMsg="更新成功"					
							setTimeout(()=>{
								this.comingList=res.data.data.comingList;
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