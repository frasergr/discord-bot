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
    name: name || 'new',
    image: image || 'new',
    user: req.user._id
  })

  const createdEmote = await emote.save()
  res.status(201).json(createdEmote)
})

// @desc    Fetch all emotes
// @route   GET /api/emotes
// @access  Private
const getEmotes = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Emote.countDocuments({ ...keyword })
  const emotes = await Emote.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))

  res.json({ emotes, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch a single emote
// @route   GET /api/emotes/:id
// @access  Private
const getEmoteById = asyncHandler(async (req, res) => {
  const emote = await Emote.findById(req.params.id)
  if (emote) {
    res.json(emote)
  } else {
    res.status(404)
    throw new Error('Emote not found')
  }
})

// @desc    Delete a emote
// @route   DELETE /api/emotes/:id
// @access  Private/Admin
const deleteEmote = asyncHandler(async (req, res) => {
  const emote = await Emote.findById(req.params.id)
  if (emote) {
    await emote.remove()
    res.json({ message: 'Emote deleted' })
  } else {
    res.status(404)
    throw new Error('Emote not found')
  }
})

// @desc    Update a emote
// @route   PUT /api/emotes/:id
// @access  Private
const updateEmote = asyncHandler(async (req, res) => {
  const {
    name,
    image,
  } = req.body

  const emote = await Emote.findById(req.params.id)

  if (emote) {    
    emote.name = name || emote.name
    emote.image = image || emote.image

    await emote.save((err, data) => {
      if (err) {
        res.status(400)
        res.json(err)
      } else {
        res.status(200)
        res.json({
          _id: data._id,
          name: data.name,
          user: data.user,
          image: data.image,
        })
      }
    })
  } else {
    res.status(404)
    throw new Error('Emote not found')
  }
})

export {
  getEmotes,
  getEmoteById,
  deleteEmote,
  createEmote,
  updateEmote,
}