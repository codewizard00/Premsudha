const db = require("../Database")
const Teams = db.teams;
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");
const ErrorHandling = require("../Utils/ErrorHandling");

exports.getAllTeam = catchAsyncError(async (req, res) => {
    const data = await Teams.findAll();
    res.status(200).json({ message: data });
})

exports.getTeam = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Teams.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        res.status(200).json({ message: data });
    }
})

exports.deleteTeam = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Teams.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data = Teams.destroy({ where: { id } });
        return res.status(200).json({ message: "Succesfully Deleted" });
    }
})

exports.updateTeam = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { fullName, place, position, about, image_base64, image_alt } = req.body;
    const data = await Teams.findOne({ where: { id } });
   
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
        const data = await Teams.update({ fullName, place, position, about, image_url: url, image_alt }, { where: { id } })
        return res.status(200).json({ message: "Succesfully Updated" });
    }
})

exports.createTeam = catchAsyncError(async (req, res) => {
    const { fullName, place, position, about, image_alt, image_base64 } = req.body;
    const response = await Cloudinary(image_base64, image_alt);
    const data = await Teams.create({ fullName, place, position, about, image_url: response.url, image_alt });
    return res.status(200).json({ message: "Succesfully Created" });
})