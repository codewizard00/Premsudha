const Joi = require('joi')


exports.createTeam = Joi.object({
    fullName: Joi.string().required(),
    place: Joi.string().min(1).required(),
    about: Joi.string().min(1).required(),
    position: Joi.string().min(4).required(),
    image_url: Joi.string().min(1).required(),
    image_alt: Joi.string().min(1).required(),
    image_url: Joi.string().min(1).required(),

});

exports.updateTeam = Joi.object({
    id: Joi.string().required(),
    fullName: Joi.string().required(),
    place: Joi.string().min(1).required(),
    about: Joi.string().min(1).required(),
    position: Joi.string().min(4).required(),
    image_url: Joi.string().min(1).required(),
    image_alt: Joi.string().min(1).required(),
    image_url: Joi.string().min(1).required(),
})


