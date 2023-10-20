const listUser = require('../models/User')
const bcrypt = require('bcrypt')
const createError = require('../util/error')
const jwt = require('jsonwebtoken')
const dotevn = require('dotenv')
const register = async (req, res, next) => {
    try {
        let { userName, email, password } = req.body
        const salt = bcrypt.genSaltSync()
        const hashingPassword = bcrypt.hashSync(password, salt)
        const newUser = await new listUser({ userName, email, password: hashingPassword })
        await newUser.save()
        res.status(200).json(newUser)
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        let { userName, passwordInput } = req.body

        const user = await listUser.findOne({ userName })
        if (!user) { return next(createError(404, "Không tìm thấy user")) }

        const isPasswordCorrect = bcrypt.compareSync(passwordInput, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Sai mật khẩu"))

        // Tạo token vời JWT
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        // Giấu password và những thông tin nhạy cảm cho phía Client
        let { password, isAdmin, ...Other } = user._doc
        res
            .cookie("acess_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ ...Other })
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    register, login
}