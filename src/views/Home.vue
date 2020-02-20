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
            <div class="form-group col-12" v-if="value.type.Type_Name != null">
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
            <div class="form-group col-12" v-if="value.project.Project_Name != null">
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
              <div class="form-group">
                <label>內容</label>
                <textarea v-model="content" class="form-control"></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="col-md-6">
        <!-- <pre class="language-json"><code>{{ value.type  }}</code></pre>
        <pre class="language-json"><code>{{ value.project  }}</code></pre>
        <pre class="language-json"><code>{{ value.item  }}</code></pre> -->
        <!-- <pre class="language-json"><code>{{ value.employee  }}</code></pre> -->
        <h1 class="text-center">列表</h1>
        <!--年度資訊專案, BU專案(含SRC), 外部專案, 內部計畫-->
        <div v-for="(options, index) in options.employee" :key="index" class="card border-primary mb-3">
          {{ options.Employee_Name }}
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
import '../assets/js/managementApiUrl'
import managementApiUrl from '../assets/js/managementApiUrl'
// var managementApiUrl = require('../assets/js/managementApiUrl')

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
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ],
      schedule:'',
      suggestion: '',
      content: '',
    }
  },
  mounted: function(){
    this.loading();
  },
  created(){
    this.readType();
    this.readEmployee();
  },
  methods: {
    loading: () => {
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
      axios.post(managementApiUrl.read.type).then(response => {
        this.options.type = response.data;
      }, function(){
        console.log('請求失敗')
      })
    },
    readProject: function(data) {
      this.value.project=[]
      this.value.item=[]
      axios.post(managementApiUrl.read.project, {
        FID: data.Type_ID,
      }).then(response => {
        this.options.project = response.data;
      }, function(){
        console.log('請求失敗')
      })
    },
    readItem: function(data) {
      this.value.item=[]
      axios.post(managementApiUrl.read.item, {
        FID: data.Project_ID,
      }).then(response => {
        this.options.item = response.data;
      }, function(){
        console.log('請求失敗')
      })
    },
    readEmployee: function(){
      axios.post(managementApiUrl.read.employee).then(response => {
        this.options.employee = response.data;
      }, function(){
        console.log('請求失敗')
      })
    },
	},
}
</script>
