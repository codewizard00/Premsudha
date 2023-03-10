const express = require('express');
const { userRegister, userLogin, getAllUser, resetPassword, emailVerify, forgotPassword, adminLogin, resendOtp } = require('../Controller/userController');
const { authenticateJWT } = require('../Middleware/authentication');
const Validation = require('../Middleware/ValidationMiddleware')

const router = express();


router.post('/user/register', Validation('registerSchema'), userRegister);

router.post('/user/login', Validation('loginSchema'), userLogin);

router.post('/admin/login', Validation('loginSchema'), adminLogin);

router.get('/getAllUser', authenticateJWT('ADMIN'), getAllUser);

router.post('/emailVerify', emailVerify);

router.post("/resendOtp",resendOtp);

router.post("/forgot/password", forgotPassword)

router.post("/reset/password", authenticateJWT('CUSTOMER'), resetPassword)

// router.post('/Verification/byEmail');

module.exports = router;
