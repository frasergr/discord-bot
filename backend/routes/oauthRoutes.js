import express from 'express'
const router = express.Router()
import { 
  getOauthByUserAndName,
  createOauth,
  deleteOauth,
  revokeOauth,
  getOauthByUser,
  listOauth,
  getOauth,
  getOauthNameUrl
} from '../controllers/oauthController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getOauth)
router.route('/:name').get(protect, getOauthNameUrl)
router.route('/list').get(protect, admin, listOauth)
router.route('/:userId').get(protect, admin, getOauthByUser)
router.route('/:name').post(protect, createOauth)
router.route('/:name/:userId').get(protect, admin, getOauthByUserAndName)
router.route('/:name/revoke').put(protect, revokeOauth)
router.route('/:id').delete(protect, admin, deleteOauth)

export default router