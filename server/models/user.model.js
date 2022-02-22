const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        schema: { type: Number, required: true },
        acctDate: { type: Date, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: false },
        password: { type: String, required: true },
        birthDate: { type: Date, required: true },
    },
    {
        collection: 'user'
    }
)

const model = mongoose.model('UserData', User);

module.exports = model