const mongoose = require('mongoose');
const bcrypt = require('bcrypt') // package hashing 
const Schema = mongoose.Schema;

const User = new Schema({
    email: { type: String, required: true, uniqued: true },
    password: { type: String, required: true, minLength: 6 },
})

// This call middleware in mongoose
// Hook ??? it true?
// Đoạn mã: Trước khi (pre) bản ghi mới được lưu với phương thức ('save') của mongoose.
// đoạn mã bên trong sẽ được thực hiện
// Sử dụng ở Controller User.create() -> thức ra là save() 
// Nên đoạn mã này thực hiện hashing password
User.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// static method to use
User.statics.login = async function (email, password) {
    // use this because (nó dùng được bỏi tên module User.findOne())
    const user = await this.findOne({ email: email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error(`Incorect password`)
    }
    throw Error(`Email are not exits are wrong!!`)
}

module.exports = mongoose.model('user', User);