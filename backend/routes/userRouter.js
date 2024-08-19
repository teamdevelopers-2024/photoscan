import express from 'express'
const router = express()
import userController from '../controller/userController.js'


router.post('/login',userController.login)
router.post('/register',userController.register)

export default router;