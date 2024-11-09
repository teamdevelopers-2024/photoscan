import express from 'express';
import cors from 'cors';
import "dotenv/config";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo'; // Import MongoStore
import AdminRouter from './routes/adminRouter.js';
import connectDb from './database/connection.js';
import UserRouter from './routes/userRouter.js';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:5001', 'http://localhost:3000', 'http://localhost:3001','http://192.168.31.121:3000', 'https://photoscan.co.in','https://admin.photoscan.co.in'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

connectDb(); // Connect to your MongoDB

app.use(session({
    secret: 'photoscan@1223',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27018/sessions' }),
    cookie: {
      secure: true,  // Use HTTPS in production
      sameSite: 'None',  // Allow cross-origin cookie
      maxAge: 1 * 60 * 60 * 1000,  // 1 hour
      domain: '.photoscan.co.in'  // Set the domain if using subdomains
    }
  }));
  

app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        error:false,
        message:"photoscan api is working fine"
    })
})

app.use('/user', UserRouter);
app.use('/admin', AdminRouter);

app.listen(port, () => {
    console.log('Server running at', port);
});
