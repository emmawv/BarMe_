const mongoose = require('mongoose')
const Schema = mongoose.Schema

const barSchema = new Schema({
  name: String,
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  image: String,
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