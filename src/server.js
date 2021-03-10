import express from 'express'
import { json, urlencoded } from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import eventRouter from './resources/event/event.router'

export const app = express()
dotenv.config();
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use('/api/event', eventRouter)


//Connecting to the database
mongoose.connect(process.env.DB_CONNECTION
    ,{ useNewUrlParser: true,useUnifiedTopology: true},
     ()=> console.log('connected to db'));


// starting the server
app.listen(process.env.PORT,()=> console.log('server is running'));