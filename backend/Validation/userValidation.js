const Joi = require('joi')

exports.loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required()
});

exports.registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    username: Joi.string().min(1).required(),
    password: Joi.string().min(4).required(),
    phone: Joi.string().min(1).required()
});

exports.resetPassword = Joi.object({
    old_password: Joi.string().min(4).required(),
    new_password: Joi.string().min(4).required(),
})


