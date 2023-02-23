const db = require("../Database");
const Result = db.Result;
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");



exports.createResult = catchAsyncError(async (req, res) => {
    const {image_base_64,image_alt,banner_type } = req.body;
    const {url} = await Cloudinary(image_base_64,image_alt);
    const data = await Banner.create({image_url:url,image_alt,banner_type});
    return res.status(200).json({ message: "Succesfully Created" });
})