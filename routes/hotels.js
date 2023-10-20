const express = require('express')
const hotelsController = require('../controller/hotelController')
const { verifyToken, verifyUser, verifyAdmin } = require('../util/verifyToken')
const router = express.Router()

// [POST] /api/v1/hotels
router.post('/', verifyAdmin, hotelsController.createHotel)

// [PUT] /api/v1/hotels/:id
router.put('/:id', verifyAdmin, hotelsController.updateHotel)

// [DELETE] /api/v1/hotels/:id
router.delete('/:id', verifyAdmin, hotelsController.deleteHotel)

// [GET] /api/v1/hotels/:id
router.get('/find/:id', hotelsController.getOneHotel)

// [GET] /api/v1/hotels
router.get('/', hotelsController.getAllHotels)

router.get('/countByCity', hotelsController.countByCity)

router.get('/countByType', hotelsController.countByType)

router.get('/room/:id', hotelsController.getHotelRooms)

module.exports = router