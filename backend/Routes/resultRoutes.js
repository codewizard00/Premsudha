const express = require('express');
const { getAllResult, createResult, updateResult, deleteResult } = require('../Controller/resultController');
const { authenticateJWT } = require('../Middleware/authentication');


const router = express();

//Crud Operations

router.get("/get/result/:competition_id",getAllResult);

router.post("/create/result/:competition_id",authenticateJWT('ADMIN'),createResult);

router.post("/update/result/:id",authenticateJWT('ADMIN'),updateResult);

router.delete("/delete/result/:id",authenticateJWT('ADMIN'),deleteResult);


module.exports = router;
