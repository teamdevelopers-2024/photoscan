import express from 'express'
const router = express()
import userController from '../controller/userController.js'


router.post('/login',userController.login)
router.post('/register',userController.register)
router.post('/getOtp',userController.getOtp)
router.post('/verifyOtp',userController.verifyOtp)

export default router;