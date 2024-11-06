import express from 'express'
const router = express()
import userController from '../controller/userController.js'


router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/getOtp', userController.getOtp)
router.post('/verifyOtp', userController.verifyOtp)
router.post('/refresh-token', userController.verifyRefreshToken)
router.put('/editProfile',userController.editProfile)
router.post('/resetOtp', userController.resetOtp)
router.post('/newPass', userController.newPass)
router.post('/changePass', userController.changePass)

router.get('/checkAuthenticate', userController.checkAuthenticate)
router.get("/getBanners",userController.getBanners)


router.delete('/logout', userController.logout)
export default router; 