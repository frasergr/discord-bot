import path from 'path'
import express from 'express'
import compression from 'compression'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

import emoteRoutes from './routes/emoteRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import discordBot from './discord/bot.js'

dotenv.config()

connectDB()

discordBot()

const app = express()

app.use(compression())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  app.get('/', (req, res) => {
    res.send('API running...')
  })
}

app.use('/api/emotes', emoteRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))