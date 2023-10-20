const express = require('express')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const port = process.env.PORT
const authRoute = require('./routes/auth')
const hotelsRoute = require('./routes/hotels')
const roomsRoute = require('./routes/rooms')
const usersRoute = require('./routes/users')
const app = express()


// middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())


try {
    mongoose.connect(process.env.MONGO_DB);
    console.log('Kết nối database thành công')
}
catch (err) {
    console.log(err)
}

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', usersRoute)
app.use('/api/v1/hotels', hotelsRoute)
app.use('/api/v1/rooms', roomsRoute)

// middleware handle error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(port, () => {
    console.log('Kết nối port', port)
})