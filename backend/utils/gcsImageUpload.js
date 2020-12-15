import path from 'path'
import crypto from 'crypto'
const __dirname = path.resolve()
const gcsServiceKey = path.join(__dirname, './gcs-key.json')
import gcs from '@google-cloud/storage'

const gcsImageUpload = (file, directory) => new Promise((resolve, reject) => {
  const { Storage } = gcs
  const storage = new Storage({
    keyFilename: gcsServiceKey,
    projectId: `${process.env.GOOGLE_CLOUD_PROJECT_NAME}`,
  })
  const bucket = storage.bucket(`${process.env.GOOGLE_CLOUD_STORAGE_BUCKET}`)
  const { originalname, buffer } = file
  const blob = bucket.file(`${directory}/${crypto.randomBytes(20).toString('hex')}-${Date.now()}-${originalname.replace(/ /g, "_")}`)
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    blob.makePublic()
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})

export default gcsImageUpload