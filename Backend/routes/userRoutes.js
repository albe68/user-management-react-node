const router=require('express').Router();
const UserController=require('../controllers/userControllers')
const authMiddleware=require('../middlewear/authmiddlewear')
const upload=require('../config/multer')


router.post('/signup',UserController.userSignup)
router.post('/login',UserController.userlogin)
router.get('/get-user-data',authMiddleware,UserController.getUser)
router.post('/update-user-data',authMiddleware,UserController.updateProfile)
router.post('/profilepic-upload',upload.single('image'),authMiddleware,UserController.uploadProfilepic)

module.exports=router