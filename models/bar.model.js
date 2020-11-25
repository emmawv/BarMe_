const mongoose = require('mongoose')
const Schema = mongoose.Schema

const barSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
    default: "https://res.cloudinary.com/djqsmqs26/image/upload/v1606298246/Project-2/WhatsApp_Image_2020-11-25_at_10.57.03_j45d3b.jpg",
  },
  comments: [{
    userid: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: String
  }],
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }
}, { timestamps: true })

module.exports = mongoose.model('Bar', barSchema)