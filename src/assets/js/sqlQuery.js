import axios from 'axios'
import managementApiUrl from './managementApiUrl'

let readErrorMSG  = '讀取失敗';
let addErrorMSG   = '新增失敗';
let deletErrorMSG = '刪除失敗'
export default class sql {
	static test(){
		return '123'
	}
	// 讀取
	static readEmployee() {
		return axios.post(managementApiUrl.read.employee).then(response => {
			return response.data;
		}, function(){
			console.log(readErrorMSG)
		})
	}
	static readType() {
		return axios.post(managementApiUrl.read.type).then(response => {
			return response.data;
		}, function(){
			console.log(readErrorMSG)
		})
	}
	static readProject(data) {
		return axios.post(managementApiUrl.read.project, { FK_ID: data.Type_ID }).then(response => {
			return response.data;
		}, function(){
			console.log(readErrorMSG)
		})
	}
	static readItem(data) {
		return axios.post(managementApiUrl.read.item, { FK_ID: data.Project_ID }).then(response => {
			return response.data;
		}, function(){
			console.log(readErrorMSG)
		})
	}
	// 新增
	static addEmployee(name){
		console.log('addEmployee:',name)
		return axios.post(managementApiUrl.add.employee, { Name: name }).then(response => {
			// alert(response.data[0].msg)
			return response.data;
		}, function(){
			console.log(addErrorMSG)
		})
	}
	static addType(name){
		console.log('addType:',name)
		return axios.post(managementApiUrl.add.type, { Name: name }).then(response => {
			// alert(response.data[0].msg)
			return response.data;
		}, function(){
			console.log(addErrorMSG)
		})
	}
	static addProject(projectName, ID){
		console.log('addProject:', projectName)
		return axios.post(managementApiUrl.add.project, { FK_ID: ID, Name: projectName }).then(response => {
			return response.data;
		}, function(){
			console.log(addErrorMSG)
		})
	}
	static addItem(itemName, ID){
		console.log('addItem:', itemName)
		return axios.post(managementApiUrl.add.item, { FK_ID: ID, Name: itemName }).then(response => {
			return response.data;
		}, function(){
			console.log(addErrorMSG)
		})
	}
	// 刪除
	static deleteEmployee(name){
		let data = { Name: name }
		return axios.post(managementApiUrl.delete.employee, data).then(response => {
			// alert(response.data[0].msg)
			return response.data;
		}, function(){
			console.log(deletErrorMSG)
		})
	}
	static deleteType(name){
		let data = { Name: name }
		return axios.post(managementApiUrl.delete.type, data).then(response => {
			// alert(response.data[0].msg)
			return response.data;
		}, function(){
			console.log(deletErrorMSG)
		})
	}
	static deleteProject(name){
		let data = { Name: name }
		return axios.post(managementApiUrl.delete.project, data).then(response => {
			// alert(response.data[0].msg)
			return response.data;
		}, function(){
			console.log(deletErrorMSG)
		})
	}
	static deleteItem(name){
		let data = { Name: name }
		return axios.post(managementApiUrl.delete.item, data).then(response => {
			// alert(response.data[0].msg)
			return response.data;
		}, function(){
			console.log(deletErrorMSG)
		})
	}
}

// export default {data, readType, readProject}
// export default sql