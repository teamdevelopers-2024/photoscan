import express from 'express'
const router = express()
import userController from '../controller/userController.js'


router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/getOtp', userController.getOtp)
router.post('/verifyOtp', userController.verifyOtp)
router.post('/refresh-token', userController.verifyRefreshToken)
router.put('/editProfile', userController.editProfile)
router.post('/resetOtp', userController.resetOtp)
router.post('/newPass', userController.newPass)
router.post('/changePass', userController.changePass)
router.post('/addAddress', userController.addAddress)
router.post('/addToCart', userController.addToCart)
router.get('/checkAuthenticate', userController.checkAuthenticate)
router.get('/getProducts', userController.getProducts)
router.get("/getBanners",userController.getBanners)
router.get("/getSingleProduct",userController.getSingleProduct)
router.get("/featuredProducts",userController.getFeaturedProducts)
router.get("/getCategories",userController.getCategories)
router.get("/getAddress",userController.getAddress)

router.get("/getBanners", userController.getBanners)
router.get("/getSingleProduct", userController.getSingleProduct)
router.get("/featuredProducts", userController.getFeaturedProducts)
router.get("/getCategories", userController.getCategories)
router.get("/getCart", userController.getCart)
router.get("/gatCartProducts",userController.getCartProducts)

router.put("/setDefaultAddress",userController.setDefaultAddress)


router.delete('/deleteCartItem', userController.deleteCartItem)
router.delete('/deleteAddress', userController.deleteAddress)
router.delete('/logout', userController.logout)
export default router; 