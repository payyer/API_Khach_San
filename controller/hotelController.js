const Hotel = require('../models/Hotel')
const Room = require('../models/Room')
// [POST] /api/vi/hotels
const createHotel = async (req, res) => {
    console.log(req.body)
    const newHotel = new Hotel(req.body)

    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    }
    catch (err) {
        next(err)
    }
}

// [PUT] /api/vi/hotels
const updateHotel = async (req, res) => {
    const id = req.params.id
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json(updateHotel)
    }
    catch (err) {
        next(err)
    }
}

// [DELETE] /api/vi/hotels
const deleteHotel = async (req, res) => {
    const id = req.params.id
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(id)
        res.status(200).json(deleteHotel)
    }
    catch (err) {
        next(err)
    }
}

// [GET] /api/vi/hotels
const getOneHotel = async (req, res, next) => {
    const id = req.params.id
    try {
        const getHotel = await Hotel.findById(id)
        res.status(200).json(getHotel)
    }
    catch (err) {
        next(err)
    }
}
// [GETALL] /api/vi/hotels
const getAllHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query
    try {
        const hotels = await Hotel.find({ ...others, cheapesPrice: { $gte: +min | 1, $lte: +max || 99999 } }).limit(limit)
        res.status(200).json(hotels)
    }
    catch (err) {
        next(err)
    }
}

// [GET] /api/vi/hotels/countByCity?cities=
const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    console.log(cities)
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    }
    catch (err) {
        next(err)
    }
}

// [GET] /api/vi/hotels/countByType
const countByType = async (req, res, next) => {
    try {

        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ])
    }
    catch (err) {
        next(err)
    }
}

const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    createHotel, updateHotel, deleteHotel,
    getOneHotel, getAllHotels, countByCity,
    countByType, getHotelRooms
}