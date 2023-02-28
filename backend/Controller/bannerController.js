const db = require("../Database");
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");
const ErrorHandling = require("../Utils/ErrorHandling");
const Banner = db.banner;


exports.getAllBanner = catchAsyncError(async (req, res) => {
    const data = await Banner.findAll();
    res.status(200).json({ message: data });
})

exports.getBanner = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Banner.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        res.status(200).json({ message: data });
    }
})

exports.deleteBanner = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Banner.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data = await Banner.destroy({ where: { id } });
        return res.status(200).json({ message: "Succesfully Deleted" });
    }
})

exports.createBanner = catchAsyncError(async (req, res) => {
    
    const { image_base_64, image_alt, banner_type } = req.body;

    const image = await Cloudinary(image_base_64, image_alt);
   
    const data = await Banner.create({ image_url: image.url, image_alt, banner_type });
   
    return res.status(200).json({ message: "Succesfully Created" });
})
