const express = require('express');
const { getAllWriterContent, updateWriterContent, deleteWriterContent, cerateWriterContent, getWriterType } = require('../Controller/writerContent');
const { authenticateJWT } = require('../Middleware/authentication');


const router = express();

//Crud Operations

router.get("/get/AllWriterContent/:writer_id",getAllWriterContent);

router.post("/create/writerContent/:writer_id",authenticateJWT('ADMIN'),cerateWriterContent);

router.post("/update/writercontent/:writer_id/:id",authenticateJWT('ADMIN'),updateWriterContent);

router.delete("/delete/writercontent/:writer_id/:id",authenticateJWT('ADMIN'),deleteWriterContent);

router.get("/get/writercontent/:writer_id/:type",getWriterType)

module.exports = router;
