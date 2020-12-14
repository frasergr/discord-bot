import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const emoteSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    ref: 'User'
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

emoteSchema.plugin(uniqueValidator)

const Emote = mongoose.model('Emote', emoteSchema)

export default Emote