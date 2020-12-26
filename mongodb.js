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


db.collection('tasks').deleteOne({ 
    description: "Document 2"
}).then((result) =>{
    console.log(result)
}).catch((error) =>{
    console.log(error)
})

})

