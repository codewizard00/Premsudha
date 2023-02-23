const db = require("../Database")
const Users = db.users;
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandling = require("../Utils/ErrorHandling");
const { v4: uuidv4 } = require('uuid');
const { v5: uuidv5 } = require('uuid');
const { verifyEmail, forgotPasswordMail } = require("../Utils/mailBody");

exports.userRegister = catchAsyncError(async (req, res, next) => {
    const { username, email, password, phone } = req.body;
    const user_exists = await Users.findOne({ where: { email } })
    if (user_exists && user_exists.email_verified) {
        return next(new ErrorHandling("User Already Exists.", 400))
    } else if (user_exists && user_exists.email_token) {
        const token = uuidv4();
        const data = await Users.update({email_token:token}, { where: { id: user_exists.id } })
        const data1 = await verifyEmail(user_exists.username,user_exists.email,token)
        res.status(200).json({ message: "Kindly Verify Your Mail." })
    } else {
        const token = uuidv4();
        const data = await Users.create({ username, email, gender: "MALE", password, user_type: "CUSTOMER", phone, email_token: token, email_verified: 0 });
        const new_data = await Users.findOne({ where: { email } })
        const data1 = await verifyEmail(username,email,token)
        res.status(200).json({ message: "Kindly Verify Your Mail" })
    }
})

exports.userLogin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user_exists = await Users.findOne({ where: { email: email } })
    if (user_exists) {
        if (user_exists.password != password) {
            return next(new ErrorHandling("Invalid Credentials", 400))
        } else {

            const token = jwt.sign(
                { id: user_exists.id, email, user_type: user_exists.user_type },
                process.env.JWT_SECRET,
                {
                    expiresIn: "12h",
                }
            );

            res.status(200).json({ message: token })
        }
    } else {
        res.status(400).json({ message: "Invalid Credentials" })
    }
})

exports.adminLogin = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user_exists = await Users.findOne({ where: { email: email,user_type:"ADMIN" } })
    if (user_exists) {
        if (user_exists.password != password) {
            return next(new ErrorHandling("Invalid Credentials", 400))
        } else {

            const token = jwt.sign(
                { id: user_exists.id, email, user_type: user_exists.user_type },
                process.env.JWT_SECRET,
                {
                    expiresIn: "12h",
                }
            );
            res.status(200).json({ message: token })
        }
    } else {
        res.status(400).json({ message: "Invalid Credentials" })
    }
})



exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const data = await Users.findAll();
    return res.status(200).json({ message: data })
})

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const { old_password, new_password } = req.body
    const data = await User.findOne({ where: { id: req.user.id } });
    if (data.password !== old_password) {
        return new ErrorHandling("Password Do Not Matched", 401)
    } else {
        const data = await Users.update({ password: new_password }, { where: { id: req.user.id } });
        return res.status(200).json({ message: "Sucessfully Updated" })
    }

})


exports.emailVerify = catchAsyncError(async (req, res, next) => {
    const { token } = req.query;
    const data = await Users.findOne({ where: { email_token: token } });
    if (!data) {
        return new ErrorHandling("User Not Found.", 401)
    } else {
        const data = await Users.update({ emailVerified: 1 }, { where: { id: data.id } });
        return res.status(200).json({ message: "Sucessfully Verified." })
    }
})

exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const {email} = req.body;
    const token = uuidv5();
    const data1 = await Users.update({email_token:token}, { where: { email } })
    const data = await forgotPasswordMail(email,token);
    return res.status(200).json({ message: "Sucessfully Email Sent." })
})

exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const {password,email_token} = req.body;
    const data = await Users.findOne({email_token});
    const data1 = await Users.update({password}, { where: {id: data.id } })
    return res.status(200).json({ message: "Sucessfully Updated." })
})




