const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'This is my secrect', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, 'This is my secrect', async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.userLogin = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.userLogin = user
                next()
            }
        })
    } else {
        res.locals.userLogin = null
        next()
    }
}

module.exports = { requireAuth, checkUser }