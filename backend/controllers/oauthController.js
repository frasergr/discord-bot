import asyncHandler from 'express-async-handler'
import Oauth from '../models/oauthModel.js'
import { getDiscordOauth, revokeDiscordOauth, getDiscordOauthUrl } from '../discord/oauth.js'
import fetchOauthProfile from '../utils/fetchOauthProfile.js'

// @desc    Create or update oauth
// @route   POST /api/oauth/:name
// @access  Private
const createOrUpdateOauth = asyncHandler(async (req, res, next) => {
  const { name } = req.params
  const { code } = req.body

  let oauthData
  try {
    switch(name) {
      case 'discord':
        if (code) {
          const { data } = await getDiscordOauth(code)
          oauthData = {
            name,
            user: req.user._id,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            scope: data.scope,
            type: data.token_type,
            expires: data.expires_in,
            revoked: false
          }
        } else {
          oauthData = await Oauth.findOne({ user: req.user._id, name: name })
        }
        break
    }

    oauthData.profile = await fetchOauthProfile(name, oauthData.accessToken)

    const oauth = await Oauth.findOneAndUpdate({ name: name, user: req.user._id }, oauthData, { upsert: true, runValidators: true, new: true })
  
    await oauth.save(async (err, data) => {
      if (err) {
        res.status(400)
        throw new Error('Oauth save failed')
      } else {
        res.status(201)
        res.json({
          _id: data._id,
          name: data.name,
          profile: data.profile,
          revoked: data.revoked
        })
      }
    })
  } catch (err) {
    res.status(400)
    return res.json(err.response.data)
  }
})

// @desc    Get oauth authorization URL
// @route   GET /api/oauth/url/:name
// @access  Private
const getOauthNameUrl = asyncHandler(async (req, res) => {
  let url = ''
  switch(req.params.name) {
    case 'discord':
      url = getDiscordOauthUrl()
      break
  }
  res.json(url)
})

// @desc    Get oauth by name and user
// @route   GET /api/oauth/:name/:userId
// @access  Private/Admin
const getOauthByUserAndName = asyncHandler(async (req, res) => {
  const oauth = await Oauth.find({ name: req.params.name, user: req.params.userId })
  res.json(oauth)
})

// @desc    Get all oauth of user
// @route   GET /api/oauth
// @access  Private
const getOauth = asyncHandler(async (req, res) => {
  const oauth = await Oauth.find({ user: req.user._id }).select('_id name revoked expires userName profile discriminator')
  res.json(oauth)
})

// @desc    Get oauth by user
// @route   GET /api/oauth/user/:userId
// @access  Private/Admin
const getOauthByUser = asyncHandler(async (req, res) => {
  const oauth = await Oauth.find({ user: req.params.userId })
  res.json(oauth)
})

// @desc    Get all oauth
// @route   GET /api/oauth/list
// @access  Private/Admin
const listOauth = asyncHandler(async (req, res) => {
  const oauth = await Oauth.find({})
  res.json(oauth)
})

// @desc    Delete oauth
// @route   DELETE /api/oauth/:id
// @access  Private/Admin
const deleteOauth = asyncHandler(async (req, res) => {
  const oauth = await Oauth.findById(req.params.id)

  if (oauth) {
    const { status } = await revokeDiscordOauth(oauth.accessToken)
    if (status === 200) {
      await oauth.remove()
      res.json({ message: 'Oauth deleted' })
    } else {
      res.status(400)
      throw new Error('Error deleting oauth')
    }
  } else {
    res.status(404)
    throw new Error('Oauth not found')
  }
})

// @desc    Revoke oauth
// @route   PUT /api/oauth/:name/revoke
// @access  Private
const revokeOauth = asyncHandler(async (req, res) => {
  const user = (req.user.isAdmin && req.body.userId) ? req.body.userId : req.user._id
  const oauth = await Oauth.findOne({ name: req.params.name, user, revoked: false })
  if (oauth) {
    const { status } = await revokeDiscordOauth(oauth.accessToken)
    if (status === 200) {
      oauth.revoked = true
      await oauth.save((err, data) => {
        if (err) {
          res.status(400)
          throw new Error('Oauth save after revocation failed')
        } else {
          res.json({
            _id: data._id,
            name: data.name,
            revoked: data.revoked,
            expires: data.expires
          })
        }
      })
    } else {
      res.status(400)
      throw new Error('Oauth revocation failed')
    }
  } else {
    res.status(404)
    throw new Error('Oauth not found')
  }
})

export {
  createOrUpdateOauth,
  listOauth,
  getOauthByUser,
  getOauthByUserAndName,
  deleteOauth,
  revokeOauth,
  getOauth,
  getOauthNameUrl
}