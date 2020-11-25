const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["GUEST", "BOSS", "ADMIN"],
    },
    email: String,
    profileImg: {
        type: String,
        default: "https://res.cloudinary.com/djqsmqs26/image/upload/v1606298769/Project-2/pngwing.com_rl5rhk.png"
    },
    favBars: [String],
    telephone: Number
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)