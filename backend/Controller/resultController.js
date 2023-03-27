const db = require("../Database")
const Result = db.results;
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");
const ErrorHandling = require("../Utils/ErrorHandling");

exports.getAllResult = catchAsyncError(async (req, res) => {
    const { competition_id } = req.params;
    const data = await Result.findAll({ where: { competition_id } });
    res.status(200).json({ message: data });
})

exports.deleteResult = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await WriterContent.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data = Result.destroy({ where: { id } });
        return res.status(200).json({ message: "Succesfully Deleted" });
    }
})

exports.updateResult = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { position,certificate,writer_name } = req.body;
    const data = await Result.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data1 = await Result.update({ content, type }, { where: { id } })
        return res.status(200).json({ message: "Succesfully Updated" });
    }
})

exports.createResult = catchAsyncError(async (req, res) => {
    const { competition_id } = req.params;
    const { writer, position, pdf_base64 } = req.body;
    let certificate = await Cloudinary(pdf_base64);
    const data = await Result.create({writer,position,certificate:certificate.url,competition_id})
    return res.status(200).json({ message: "Succesfully Created" });
})


