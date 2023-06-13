const router=require('express').Router();
const adminControllers=require('../controllers/adminControllers')


router.post('/login',adminControllers.login)

router.get('/get-users',adminControllers.getAllUsers)


router.post('/searchUser',adminControllers.searchUsers)

router.get('/delete-user/:id', adminControllers.deleteUser);

router.post('/update-user',adminControllers.updateUser)
module.exports=router;