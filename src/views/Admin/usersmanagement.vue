<template>
	<div>
	  <el-table :data="nowTableData" height="450px" border style="width: 100%">
	  		<el-table-column prop="userHead" label="用户头像" >
	  			<template slot-scope="scope">
	  				<img :src="scope.row.userHead" alt="" class="userhead">
	  			</template>
		    </el-table-column>
		    <el-table-column prop="date" label="注册日期" >
		    </el-table-column>
		    <el-table-column prop="username" label="用户姓名">
		    </el-table-column>
		    <el-table-column prop="email" label="用户邮箱">
		    </el-table-column>
		    <el-table-column prop="operate" label="操作">
		    	<template slot-scope='scope'>
		    		<!-- 获得改行所有的数据 -->
			        <el-button size="small" @click="handleToFreeze(scope.$index,scope.row)">{{scope.row.isFreeze ? "已冻结" : "未冻结"}}</el-button>
			        <el-button type="danger" size="small" @click="handleToDelete(scope.$index,scope.row)" >删除</el-button>
			    </template>
			</el-table-column>
  		</el-table>
  		<el-pagination background layout="prev, pager, next" :total="tableData.length" class="page" :page-size="pageSize" :current-page.sync="currentPage">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		name:'users',
		data(){
			return {
				tableData:[],
				currentPage:1,
				pageSize:7
			}
		},
		mounted(){
			this.axios.get('/api2/admin/usersList').then((res)=>{
				// console.log(res)
				var status=res.data.status;
				if(status==0){
					this.tableData=res.data.data.usersList
				}
			})
		},
		methods:{
			handleToFreeze(index,row){
				// console.log(index,row)
				this.axios.post('/api2/admin/updateFreeze',{
					email:row.email,
					isFreeze:!row.isFreeze
				}).then((res)=>{
					var status=res.data.status;
					if(status==0){
						this.$alert('冻结操作成功', '信息', {
				          confirmButtonText: '确定',
				          callback: action => {
				           this.tableData[index].isFreeze = !row.isFreeze
				          }
				        });
					}else{
						this.$alert('冻结操作失败', '信息', {
				          confirmButtonText: '确定',
				          
				        });
					}
				})
			},
			handleToDelete(index,row){
				// console.log('test');
				this.axios.post('/api2/admin/deleteUser',{
					email:row.email
				}).then((res)=>{
					var status=res.data.status;
					if(status==0){
						this.$alert('删除操作成功', '信息', {
					          confirmButtonText: '确定',
					          callback: action => {
					           this.tableData.splice(index,1)
				         	}
						})
					}else{
						this.$alert('删除操作失败', '信息', {
				          confirmButtonText: '确定',
				          
				        });
					}
				})
			}
		},
		computed:{
			// 获得当前页显示的数据
			nowTableData(){
				return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)||[]
			}
		}
	};
</script>

<style scoped>
	.page{
		margin-top: 20px;
	}
	.userhead{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		overflow: hidden;
	}
</style>
