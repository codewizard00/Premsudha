const express = require('express');
const { getAllBanner, getBanner, createBanner, deleteBanner, getAllBannerType } = require('../Controller/bannerController');
const { authenticateJWT } = require('../Middleware/authentication');


const router = express();

//Crud Operations

router.get("/get/AllBanner",getAllBanner);

router.get("/get/AllBanner/:banner_type",getAllBannerType);

router.get("/get/banner/:id",authenticateJWT('ADMIN'),getBanner);

router.post("/create/banner",authenticateJWT('ADMIN'),createBanner);

router.delete("/delete/banner/:id",authenticateJWT('ADMIN'),deleteBanner);


module.exports = router;
