import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

const userRegisterTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  profileId: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  registered: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

userSchema.plugin(uniqueValidator)

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
const UserRegisterToken = mongoose.model('UserRegisterToken', userRegisterTokenSchema)

export { User, UserRegisterToken }