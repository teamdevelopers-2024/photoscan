import express from 'express'
const router = express()
import adminController from '../controller/adminController.js'
import adminAuth from '../middlewares/adminAuth.js'


console.log('getting here')
router.post('/login',adminController.login)
router.post('/addbanner',adminController.addBanner)
router.post('/addproduct',adminController.addProduct)
router.post('/deletebanner',adminController.deleteBanner)
router.post("/addCategory",adminAuth , adminController.addCategory)
router.post("/addOffer",adminController.addOffer)
router.post("/updateFeatured",adminAuth, adminController.updateFeatured)


router.get('/status',adminController.status)
router.get('/getUsers',adminAuth,adminController.getUsers)
router.get('/getCardData',adminAuth,adminController.getCardData)
router.get('/getbanners',adminAuth,adminController.getBanners)
router.get('/getproducts',adminAuth,adminController.getProducts)
router.get("/getCategories",adminAuth , adminController.getCategories)
router.get("/getOffers",adminAuth,adminController.getOffers)
router.get('/logout',adminController.logout)

router.put("/updateActive",adminAuth, adminController.categoryActive)
router.put("/blockUser",adminAuth, adminController.blockUser)

router.delete("/deleteOffer", adminController.deleteOffer)

export default router