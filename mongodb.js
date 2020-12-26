const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID =  mongodb.ObjectID
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID()

console.log(id)
MongoClient.connect(connectionURL, { useNewUrlParser:true}, (error,client) =>{
if(error){
    return console.log('Unable to connect')
}
const db = client.db(databaseName)

// db.collection('users').updateOne({
//     _id: new ObjectID("5ed305df462472112c37ccbb")
// }, {
//     $inc: {
//         age: 1
//     }
// }).then((result) =>{
//     console.log(result)
// }).catch((error) =>{
//     console.log(error)
// })

// 
// db.collection('users').deleteMany({ 
//     age: 24
// }).then((result) =>{
//     console.log(result)
// }).catch((error) =>{
//     console.log(error)
// })

db.collection('tasks').deleteOne({ 
    description: "Document 2"
}).then((result) =>{
    console.log(result)
}).catch((error) =>{
    console.log(error)
})
// db.collection('tasks').findOne({_id: new ObjectID("5ed2d759f9132f1c3cde77f6")},(error,task) =>{
//     if(error){
//         return console.log('Unable to fetch the data')
//     }
//     console.log(task)
// })

// db.collection('tasks').find({completed : false}).toArray((error,task) =>{
//     console.log(task)
// })


})

// db.collection('users').insertOne({
//     _id:id,
//     name: 'Bojack',
//     age:50
// }, (error,result) =>{
//     if(error){
//         return console.log('Unable to insert user')
//     }

//     console.log(result.ops)
// })

// db.collection('tasks').insertMany(
//     [{
//         description:'Document 1',
//         completed: false
//     },{
//         description:'Document 2',
//         completed: true
//     },{
//         description:'Document 3',
//         completed: false
//     }],(error,result) =>{
//         if(error){
//             return console.log("unable to insert")
//         }
//         console.log(result.ops)
//     }
// ) 