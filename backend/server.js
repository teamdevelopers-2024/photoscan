import express from 'express'
import cors from 'cors'
import "dotenv/config"
import session from 'express-session'
import cookieParser from 'cookie-parser'
import AdminRouter from './routes/adminRouter.js'


const app = express()
const port = process.env.port || 5000

app.use(cookieParser());
app.use(session({
    secret:'photoscan@1223',
    resave:false,
    saveUninitialized:true,
    cookie: {
        secure:false,
        sameSite:"strict",
        maxAge: 1 * 60 * 60 * 1000
    }
}))

app.use(express.urlencoded({extended:true}))



const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };


  app.use(express.json())

  app.use('/admin',AdminRouter)


  app.listen(port , ()=>{
    console.log('server runngin att ' , port)
  })  