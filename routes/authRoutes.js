const { Router } = require('express')
const authController = require('../Controllers/AuthenticationController')

const router = Router()

router.post('/signup', authController.postSignUp)
router.get('/signup', authController.getSignUp)

router.post('/login', authController.postLogin)
router.get('/login', authController.getLogin)

router.get('/logout', authController.getLogout)

router.get('/', authController.getHome)


module.exports = router