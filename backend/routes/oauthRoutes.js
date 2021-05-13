import express from 'express'
const router = express.Router()
import { 
  getOauthByUserAndName,
  createOrUpdateOauth,
  deleteOauth,
  revokeOauth,
  getOauthByUser,
  listOauth,
  getOauth,
  getOauthNameUrl
} from '../controllers/oauthController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getOauth)
router.route('/list').get(protect, admin, listOauth)
router.route('/url/:name').get(protect, getOauthNameUrl)
router.route('/:userId').get(protect, admin, getOauthByUser)
router.route('/:name/:userId').get(protect, admin, getOauthByUserAndName)
router.route('/:name').post(protect, createOrUpdateOauth)
router.route('/:name/revoke').put(protect, revokeOauth)
router.route('/:id').delete(protect, admin, deleteOauth)

export default router