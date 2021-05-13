import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { User, UserRegisterToken } from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token invalid')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized')
  }
}

const registerToken = asyncHandler(async (req, res, next) => {
  const token = await UserRegisterToken.findOne({ token: req.body.registerToken, profileId: req.body.registerProfileId })

  if (!token) {
    res.status(401)
    throw new Error('Invalid registration token')
  }

  if (token) {
    const expires = new Date(token.expires)
    if (expires < new Date()) {
      res.status(401)
      throw new Error('Registration token expired')
    }
    if (token.registered) {
      res.status(401)
      throw new Error('User already registered')
    }
  }

  req.registerTokenId = token._id

  next()
})

export { protect, admin, registerToken }