import express from 'express'
const router = express()
import adminController from '../controller/adminController.js'
import adminAuth from '../middlewares/adminAuth.js'


console.log('getting here')
router.post('/login',adminController.login)
router.post('/addbanner',adminController.addBanner)
router.post('/deletebanner',adminController.deleteBanner)
router.post("/addCategory",adminAuth , adminController.addCategory)
router.post("/addOffer",adminController.addOffer)



router.get('/status',adminController.status)
router.get('/getUsers',adminAuth,adminController.getUsers)
router.get('/getbanners',adminAuth,adminController.getBanners)
router.get("/getCategories",adminAuth , adminController.getCategories)
router.get("/getOffers",adminAuth,adminController.getOffers)
router.get('/logout',adminController.logout)

router.put("/updateActive",adminAuth, adminController.updateActive)
router.put("/blockUser",adminAuth, adminController.blockUser)

router.delete("/deleteOffer", adminController.deleteOffer)

export default router