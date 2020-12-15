import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'
import { uploadImage } from '../controllers/uploadController.js'

router.post('/', protect, upload.single('image'), uploadImage)

export default router