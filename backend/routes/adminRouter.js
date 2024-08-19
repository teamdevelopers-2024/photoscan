import express from 'express'
const router = express()
import adminController from '../controller/adminController.js'
import adminAuth from '../middlewares/adminAuth.js'


console.log('getting here')
router.post('/login',adminController.login)
router.get('/status',adminController.status)
router.get('/getUsers',adminAuth,adminController.getUsers)


export default router