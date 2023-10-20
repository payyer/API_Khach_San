const User = require('../models/user')
const jwt = require('jsonwebtoken')

// define function can put them to util file
const handlerError = (err) => {
    let errors = { email: '', password: '' }

    // incoret email
    if (err.message === 'Email are not exits are wrong!!') {
        errors.email = 'That email is not exits'
    }

    // incoret password
    if (err.message === 'Incorect password') {
        errors.password = 'Incorect password'
    }

    // duplicate eeror code
    if (err.code === 11000) {
        errors.email = 'that email is already registerd'
        return errors
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}
// 3 day life of token
const maxAge = 3 * 24 * 60 * 60
// tạo token với JWT
const createToken = (id) => {
    // jwt với payload = id , sign = "bí mật" ,  thời gian sống của token
    return jwt.sign({ id }, 'This is my secrect', {
        expiresIn: maxAge
    })
}

module.exports.getHome = async (req, res) => {
    await User.find({})
        .then((user) => {
            res.render('home', {
                user: user
            })
        })
}

module.exports.getSignUp = (req, res) => {
    res.render('signup')
}

module.exports.getLogin = (req, res) => {
    res.render('login')
}

// need to handler error (this is missing handler error)
module.exports.postSignUp = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    try {
        const user = await User.create({
            email: email,
            password: password,
        });
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = handlerError(err)
        res.status(400).json({ errors })
    }
}

module.exports.postLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    await User.login(email, password)
        .then((user) => {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.status(201).json({ user: user._id })
        })
        .catch( error => {
            const errors = handlerError(error)
            res.status(400).json({ errors })
        })
}

module.exports.getLogout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}