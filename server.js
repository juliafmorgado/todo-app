const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://kaka:3887@cluster0.eomzavh.mongodb.net/?retryWrites=true&w=majority'


app.use(bodyParser.urlencoded({ extended: true}))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/tasks', (req, res) => {
    console.log(req.body)
})


app.listen(3000, function() {
    console.log('listening');
})

MongoClient.connect(connectionString)
    .then(client => {
    console.log('connected to database')
    const db = client.db('to-do-app')
})
    .catch(error => console.error(error))
