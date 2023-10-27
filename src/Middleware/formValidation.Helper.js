
const Joi = require('joi');

const email = Joi.string().email({
    minDomainSegments: 2,
    tlds: {allow: ['com', 'net']}
});

const pin = Joi.number().min(100000).max(999999).required();

const newPassword = Joi.string().alphanum().min(3).max(10).required();


const resetPasswordReqValidation = (req, res, next) => {
    const schema = Joi.object({email});

    const value = schema.validate(req.body);

    if(value.error){
        return res.status(400).json({
            status: 'error',
            error: value.error,
        })
    }

    next();
}

const updatePasswordReqValidation = (req, res, next) => {
    const schema = Joi.object({email, pin, newPassword});
    const value = schema.validate(req.body);

    if(value.error){
        return res.status(400).json({
            status: 'error',
            error: value.error,
        })
    }

    next();
}

module.exports = {
    resetPasswordReqValidation,
    updatePasswordReqValidation, 
}