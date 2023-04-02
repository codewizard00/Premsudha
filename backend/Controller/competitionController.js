

const db = require("../Database")
const Competions = db.competions;
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");
const ErrorHandling = require("../Utils/ErrorHandling");

exports.getAllCompetition = catchAsyncError(async (req, res) => {
    const data = await Competions.findAll();
    res.status(200).json({ message: data });
})

exports.getAllCompetitionType = catchAsyncError(async (req, res) => {
    const { type } = req.params;
    const data = await Competions.findAll({ where: { type } });
    res.status(200).json({ message: data });
})

exports.getCompetition = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Competions.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        res.status(200).json({ message: data });
    }
})

exports.deleteCompetition = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Competions.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data = await Competions.destroy({ where: { id } });
        return res.status(200).json({ message: "Succesfully Deleted" });
    }
})

exports.updatateCompetitions = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { title, place, timings, about, keyword, image_base64,image_base64_mobile, image_alt, type } = req.body;
    const data = await Competions.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const { url } = await Cloudinary(image_base64, image_alt);
        const image = await Cloudinary(image_base64_mobile, image_alt+"_mobile");
        const data = await Competions.update({ title, keyword, place, timings, about, image_url: url,image_mobile_url:image.url, image_alt, type }, { where: { id } })
        return res.status(200).json({ message: "Succesfully Updated" });
    }
})

exports.createCompetitions = catchAsyncError(async (req, res) => {
    const { title, place, timings, content, image_alt, image_base64, image_base64_mobile, about, keyword, type } = req.body
    const { url } = await Cloudinary(image_base64, image_alt);
    const mobile = await Cloudinary(image_base64_mobile, image_alt+"_mobile");
    const data = await Competions.create({ title, place, timings, keyword, content, image_url: url, image_mobile_url: mobile.url, image_alt, about, type });
    return res.status(200).json({ message: "Succesfully Created" });
})