const express = require('express');
const router = express.Router();
const SchemaValidator = require('./middlewares/SchemaValidator');

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true);

// generic route handler
const genericHandler = (req, res, next) => {
    res.json({
        message: 'User created Successfully',
        status: 'success',
        data: req.body
    });
};

// First route is the base route. HTTP GET "/"
router.get('/', validateRequest, genericHandler);

// Second route is the rule validation route. HTTP POST "/validate-rule"
router.post('/validate-rule', validateRequest, genericHandler);

module.exports = router;
