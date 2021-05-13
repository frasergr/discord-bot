import asyncHandler from 'express-async-handler'
import crypto from 'crypto'
import { UserRegisterToken } from '../models/userModel.js'

const generateUserRegisterToken = asyncHandler(async (oauthId) => {
  const token = crypto.randomBytes(32).toString('hex')
  const userRegisterToken = await UserRegisterToken.findOneAndUpdate({ oauthId }, {
    token,
    oauthId,
    expires: new Date().setHours(new Date().getHours() + 1)
  }, { upsert: true, runValidators: true, new: true })
  return userRegisterToken
})

export default generateUserRegisterToken