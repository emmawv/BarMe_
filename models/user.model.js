const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    role: {
        type:String,
        enum: ["GUEST", "BOSS", "ADMIN"],  
    },
    email: String,
    profileImg: String,
    // comments: [String],
    favBars: [String],
    // ownBars:[String],
    telephone:Number

}, { timestamps: true })

module.exports=mongoose.model('User', userSchema)