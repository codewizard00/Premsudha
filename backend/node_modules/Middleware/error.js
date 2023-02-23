const ErrorHandling = require('../Utils/ErrorHandling');

module.exports = async(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.send(err.statusCode).json({
        success:false,
        message:err.message,
    })
}