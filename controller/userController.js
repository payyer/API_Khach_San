const User = require('../models/User')

// [PUT] /api/vi/Users
const updateUser = async (req, res, next) => {
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    }
    catch (err) {
        next(err)
    }
}

// [DELETE] /api/vi/Users/:id
const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json(deleteUser)
    }
    catch (err) {
        next(err)
    }
}

// [GET] /api/vi/Users
const getOneUser = async (req, res) => {
    const id = req.params.id
    try {
        const getUser = await User.findById(id)
        res.status(200).json(getUser)
    }
    catch (err) {
        next(err)
    }
}
// [GETALL] /api/vi/Users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    updateUser, deleteUser,
    getOneUser, getAllUsers
}