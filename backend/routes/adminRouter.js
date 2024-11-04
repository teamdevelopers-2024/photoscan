import express from 'express'
const router = express()
import adminController from '../controller/adminController.js'
import adminAuth from '../middlewares/adminAuth.js'


console.log('getting here')
router.post('/login',adminController.login)
router.post('/addframes',adminController.addframes)
router.post("/addCategory",adminAuth , adminController.addCategory)



router.get('/status',adminController.status)
router.get('/getUsers',adminAuth,adminController.getUsers)
router.get('/getframes',adminAuth,adminController.getframes)
router.get("/getCategories",adminAuth , adminController.getCategories)

router.put("/updateActive",adminAuth, adminController.updateActive)
router.put("/blockUser",adminAuth, adminController.blockUser)
export default router