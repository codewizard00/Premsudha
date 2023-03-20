const express = require('express');
const { getAllWriter, getWriter, cerateWriter, updateWriter, deleteWriter } = require('../Controller/writerController');
const { authenticateJWT } = require('../Middleware/authentication');


const router = express();

//Crud Operations

router.get("/get/AllWriter",getAllWriter);

router.get("/get/writer/:id",getWriter);

router.post("/create/writer",authenticateJWT('ADMIN'),cerateWriter);

router.post("/update/writer/:id",authenticateJWT('ADMIN'),updateWriter);

router.delete("/delete/writer/:id",authenticateJWT('ADMIN'),deleteWriter);


module.exports = router;
