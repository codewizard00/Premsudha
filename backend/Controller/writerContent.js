const db = require("../Database")
const Writer = db.writer;
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");
const ErrorHandling = require("../Utils/ErrorHandling");

exports.getAllWriter = catchAsyncError(async (req, res) => {
    const data = await Writer.findAll();
    const { id } = req.params;
    res.status(200).json({ message: data });
})

exports.getWriter = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Writer.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        res.status(200).json({ message: data });
    }
})

exports.deleteWriter = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Writer.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data = Writer.destroy({ where: { id } });
        return res.status(200).json({ message: "Succesfully Deleted" });
    }
})

exports.updateWriter = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { name, gender, place, image_base64, image_alt } = req.body;
    const data = await Writer.findOne({ where: { id } });

    let url;
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        if (image_base64.length < 50) {
            url = image_base64;
        }
        else {
            const data1 = await Cloudinary(image_base64, image_alt);
            url = data1.url;
        }
        const data = await Writer.update({ name, place, gender, image_url: url, image_alt }, { where: { id } })
        return res.status(200).json({ message: "Succesfully Updated" });
    }
})

exports.cerateWriter = catchAsyncError(async (req, res) => {
    const { name, place, gender, image_alt, image_base64 } = req.body;
    const response = await Cloudinary(image_base64, image_alt);
    const data = await Writer.create({ name, place, gender, image: response.url, image_alt });
    return res.status(200).json({ message: "Succesfully Created" });
})