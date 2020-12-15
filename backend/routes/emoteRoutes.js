import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { createEmote, getEmotes, getEmoteById, deleteEmote, updateEmote } from '../controllers/emoteController.js'

router.route('/').get(protect, getEmotes).post(protect, createEmote)
router.route('/:id').get(getEmoteById).delete(protect, deleteEmote).put(protect, updateEmote)

export default router