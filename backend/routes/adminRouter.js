import express from 'express'
const router = express()
import adminController from '../controller/adminController.js'
import adminAuth from '../middlewares/adminAuth.js'



router.post('/login',adminController.login)
router.get('/status',adminController.status)
router.get('/getUsers',adminAuth,adminController.getUsers)






export default router