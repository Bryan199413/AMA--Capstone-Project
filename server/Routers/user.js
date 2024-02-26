const express = require('express');
const userController = require('../Controllers/user');
const router = express.Router();


router.post('/signup',userController.signUpUser);
router.post('/login',userController.loginUser);
router.post('/logout',userController.logoutUser);

// router.post('/signup/verify',userController.verifyOtp)



module.exports = router;