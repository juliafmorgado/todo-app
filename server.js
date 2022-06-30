const express = require('express')
const bodyParser = require('body-parser')
const req = require('express/lib/request')
const { response } = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://kaka:3887@cluster0.eomzavh.mongodb.net/?retryWrites=true&w=majority'

var db, collection;


MongoClient.connect(connectionString)
    .then(client => {
    console.log(`Connected to Database`)
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

// app.get('/', async (req, res) => {
//     try {
//         const cursor = await db.collection('tasks').find().toArray()
//         res.render('index.ejs', { tasks: res})
//     } catch (error) {
//         res.status(500).send({message: error.message})
//     }
// })

app.post('/tasks', (req, res) => {
    tasksCollection.insertOne(req.body)
    .then(result => {
        console.log('task added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteTask', async (req, res) => {
    try {
        const result = await tasksCollection.deleteOne({ task: req.body.taskS })
        console.log('DELETED');
        res.json('Task deleted')
    } catch (err) {
        console.error(err);
    }
})

// app.delete('/tasks', (req, res) => {
//     console.log(req)
//     tasksCollection.findOneAndDelete({task: req.body.task})
//     .then(result => {
//         console.log('Task deleted')
//         res.send('Task deleted')
//     })
//     .catch(error => console.error)
// })

//App listening on the port below
app.listen(3000, () => {
    console.log('listening');
})


})
    .catch(error => console.error(error))


