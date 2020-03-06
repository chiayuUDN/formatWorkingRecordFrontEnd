<template>
	<div>
		<h1 class="text-center">Admin</h1>
		<div class="row">
			<div class="col-4">
				<h5>類別</h5>
				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="add.typeName" placeholder="新增類別名稱" aria-label="新增類別名稱" >
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button" @click="addType(add.typeName)">新增</button>
					</div>
				</div>
				<div class="selectArea style-7">
					<div v-for="(options, index) in options.type" :key="index" @click="selectType(options)">
						<div class="card" v-show="options.isEnable">
							<ul class="list-group list-group-flush">
								<li :class="[{active: options.Type_ID == isActive.type.Type_ID}, 'list-group-item']" :title="options.Type_Name">
									<span class="overflowWord"> {{options.Type_Name}} </span>
									<span style="float:right;" @click="deleteType(options.Type_Name)"><a href="#" style="color: red;"><i class='fas fa-trash'></i></a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-4">
				<h5>案名</h5>
				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="add.projectName" placeholder="新增案名名稱" aria-label="新增案名名稱" >
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button" @click="addProject(add.projectName)">新增</button>
					</div>
				</div>
				<div class="selectArea style-7">
					<div v-for="(options, index) in options.project" :key="index" @click="selectProject(options)">
						<div class="card" v-show="options.isEnable">
							<ul class="list-group list-group-flush">
								<li :class="[{active: options.Project_ID == isActive.project.Project_ID}, 'list-group-item']" :title="options.Project_Name">
									<span class="overflowWord"> {{options.Project_Name}} </span>
									<span style="float:right;" @click="deleteProject(options.Project_Name)"><a href="#" style="color: red;"><i class='fas fa-trash'></i></a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-4">
				<h5>工作項</h5>
				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="add.itemName" placeholder="新增工作項名稱" aria-label="新增工作項名稱" >
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button" @click="addItem(add.itemName)">新增</button>
					</div>
				</div>
				<div class="selectArea style-7">
					<div v-for="(options, index) in options.item" :key="index" @click="selectItem(options)">
						<div class="card" v-show="options.isEnable">
							<ul class="list-group list-group-flush">
								<li :class="[{active: options.Item_ID == isActive.item.Item_ID}, 'list-group-item']" :title="options.Item_Name">
									<span class="overflowWord"> {{options.Item_Name}} </span>
									<span style="float:right;" @click="deleteItem(options.Item_Name)"><a href="#" style="color: red;"><i class='fas fa-trash'></i></a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-4">
				<h5>人員</h5>
				<div class="input-group mb-3">
					<input type="text" class="form-control" v-model="add.employeeName" placeholder="新增人員名稱" aria-label="新增人員名稱" >
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button" @click="addEmployee(add.employeeName)">新增</button>
					</div>
				</div>
				<div class="selectArea style-7">
					<div v-for="(options, index) in options.employee" :key="index" @click="selectEmployee(options)">
						<div class="card" v-show="options.isEnable">
							<ul class="list-group list-group-flush">
								<li :class="[{active: options.Employee_ID == isActive.employee.Employee_ID}, 'list-group-item']" :title="options.Employee_Name">
									<span class="overflowWord"> {{options.Employee_Name}} </span>
									<span style="float:right;" @click="deleteEmployee(options.Employee_Name)"><a href="#" style="color: red;"><i class='fas fa-trash'></i></a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="card border-primary mb-3">
			<h1>測試</h1>
			{{ sqlQuery.test() }}
		</div> -->
		<!-- <div class="testbox">
			<span class="align-middle">測試</span>
			<span class="align-baseline">baseline</span>

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
			// value: {
			// 	employee: [],
			// 	type: [],
			// 	project: [],
			// 	item: [],
			// },
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
				this.options.employee = res;
			})
		},
		readType: function(){
			sqlQuery.readType().then((res) => {
				this.options.type = res;
			})
		},
		readProject: function(data){
			sqlQuery.readProject(data).then((res) => {
				if(res[0].msg == '無資料')
					console.log('類別為【', data.Type_Name ,'】沒有資料')
				else
					this.options.project = res
			})
		},
		readItem: function(data){
			sqlQuery.readItem(data).then((res) => {
				if(res[0].msg == '無資料')
					console.log('案名為【', data.Project_Name ,'】沒有資料')
				else
					this.options.item = res
			})
		},
		selectEmployee: function(data){
			this.isActive.employee = data
		},
		selectType: function(data){
			this.options.project = []
			this.options.item = []
			this.isActive.type = data
			this.readProject(data)
		},
		selectProject: function(data){
			this.options.item = []
			this.isActive.project = data
			this.readItem(data)
		},
		selectItem: function(data){
			this.isActive.item = data
		},
		addEmployee: function(name){
			new Promise((resolve, reject) => {
				sqlQuery.addEmployee(name).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
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
				this.readType()	
			})
		},
		addProject: function(name){
			const ID = this.isActive.type.Type_ID
			if (ID == null){
				alert("請選擇類別")
			} else {
				new Promise((resolve, reject) => {
					sqlQuery.addProject(name, ID).then((res) => {
						alert(res[0].msg)
						resolve(res[0].msg)
					})
				}).then((results) => {
					this.readProject(this.isActive.type)	
				})
			}
		},
		addItem: function(name){
			const ID = this.isActive.project.Project_ID
			if (ID == null){
				alert("請選擇案名")
			} else {
				new Promise((resolve, reject) => {
					sqlQuery.addItem(name, ID).then((res) => {
						alert(res[0].msg)
						resolve(res[0].msg)
					})
				}).then((results) => {
					this.readItem(this.isActive.project)	
				})
			}
		},
		
		deleteEmployee: function(name){
			new Promise((resolve, reject) => {
				sqlQuery.deleteEmployee(name).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.readEmployee();
			})
		},
		deleteType: function(name){
			new Promise((resolve, reject) => {
				sqlQuery.deleteType(name).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.readType();
			})
		},
		deleteProject: function(name){
			new Promise((resolve, reject) => {
				sqlQuery.deleteProject(name).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.readProject(this.isActive.type);
			})
		},
		deleteItem: function(name){
			new Promise((resolve, reject) => {
				sqlQuery.deleteItem(name).then((res) => {
					alert(res[0].msg)
					resolve(res[0].msg)
				})
			}).then((results) => {
				this.readItem(this.isActive.project);
			})
		}

	}
}
</script>