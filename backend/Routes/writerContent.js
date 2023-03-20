const express = require('express');
const { authenticateJWT } = require('../Middleware/authentication');


const router = express();

//Crud Operations

router.get("/get/AllWriterContent/:writer_id",);

router.post("/create/writerContent/:writer_id",authenticateJWT('ADMIN'),);

router.post("/update/writercontent/:writer_id/:id",authenticateJWT('ADMIN'),);

router.delete("/delete/writercontent/:writer_id/:id",authenticateJWT('ADMIN'),);


module.exports = router;
