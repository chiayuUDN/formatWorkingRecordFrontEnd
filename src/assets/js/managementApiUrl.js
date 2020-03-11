let domain = 'http://10.201.79.107:3000'
const managementApiUrl = {
    read: {
        employee:domain + '/api/read/employee',
        type:    domain + '/api/read/type',
        project: domain + '/api/read/project',
        item:    domain + '/api/read/item',
    },
    add: {
        employee:domain + '/api/add/employee',
        type:    domain + '/api/add/type',
        project: domain + '/api/add/project',
        item:    domain + '/api/add/item',
    },
    delete: {
        employee:domain + '/api/delete/employee',
        type:    domain + '/api/delete/type',
        project: domain + '/api/delete/project',
        item:    domain + '/api/delete/item',
    },
    enableOpen: {
        employee:domain + '/enableOpen/employee',
        type:    domain + '/enableOpen/type',
        project: domain + '/enableOpen/project',
        item:    domain + '/enableOpen/item',
    },
    reset: domain + '/reset',
}

export default managementApiUrl

// const managementApiUrl = {
//     read: {
//         type:    'http://localhost:3000/api/read/type',
//         project: 'http://localhost:3000/api/read/project',
//         item:    'http://localhost:3000/api/read/item'
//     },
// }

// module.exports =  managementApiUrl