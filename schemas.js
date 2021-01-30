// load Joi module
const Joi = require('joi');


const personDataSchema = Joi.object().keys({
    name: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
    email: Joi.string().email().lowercase().required(),
    github: Joi.string().regex(/^@(?=.*\w)[\w]{1,15}$/i).required(),
    mobile: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
    twitter: Joi.string().regex(/^@(?=.*\w)[\w]{1,15}$/i).lowercase()
})
  
let name = 'stephen adhokorie';
let email = 'stephadhok.co@gmail.com';
let github = '@lalagreen';
let mobile = '09035968685'

let data = { name, email,github, mobile };

const postDataSchema = Joi.object().keys({

    // accepts name only as letters and converts to uppercase
    name: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    // accepts name only as letters and converts to uppercase
    crew: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    // accepts ages greater than 6
    // value could be in one of these forms: 15, '15', '15y', '15yr', '15yrs'
    // all string ages will be replaced to strip off non-digits
    age: Joi.alternatives().try([
        Joi.number().integer().greater(6).required(),
        Joi.string().replace(/^([7-9]|[1-9]\d+)(y|yr|yrs)?$/i, '$1').required()
    ]),
    postion: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
    // would have a minimum value of 30
    missions:  Joi.number().integer().min(30).required(),
});

// export the schemas
module.exports = {
    '/': personDataSchema,
    '/validate-rule': postDataSchema
};
