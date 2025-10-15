import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/user.route.js'
import messageRouter from './routes/message.route.js'
import cors from "cors"
import cookieParser from 'cookie-parser'
import { app, server } from './socketIO/server.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
dotenv.config()
const PORT = process.env.PORT || 4002

// Connect MongoDB database
const Mongo_URI = process.env.MONGODB_URI 

try {
    mongoose.connect(Mongo_URI)
    console.log('Mongodb connected successfully.')
} catch (error) {
    console.log('Error while connecting mongodb database.' ,error)
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// define routes

app.use('/api/user',userRouter)
app.use('/api/message',messageRouter)


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


