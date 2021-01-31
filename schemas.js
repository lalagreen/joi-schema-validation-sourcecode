// load Joi module
const Joi = require('joi');


const getDataSchema = Joi.object().keys({
    name: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
    github: Joi.string().regex(/^@(?=.*\w)[\w]{1,15}$/i).required(),
    email: Joi.string().email().lowercase().required(),
    mobile: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    twitter: Joi.string().regex(/^@(?=.*\w)[\w]{1,15}$/i).lowercase()
});
  


const postDataSchema = Joi.object().keys({

    // accepts name only as letters and converts to uppercase
    name: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    // accepts name only as letters and converts to uppercase
    crew: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    // accepts ages greater than 6
    // value could be in one of these forms: 25, '25', '25y', '25yr', '25yrs'
    // all string ages will be replaced to strip off non-digits
    age: Joi.alternatives().try([
        Joi.number().integer().greater(18).required(),
        Joi.string().replace(/^([7-9]|[1-9]\d+)(y|yr|yrs)?$/i, '$1').required()
    ]),
    postion: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    // would have a minimum value of 30
    missions:  Joi.number().integer().min(30).required(),
});

// export the schemas
module.exports = {
    '/': getDataSchema,
    '/validate-rule': postDataSchema
};
