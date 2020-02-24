import axios from 'axios'
import managementApiUrl from './managementApiUrl'

export default class sql {
	static readType () {
		return axios.post(managementApiUrl.read.type).then(response => {
			return response.data;
		}, function(){
			console.log('請求失敗')
		})
	}
	static readProject(data) {
		return axios.post(managementApiUrl.read.project, { FID: data.Type_ID }).then(response => {
			return response.data;
		}, function(){
			console.log('請求失敗')
		})
	}
	static readItem(data) {
		return axios.post(managementApiUrl.read.item, { FID: data.Project_ID }).then(response => {
			return response.data;
		}, function(){
			console.log('請求失敗')
		})
	}
}

// export default {data, readType, readProject}
// export default sql