import express from 'express'
const router = express()
import adminController from '../controller/adminController.js'

router.post('/login',adminController.login)
router.get('/status',adminController.status)







export default router