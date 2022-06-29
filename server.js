const express = require('express')
const bodyParser = require('body-parser')
const req = require('express/lib/request')
const { response } = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://kaka:3887@cluster0.eomzavh.mongodb.net/?retryWrites=true&w=majority'




MongoClient.connect(connectionString)
    .then(client => {
    console.log('connected to database')
    const db = client.db('to-do-app')
    const tasksCollection = db.collection('tasks')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const cursor = db.collection('tasks').find().toArray()
    .then(results => {
        res.render('index.ejs', { tasks: results})
    })
    .catch(error => console.error(error))
})


app.post('/tasks', (req, res) => {
    tasksCollection.insertOne(req.body)
    .then(result => {
        console.log('task added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/tasks', (req, res) => {
    tasksCollection.findOneAndUpdate(
        query,
        {
            $set: {
                task: req.body.task
            }
        },
        {
            upsert: true
        }
    )
    .then(result => {
        console.log(result);
    })
    .catch(error => console.error(error))
})

app.delete('deleteTask', (req, res) => {
    console.log(req)
    db.collection('tasks').deleteOne({task: req.body.taskS})
    .then(result => {
        console.log('Task deleted')
        response.json('Task deleted')
    })
    .catch(error => console.error)
})

//App listening on the port below
app.listen(3000, () => {
    console.log('listening');
})


})
    .catch(error => console.error(error))


