<template>
	<div>
		<h1 class="text-center">Admin</h1>
		<div class="row">
			<div class="col-4 selectArea">
				<h5>類別</h5>
				<input type="text"><span><i class="fas fa-plus-circle"></i></span>
				<div v-for="(options, index) in options.type" :key="index" @click="selectType(options)">
					<div v-show="options.isEnable">
						{{options.Type_Name}}
					</div>
				</div>
			</div>
			<div class="col-4 selectArea">
				<h5>案名</h5>
				<input type="text"><span><i class="fas fa-plus-circle"></i></span>
				<div v-for="(options, index) in options.project" :key="index" @click="selectProject(options)"> {{options.Project_Name}} </div>
			</div>
			<div class="col-4 selectArea">
				<h5>工作項</h5>
				<input type="text"><span><i class="fas fa-plus-circle"></i></span>
				<div v-for="(options, index) in options.item" :key="index"> {{options.Item_Name}} </div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h5>人員</h5>
				
			</div>
		</div>
		<div class="card border-primary mb-3">
			<h1>測試</h1>
			{{ options.type }}
		</div>
	</div>
</template>
<style lang="sass">
	.selectArea
		height: 250px;
		overflow-y: scroll;
</style>
<script>
import sqlQuery from '../assets/js/sqlQuery'
export default {
	data(){
		return {
			options: {
				type: [],
				project: [],
				item: [],
				employee: [],
			},
			value: {
				type: [],
				project: [],
				item: [],
				employee: []
			},

		}
	},
	
	created(){
		sqlQuery.readType().then((res) => {
			this.options.type = res;
		})
	},
	methods: {
		selectType: function(type){
			this.options.project = []
			this.options.item = []
			sqlQuery.readProject(type).then( (res) => {
				this.options.project = res
			})
		},
		selectProject: function(project){
			this.options.item = []
			sqlQuery.readItem(project).then( (res) => {
				this.options.item = res
			})
		}
	}
}
</script>