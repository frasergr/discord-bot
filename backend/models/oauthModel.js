import mongoose from 'mongoose'

const oauthSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['discord']
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  expires: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  revoked: {
    type: Boolean,
    required: false,
    default: false
  },
  profile: {
    id: { 
      type: String,
      required: false
    },
    userName: {
      type: String,
      required: false
    },
    discriminator: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    },
    avatar: {
      type: String,
      required: false
    }
  }
}, {
  timestamps: true
})

const Oauth = mongoose.model('Oauth', oauthSchema)

export default Oauth