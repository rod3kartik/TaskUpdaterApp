require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete("5ed6554e1636e11bb89a5899").then((task)=>{
    
//     return Task.countDocuments({completed:false})}).then((result) =>{
//         console.log(result)
//     }).catch((e)=>{
//         console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed : false })
    return count
}

deleteTaskAndCount('5edbe2a4b391bf5f489f0698').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})