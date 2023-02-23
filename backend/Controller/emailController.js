const catchAsyncError = require("../Middleware/catchAsyncError");
const { EventPro } = require("../Utils/mailBody");
const db = require("../Database")
const Users = db.users;

exports.sendTest = catchAsyncError(async (req, res) => {
    console
    const { test_email, subject, content } = req.body;
    const data = EventPro(test_email, content, subject);
    return res.status(200).json({ message: "Succesfully Sented" });
})

exports.sendToAllUser = catchAsyncError(async (req, res) => {
    const {  subject, content } = req.body;
    const data = Users.FindAll();
    for (var i = 0; i < data.lenght; i++) {
        const data = EventPro(data[i].email, content, subject);
    }
    return res.status(200).json({ message: "Succesfully Sented" });
})