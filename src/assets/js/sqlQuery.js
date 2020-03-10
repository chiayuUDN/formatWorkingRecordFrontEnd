import axios from 'axios'
import managementApiUrl from './managementApiUrl'

let readErrorMSG  = '讀取失敗';
let addErrorMSG   = '新增失敗';
let deletErrorMSG = '刪除失敗';
let enableOpenErrorMSG = 'enalbeOpen失敗';
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
	static deleteEmployee(data){
		console.log(data)
		return axios.post(managementApiUrl.delete.employee, { ID: data.Employee_ID, Name: data.Employee_Name }).then(response => {
			return response.data;
		}, function(){
			console.log(deletErrorMSG)
		})
	}
	static deleteType(data){
		return axios.post(managementApiUrl.delete.type, { ID: data.Type_ID, Name: data.Type_Name }).then(response => {
			return response.data;
		}, function(){
			console.log(deletErrorMSG)
		})
	}
	static deleteProject(data){
		return axios.post(managementApiUrl.delete.project, { ID: data.Project_ID, Name: data.Project_Name }).then(response => {
			return response.data;
		}, function(){
			console.log(deletErrorMSG)
		})
	}
	static deleteItem(data){
		return axios.post(managementApiUrl.delete.item, { ID: data.Item_ID, Name: data.Item_Name }).then(response => {
			return response.data;
		}, function(){
			console.log(deletErrorMSG)
		})
	}
	// Enable全部打開
	static enableOpenEmployee(){
		return axios.post(managementApiUrl.enableOpen.employee).then(response => {
			return 'Employee全打開';
		}, function(){
			console.log(enableOpenErrorMSG)
		})
	}
	static enableOpenType(){
		return axios.post(managementApiUrl.enableOpen.type).then(response => {
			return 'Type全打開';
		}, function(){
			console.log(enableOpenErrorMSG)
		})
	}
	static enableOpenProject(){
		return axios.post(managementApiUrl.enableOpen.project).then(response => {
			return 'Project全打開';
		}, function(){
			console.log(enableOpenErrorMSG)
		})
	}
	static enableOpenItem(){
		return axios.post(managementApiUrl.enableOpen.item).then(response => {
			return 'Item全打開';
		}, function(){
			console.log(enableOpenErrorMSG)
		})
	}
	//  Reset全部歸零
	static resetEmployee(){
		return axios.post(managementApiUrl.reset.employee).then(response => {
			return 'Employee全歸零';
		}, function(){
			console.log(enableOpenErrorMSG)
		})
	}
	static resetType(){
		return axios.post(managementApiUrl.reset.type).then(response => {
			return 'Type全歸零';
		}, function(){
			console.log(enableOpenErrorMSG)
		})
	}
	static resetProject(){
		return axios.post(managementApiUrl.reset.project).then(response => {
			return 'Project全歸零';
		}, function(){
			console.log(enableOpenErrorMSG)
		})
	}
	static resetItem(){
		return axios.post(managementApiUrl.reset.item).then(response => {
			return 'Item全歸零';
		}, function(){
			console.log(enableOpenErrorMSG)
		})
	}
}

// export default {data, readType, readProject}
// export default sql