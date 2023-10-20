const express = require('express')
const usersController = require('../controller/userController')
const { verifyToken, verifyUser, verifyAdmin } = require('../util/verifyToken')
const router = express.Router()

// router.get('/checkAut', verifyToken, (req, res) => {
//     res.send("Login successful. Welcome")
// })

// router.get('/check-user/:id', verifyUser, (req, res) => {
//     res.send("Mày đã dô có thể xóa mày")
// })

// router.get('/check-user-withAdmin/:id', verifyAdmin, (req, res) => {
//     res.send("Tao là admin to sẽ xóa mày")
// })

// [PUT] /api/v1/users/:id
router.put('/:id', verifyUser, usersController.updateUser)

// [DELETE] /api/v1/users/:id
router.delete('/:id', verifyUser, usersController.deleteUser)

// [GET] /api/v1/users/:id
router.get('/:id', verifyUser, usersController.getOneUser)



module.exports = router