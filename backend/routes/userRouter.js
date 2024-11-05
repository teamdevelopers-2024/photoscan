import express from 'express'
const router = express()
import userController from '../controller/userController.js'


router.post('/login',userController.login)
router.post('/register',userController.register)
router.post('/getOtp',userController.getOtp)
router.post('/verifyOtp',userController.verifyOtp)
router.post('/refresh-token',userController.verifyRefreshToken)
router.put('/editProfile',userController.editProfile)
router.post('/resetOtp',userController.resetOtp)
router.post('/newPass',userController.newPass)


router.get('/checkAuthenticate',userController.checkAuthenticate)



router.delete('/logout',userController.logout)
export default router; 