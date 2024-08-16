import express from 'express'
const router = express()
import userController from '../controller/userController.js'


router.post('/login',userController.login)


export default express