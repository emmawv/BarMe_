const mongoose = require('mongoose')
const Schema = mongoose.Scheema

const barSchema = new Schema({
    name: String,
    description: String,
      Owner: [{
        type:Schema.Types.ObjectId,
        ref:'Users'
    }],
    image: String,
    comments: [String],
    location: {                 
    type: {
      type: String
    },
    coordinates: [Number]
    }
    

},{ timestamps: true })