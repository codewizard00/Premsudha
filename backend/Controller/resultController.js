const db = require("../Database");
const Result = db.Result;
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");



exports.createResult = catchAsyncError(async (req, res) => {
    const {competitionId} = req.params;
    
})