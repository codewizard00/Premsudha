const { Op } = require("sequelize");
const db = require("../Database")
const WriterContent = db.writerContent;
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandling = require("../Utils/ErrorHandling");

exports.getAllWriterContent = catchAsyncError(async (req, res) => {
    const { writer_id } = req.params;

    const data = await WriterContent.findAll({where:{writer_id}});
    res.status(200).json({ message: data });
})



exports.deleteWriterContent = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { writer_id } = req.params;
    const data = await WriterContent.findOne({ where: { id, writer_id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data = WriterContent.destroy({ where: { id } });
        return res.status(200).json({ message: "Succesfully Deleted" });
    }
})

exports.updateWriterContent = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { writer_id } = req.params;
    const { content, type } = req.body;
    const data = await WriterContent.findOne({ where: { id, writer_id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data1 = await WriterContent.update({ content, type }, { where: { id } })
        return res.status(200).json({ message: "Succesfully Updated" });
    }
})

exports.cerateWriterContent = catchAsyncError(async (req, res) => {
    const { writer_id } = req.params;
    const { type, content, title } = req.body;
    const data = await WriterContent.create({ writer_id, type, content, title });
    return res.status(200).json({ message: "Succesfully Created" });
})


exports.getWriterType = catchAsyncError(async (req, res) => {
    const { writer_id, type } = req.params;
    const data = await WriterContent.findAll({
        where: {
            [Op.and]: [
                { writer_id },
                { type }
            ]
        }
    });
    console.log(writer_id,type);
    return res.status(200).json({ message: data });
})