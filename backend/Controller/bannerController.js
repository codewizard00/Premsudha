const db = require("../Database");
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");
const ErrorHandling = require("../Utils/ErrorHandling");
const Banner = db.banner;


exports.getAllBanner = catchAsyncError(async (req, res) => {
    const data = await Banner.findAll();
    res.status(200).json({ message: data });
})

exports.getAllBannerType = catchAsyncError(async (req, res) => {
    const {banner_type} = req.params;
    const data = await Banner.findAll({where:{banner_type}});
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
    const { image_base_64, image_alt, banner_type,image_base_64_mobile,about } = req.body;

    const image = await Cloudinary(image_base_64, image_alt);
    const image_mobile = await Cloudinary(image_base_64_mobile, image_alt+"_mobile");
   
    const data = await Banner.create({ image_url: image.url, about,image_alt, banner_type,image_mobile_url:image_mobile.url });
   
    return res.status(200).json({ message: "Succesfully Created" });
})
