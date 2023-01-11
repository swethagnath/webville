const { validate, ValidationError, Joi } = require('express-validation');

const emailSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required()
});

module.exports = {
    emailSchema,
};

