const express = require('express');
const { getAllWiter, getWriter, cerateWriter, updateWriter, deleteWriter } = require('../Controller/writerController');
const { authenticateJWT } = require('../Middleware/authentication');


const router = express();

//Crud Operations

router.get("/get/AllWriterContent/:writer_id",getAllWriter);

router.post("/create/writerContent/:writer_id",authenticateJWT('ADMIN'),cerateWriter);

router.post("/update/writercontent/:writer_id/:",authenticateJWT('ADMIN'),updateWriter);

router.delete("/delete/writercontent/:writer_id/:id",authenticateJWT('ADMIN'),deleteWriter);


module.exports = router;
