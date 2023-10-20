const express = require('express')
const roomsController = require('../controller/roomController')
const { verifyAdmin } = require('../util/verifyToken')
const router = express.Router()
// [POST] /api/v1/rooms
router.post('/:hotelId', verifyAdmin, roomsController.createRoom)

// [PUT] /api/v1/rooms/:id
router.put('/:id', verifyAdmin, roomsController.updateRoom)

router.put('/availability/:id', roomsController.updateRoomAvailability)

// [DELETE] /api/v1/rooms/:id
router.delete('/:id/:hotelId', verifyAdmin, roomsController.deleteRoom)

// [GET] /api/v1/rooms/:id
router.get('/:id', roomsController.getOneRoom)

// [GET] /api/v1/rooms
router.get('/', roomsController.getAllRoom)
module.exports = router