import express from 'express'
import cors from 'cors'
import "dotenv/config"
import session from 'express-session'
import cookieParser from 'cookie-parser'
import AdminRouter from './routes/adminRouter.js'
import connectDb from './database/connection.js'
import UserRouter from './routes/userRouter.js'

const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:5173','http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions))

app.use(cookieParser())
app.use(session({
    secret: 'photoscan@1223',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        sameSite: "strict",
        maxAge: 1 * 60 * 60 * 1000
    }
}))

connectDb()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/user', UserRouter)
app.use('/admin', AdminRouter)

app.listen(port, () => {
    console.log('Server running at', port)
})
