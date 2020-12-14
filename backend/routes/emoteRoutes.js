import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { createEmote, getEmotes } from '../controllers/emoteController.js'

router.route('/').get(protect, getEmotes).post(protect, createEmote)

export default router