const express = require('express');
const { sendTest, sendToAllUser } = require('../Controller/emailController');
const { authenticateJWT } = require('../Middleware/authentication');


const router = express();

//Crud Operations


router.post("/sendEmail/Test",authenticateJWT('ADMIN'),sendTest);

router.post("/sendEmail",authenticateJWT('ADMIN'),sendToAllUser);


module.exports = router;
