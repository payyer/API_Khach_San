const express = require('express')
const authController = require('../controller/authController')
const router = express.Router()

// [POST] /api/v1/hotels/register
router.post('/register', authController.register)

// [POST] /api/v1/hotels/login
router.post('/login', authController.login)

module.exports = router