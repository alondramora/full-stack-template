const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000

// declaring variables
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = '',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to Database')
        db = client.db('star-wars-quotes')
        collection = db.collection('quotes')
    })

    // Middleware prior to CRUD operations

app.set('view engine', 'ejs') // ejs helps us with templating. Allows us to run js to generate html. Spits out html.
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // helps us handle urls being sent back and forth
app.use(express.json()) // help express pull apart the json and read the data being sent back and forth
app.use(cors())

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port!`)
} )