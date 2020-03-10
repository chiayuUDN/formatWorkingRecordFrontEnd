<template>
  <div class="home">
    <div class="row">
      <div class="col-md-6">
        <h1 class="text-center">工作誌校正</h1>
        <form>
          <label>日期</label>
          <div class="row">
            <div class="col">
              <input type="date" class="form-control" v-model="date1" v-bind:class="{error:isError.date1}">
            </div>
            <h3>~</h3>
            <div class="col">
							<input type="date" class="form-control" v-model="date2" v-bind:min="date1">
						</div>
          </div>
          <div class="row">
            <div class="form-group col-12">
              <label>類別</label>
              <multiselect 
                v-model="value.type"
                placeholder="Search" 
                label="Type_Name" 
                track-by="Type_ID" 
                :options="options.type" 
                :multiple="false"
                @select="readProject"
              >
              </multiselect>
            </div>
            <div class="form-group col-12">
              <label>案名</label>
              <multiselect 
                v-model="value.project"
                placeholder="Search or add a tag" 
                label="Project_Name" 
                track-by="Project_ID" 
                :options="options.project" 
                :multiple="false" 
                :taggable="true"                
                @tag="addProjectTag"
                @select="readItem"
              ></multiselect>
            </div>
            <div class="form-group col-12">
              <label>工作項</label>
              <multiselect 
                v-model="value.item"
                placeholder="Search or add a tag" 
                label="Item_Name" 
                track-by="Item_ID" 
                :options="options.item" 
                :multiple="false" 
                :taggable="true"                
                @tag="addItemTag"
              ></multiselect>
            </div>
            <div class="form-group col-12">
              <label>人員</label>
              <multiselect 
                v-model="value.employee"
                tag-placeholder="Add this as new tag"
                placeholder="Search or add a tag"
                label="Employee_Name" 
                track-by="Employee_ID" 
                :options="options.employee" 
                :multiple="true" 
                :taggable="true"                
                @tag="addEmployeeTag"
              ></multiselect>
              <div class="form-group">
                <label>進度內容</label>
                <textarea v-model="schedule" class="form-control"></textarea>
              </div>
              <div class="form-group">
              <label>問題建議</label>
                <textarea v-model="suggestion" placeholder="沒有則填無" class="form-control"></textarea>
              </div>
              <!-- <div class="form-group">
                <label>內容</label>
                <textarea v-model="content" class="form-control"></textarea>
              </div> -->
            </div>
          </div>
        </form>
        <button v-on:click="submit" class="btn btn-primary float-sm-right">確定</button>
      </div>

      <div class="col-md-6">
        <h1 class="text-center">列表</h1>
        <!--年度資訊專案, BU專案(含SRC), 外部專案, 內部計畫-->
        <div v-for="(options, index) in options.type" :key="index" class="card border-primary mb-3">
          <div class="card-header">{{options.Type_Name}}</div>
          <div class="card-body text-dark">
            <div v-for="(typeList, tidx) in typeLists[index]" :key="tidx">
              {{typeList}}
              <span v-on:click="remove(index, tidx)">
                <a href="#" style="color: red;">
                <i class='fas fa-trash'></i></a></span>
                <!-- <span v-on:click="edit(index, tidx)">
                <a href="#" style="color: blue;"> 
                <i class="fas fa-edit"></i></a></span> -->
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Multiselect from 'vue-multiselect'
import Vue from 'vue'
import vueAxios from 'vue-axios'
import axios from 'axios'
import managementApiUrl from '../assets/js/managementApiUrl'
import sqlQuery from '../assets/js/sqlQuery'
Vue.prototype.$ajax = axios

export default {
  name: 'home',
  components: {
    Multiselect
  },
  data(){
    return {
      date1: '',
      date2: '',
      date: new Date().toISOString().substr(0, 10),
      isError: {
        date1:false,
      },
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
      typeLists:[[],[],[],[],[],],
      schedule:'',
      suggestion: '',
      content: '',
      sqlQuery:sqlQuery,
    }
  },
  mounted: function(){
    this.setDate();
  },
  created(){
    this.readType();
    this.readEmployee();
  },
  methods: {
    setDate: function(){
			var aa = new Date();
			var yyyy = aa.getFullYear();
			var mm = aa.getMonth()+1;
			var dd = aa.getDate();
			if(mm<10){mm='0'+mm}
			if(dd<10){dd='0'+dd}
			this.date1 = yyyy+'-'+mm+'-'+dd;
		},
    getDate: function(){
			var date = '';
			var date1 = this.date1.slice(5, 10);
			var date2 = this.date2.slice(5, 10);
			var weekday = ["日","一","二","三","四","五","六"];

			if(this.date2 == "" || this.date1 == this.date2){
				date = date1+'('+weekday[new Date(this.date1).getDay()]+')';	
			}else{
				date = date1+'~'+date2;
			}
			return date = date.replace(new RegExp("-","gm"),"/"); //replace all
		},
    addProjectTag(newTag){
      this.value.item=[]
      const tag = {
        Project_Name: newTag,
      }
      this.options.project.push(tag)
      this.value.project = tag
    },
    addItemTag(newTag){
      const tag = {
        Item_Name: newTag,
      }
      this.options.item.push(tag)
      this.value.item = tag
    },
    addEmployeeTag (newTag) {
      const tag = {
        Employee_Name: newTag,
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    readType: function(){
      sqlQuery.readType().then((res) => {
        res.forEach((data) => {
          if(data.isEnable == true)
            this.options.type.push(data)
        })
			})
    },
    readProject: function(data) {
      this.value.project=[]
      this.value.item=[]
      sqlQuery.readProject(data).then((res) => {
				if(res[0].msg == '無資料'){
					console.log('類別為【', data.Type_Name ,'】沒有資料')
        } else {
					res.forEach((data) => {
          if(data.isEnable == true)
            this.options.project.push(data)
          })
        }
			})
    },
    readItem: function(data) {
      this.value.item=[]
      sqlQuery.readItem(data).then((res) => {
				if(res[0].msg == '無資料'){
					console.log('案名為【', data.Project_Name ,'】沒有資料')
        } else {
          res.forEach((data) => {
            if(data.isEnable == true)
              this.options.item.push(data)
          })
        }
			})
    },
    readEmployee: function(){
      sqlQuery.readEmployee().then((res) => {
        res.forEach((data) => {
          if(data.isEnable == true)
            this.options.employee.push(data)
        })
			})
    },

    submit: function(){
      let employee = [];
      this.value.employee.forEach((item) => {
        employee.push(item.Employee_Name)
      })
      let data = '()' + this.getDate() + 
                  '／' + this.value.project.Project_Name + 
                  '／' + this.value.item.Item_Name + 
                  '／' + employee.join("、") + 
                  '／' + this.schedule + 
                  '／' + (this.suggestion != "" ? this.suggestion: "無");

      this.typeLists[this.value.type.Type_ID-1].push(data);

      //初始
      this.personnel = '';
      this.schedule = '';
      this.suggestion = '';
      this.cause = '';
      this.content = '';
  },
    remove: function(index, tidx){
      this.typeLists[index].splice(tidx, 1)
    },
    // edit: function(index, tidx){
    //   console.log(this.typeLists[index][tidx])
    // }
	},
}
</script>
