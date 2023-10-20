const listRoom = require('../models/Room')
const listHotel = require('../models/Hotel')
const createErorr = require('../util/error')

// [PUT] /api/v1/rooms/:id
const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new listRoom(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await listHotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id }
            })
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    }
    catch (err) {
        next(err)
    }
}

// [PUT] /api/v1/rooms/:id
const updateRoom = async (req, res, next) => {
    const id = req.params.id
    try {
        const updateRoom = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json(updateRoom)
    }
    catch (err) {
        next(err)
    }
}

// [PUT] /api/v1/rooms/availability/:id
const updateRoomAvailability = async (req, res, next) => {

    try {
        await listRoom.updateOne({ "roomNumbers._id": req.params.id }, {
            $push: {
                "roomNumbers._id.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json(updateRoom)
    }
    catch (err) {
        next(err)
    }
}

// [DELETE] /api/v1/rooms/:id
const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    const id = req.params.id
    try {
        const deleteRoom = await listRoom.findByIdAndDelete(id)
        try {
            await listHotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: deleteRoom._id }
            })
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(deleteRoom)
    }
    catch (err) {
        next(err)
    }
}

// [GET] /api/v1/rooms/:id
const getOneRoom = async (req, res, next) => {
    const id = req.params.id
    try {
        const getRoom = await listRoom.findById(id)
        res.status(200).json(getRoom)
    }
    catch (err) {
        next(err)
    }
}
// [GETALL] /api/v1/rooms
const getAllRoom = async (req, res, next) => {
    try {
        const room = await listRoom.find({})
        res.status(200).json(room)
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getOneRoom,
    getAllRoom,
    updateRoomAvailability
}