const express = require("express")
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddlware')
const mongoose = require('mongoose')
const router = require('./routes/authRoutes')
const path = require('path')
const port = 8001
const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded(
    {
        extended: true
    }
))
app.use(cookieParser())


// setup view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Connect to MongoDB
const dbURI = 'mongodb://127.0.0.1/authDB'
mongoose.connect(dbURI)
    .then(() => {
        console.log(`Data connected successfully`)
    })
    .catch(err => {
        console.log('Connection Failed')
        console.log(err)
    })

// config router
app.get('*', checkUser)
app.get('/djsoda', requireAuth, (req, res) => {
    res.render('djsoda')
})
app.use(router)


// listen port
app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})


