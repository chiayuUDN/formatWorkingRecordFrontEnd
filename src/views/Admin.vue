<template>
	<div>
		<h1 class="text-center">Admin</h1>
		<div class="row">
			<div class="col-md-4">
				<h5>類別</h5>
				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="add.typeName" placeholder="新增類別名稱" aria-label="新增類別名稱" >
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button" @click="addType(add.typeName)">新增</button>
					</div>
				</div>
				<div class="selectArea style-7">
					<div class="noData text-center" v-show="isNoData.type">
						<i class="fas fa-folder-plus"></i>請新增類別名稱
						<!-- <img src="../assets/img/noData.png" style="width:250px;" alt=""> -->
					</div>
					<div v-for="(options, index) in options.type" :key="index" @click="selectType(options)">
						<div class="card">
							<ul class="list-group list-group-flush">
								<li :class="[{active: options.Type_ID == isActive.type.Type_ID}, 'list-group-item']" :title="options.Type_Name">
									<span class="overflowWord"> {{options.Type_Name}} </span>
									<span style="float:right;" @click="deleteType(options)"><a href="#" style="color: red;"><i class='fas fa-trash'></i></a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<h5>案名</h5>
				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="add.projectName" placeholder="新增案名名稱" aria-label="新增案名名稱" >
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button" @click="addProject(add.projectName)">新增</button>
					</div>
				</div>
				<div class="selectArea style-7">
					<div class="noData text-center" v-show="isNoData.project">
						<i class="fas fa-folder-plus"></i>請新增案名名稱
						<!-- <img src="../assets/img/noData.png" style="width:250px;" alt=""> -->
					</div>
					<div v-for="(options, index) in options.project" :key="index" @click="selectProject(options)">
						<div class="card">
							<ul class="list-group list-group-flush">
								<li :class="[{active: options.Project_ID == isActive.project.Project_ID}, 'list-group-item']" :title="options.Project_Name">
									<span class="overflowWord"> {{options.Project_Name}} </span>
									<span style="float:right;" @click="deleteProject(options)"><a href="#" style="color: red;"><i class='fas fa-trash'></i></a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<h5>工作項</h5>
				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="add.itemName" placeholder="新增工作項名稱" aria-label="新增工作項名稱" >
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button" @click="addItem(add.itemName)">新增</button>
					</div>
				</div>
				<div class="selectArea style-7">
					<div class="noData text-center"  v-show="isNoData.item">
						<i class="fas fa-folder-plus"></i>請新增工作項名稱
						<!-- <img src="../assets/img/noData.png" style="width:250px;" alt=""> -->
					</div>
					<div v-for="(options, index) in options.item" :key="index" @click="selectItem(options)">
						<div class="card">
							<ul class="list-group list-group-flush">
								<li :class="[{active: options.Item_ID == isActive.item.Item_ID}, 'list-group-item']" :title="options.Item_Name">
									<span class="overflowWord"> {{options.Item_Name}} </span>
									<span style="float:right;" @click="deleteItem(options)"><a href="#" style="color: red;"><i class='fas fa-trash'></i></a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				
			</div>
			<div class="col-md-4">
				<h5>人員</h5>
				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="add.employeeName" placeholder="新增人員名稱" aria-label="新增人員名稱" >
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button" @click="addEmployee(add.employeeName)">新增</button>
					</div>
				</div>
				<div class="selectArea style-7">
					<div class="text-center" v-show="isNoData.employee" style="font-size: 30px;">
						<i class="fas fa-user-plus" ></i>
						請新增人員名稱
					</div>
					<div v-for="(options, index) in options.employee" :key="index" @click="selectEmployee(options)">
						<div class="card">
							<ul class="list-group list-group-flush">
								<li :class="[{active: options.Employee_ID == isActive.employee.Employee_ID}, 'list-group-item']" :title="options.Employee_Name">
									<span class="overflowWord"> {{options.Employee_ID}} - {{options.Employee_Name}} </span>
									<span style="float:right;" @click="deleteEmployee(options)"><a href="#" style="color: red;"><i class='fas fa-trash'></i></a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<button type="button" class="btn btn-primary btn-lg btn-block mb-3" @click="enableOpenAll">enable全打開</button>
				<button type="button" class="btn btn-primary btn-lg btn-block mb-3" @click="resetAll">全部歸零重新設定</button>
			</div>
		</div>
		
		
		<!-- <div class="card border-primary mb-3">
			<h1>測試</h1>
			{{ typeof(options.item) }}
		</div> -->
		
	</div>
</template>
<style lang="sass">
	.selectArea
		height: 300px;
		background: #F5F5F5;
		overflow-y: auto;
		margin-bottom: 20px;
		// scrollbar-width: none //firefox
		// -ms-overflow-style: none //IE/Edge
		// &::-webkit-scrollbar //Chorme safari
		// 	display: none
	.style-7::-webkit-scrollbar-track
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		background-color: #F5F5F5;
		border-radius: 10px;

	.style-7::-webkit-scrollbar
		width: 10px;
		background-color: #F5F5F5;
	.style-7::-webkit-scrollbar-thumb
		border-radius: 10px;
		background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.44, rgb(122,153,217)), color-stop(0.72, rgb(73,125,189)), color-stop(0.86, rgb(28,58,148)));


	.overflowWord
		display: inline-block;
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis; 
		white-space: nowrap; // 不會換行

	.card li
		padding: 6px 12px;	

	.noData
		font-size: 30px;
</style>
<script>
import sqlQuery from '../assets/js/sqlQuery'
export default {
	data(){
		return {
			options: {
				employee: [],
				type: [],
				project: [],
				item: [],
			},
			add: {
				employeeName:'',
				typeName:'',
				projectName:'',
				itemName:'',
			},
			isActive: {
				employee: [],
				type: [],
				project: [],
				item: [],
			},
			isNoData: {
				employee: true,
				type: true,
				project: true,
				item: true,
			},
			sqlQuery:sqlQuery
		}
	},
	
	created(){
		this.readEmployee()
		this.readType()	
	},
	methods: {
		readEmployee: function(){
			sqlQuery.readEmployee().then((res) => {
				if(res[0].msg == '無資料'){
					this.isNoData.employee = true
					this.options.employee = []
				} else {
					this.isNoData.employee = false
					this.options.employee = res;
				}
			})
		},
		readType: function(){
			sqlQuery.readType().then((res) => {
				if(res[0].msg == '無資料'){
					this.isNoData.type = true
					this.options.type = []
				} else {
					this.isNoData.type = false
					this.options.type = res;
				}
			})
		},
		readProject: function(data){
			console.log('readProject', data)
			sqlQuery.readProject(data).then((res) => {
				if(res[0].msg == '無資料'){
					// console.log('類別為【', data.Type_Name ,'】的案名沒有資料')
					this.isNoData.project = true
					this.options.project = []
				} else {
					this.isNoData.project = false
					this.options.project = res
				}
			})
		},
		readItem: function(data){
			console.log('readItem', data)
			sqlQuery.readItem(data).then((res) => {
				if(res[0].msg == '無資料'){
					// console.log('案名為【', data.Project_Name ,'】的工作項沒有資料')
					this.isNoData.item = true
					this.options.item = []
				} else {
					this.isNoData.item = false
					this.options.item = res
				}
			})
		},
		selectEmployee: function(data){
			this.isActive.employee = data
		},
		selectType: function(data){
			console.log('selectType', data)
			this.isActive.type = data

			this.options.project = []
			this.isActive.project = []

			this.options.item = []
			this.isActive.item = []

			this.readProject(data)
		},
		selectProject: function(data){
			console.log('selectProject', data)
			this.isActive.project = data

			this.options.item = []
			this.isActive.item = []
			
			this.readItem(data)
		},
		selectItem: function(data){
			console.log('selectItem', data)
			this.isActive.item = data
		},
		addEmployee: function(name){
			new Promise((resolve, reject) => {
				sqlQuery.addEmployee(name).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.add.employeeName = ''
				this.readEmployee()
			})
		},
		addType: function(name){
			new Promise((resolve, reject) => {
				sqlQuery.addType(name).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				console.log('results', results)
				this.add.typeName = ''
				this.readType()
			})
		},
		addProject: function(name){
			const FID = this.isActive.type.Type_ID
			if (FID == null){
				alert("請選擇類別")
			} else {
				new Promise((resolve, reject) => {
					sqlQuery.addProject(name, FID).then((res) => {
						alert(res[0].msg)
						resolve(res[0].msg)
					})
				}).then((results) => {
					this.add.projectName = ''
					this.readProject(this.isActive.type)	
				})
			}
		},
		addItem: function(name){
			const FID = this.isActive.project.Project_ID
			if (FID == null){
				alert("請選擇案名")
			} else {
				new Promise((resolve, reject) => {
					sqlQuery.addItem(name, FID).then((res) => {
						alert(res[0].msg)
						resolve(res[0].msg)
					})
				}).then((results) => {
					this.add.itemName = ''
					this.readItem(this.isActive.project)	
				})
			}
		},
		deleteEmployee: function(data){
			new Promise((resolve, reject) => {
				sqlQuery.deleteEmployee(data).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.isActive.employee = []
				this.readEmployee();
			})
		},
		deleteType: function(data){
			new Promise((resolve, reject) => {
				sqlQuery.deleteType(data).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.isActive.type = []

				this.options.project = []
				this.isNoData.project = true
				this.isActive.project = []
				
				this.options.item = []
				this.isNoData.item = true
				this.isActive.item = []
				this.readType();
				
			})
		},
		deleteProject: function(data){
			new Promise((resolve, reject) => {
				sqlQuery.deleteProject(data).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.isActive.project = []
				
				this.options.item = []
				this.isNoData.item = true
				this.isActive.item = []
				this.readProject(this.isActive.type);
			})
		},
		deleteItem: function(data){
			new Promise((resolve, reject) => {
				sqlQuery.deleteItem(data).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.isActive.item = []
				this.readItem(this.isActive.project);
			})
		},
		enableOpenAll: function(){
			sqlQuery.enableOpenEmployee()
			sqlQuery.enableOpenType()
			sqlQuery.enableOpenProject()
			sqlQuery.enableOpenItem()
			location.reload();
		},
		resetAll: function(){

		}

	}
}
</script>