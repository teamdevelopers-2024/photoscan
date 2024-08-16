import express from 'express'
const router = express()
import adminController from '../controller/adminController.js'

router.post('/login',adminController.login)








export default router