import asyncHandler from 'express-async-handler'
import gcsImageUpload from '../utils/gcsImageUpload.js'

// @desc    Image upload
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  try {
    const imageUrl = await gcsImageUpload(req.file, 'emotes')
    res.status(200).json({
      message: "Upload was successful",
      url: imageUrl
    })
  } catch (error) {
    res.status(500)
    throw new Error('Emote upload not successful')
  }
})

export { uploadImage }