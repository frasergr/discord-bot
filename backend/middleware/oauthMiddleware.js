import asyncHandler from 'express-async-handler'
import Oauth from '../models/oauthModel.js'

const oauth = asyncHandler(async (req, res, next) => {
  const oauth = await Oauth.findOne({ user: req.user._id, name: req.params.name })
  if (oauth) {
    req.body.oauth = oauth
  }
  next()
})

export { oauth }