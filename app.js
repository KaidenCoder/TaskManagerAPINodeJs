const express = require('express')
const app= express()
const routes = require('./routes/tasks')
const connectDB = require('./db/connect')
const port = 3000
require('dotenv').config()
const connectionString = process.env.MONGO_URI
const notFound = require('./middleware/not-found')


// middleware
app.use(express.static('./public'))
app.use(express.json())


// routes
// app.get('/hello', (req,res) => {
//     console.log('I am listening')
//     res.send("Task Manager App")
// })


app.use('/api/v1/tasks',routes)
app.use(notFound)


const start = async () => {
    try {
        await connectDB.connectDB(connectionString)
        app.listen(port, console.log(`${port}`))
    } catch(err){
        console.log(err)
    }
}

start()
