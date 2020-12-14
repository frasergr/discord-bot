import asyncHandler from 'express-async-handler'
import Emote from '../models/emoteModel.js'

// @desc    Create an emote
// @route   POST /api/emotes
// @access  Private
const createEmote = asyncHandler(async (req, res) => {
  const {
    name,
    image
  } = req.body

  const emote = new Emote({
    name: name,
    image: image,
    user: req.user._id
  })

  const createdEmote = await emote.save()
  res.status(201).json(createdEmote)
})

// @desc    Fetch all emotes
// @route   GET /api/emotes
// @access  Private
const getEmotes = asyncHandler(async (req, res) => {
  const emotes = await Emote.find({})

  res.json({ emotes })
})

export { createEmote, getEmotes }