const express = require('express')
const app = express()


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/tasks', (req, res) => {
    console.log('Heloooooo');
})


app.listen(3000, function() {
    console.log('listening');
})