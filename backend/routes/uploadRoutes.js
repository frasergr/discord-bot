import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(new Error('Images only'), false)
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
  limits: {
    fileSize: 2 * 1024 * 1024
  }
})

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router