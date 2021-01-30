// load app dependencies
const express = require('express');
const logger = require('morgan');

const Routes = require('./routes');

const app = express();
const port = process.env.NODE_ENV || 3000;

// app configurations
app.set('port', port);

// load app middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// load our API routes
app.use('/', Routes);

app.post('/test', (req, res, next) => {

    // require the Joi module
    const Joi = require('joi');

    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({

        // accepts name only as letters and converts to uppercase
        name: Joi.string().regex(/^[A-Z]+$/).uppercase().required(),
        // email is required
        // email must be a valid email string
        email: Joi.string().email().required(),

        // phone is required
        // and must be a string of the format XXX-XXX-XXXX
        // where X is a digit (0-9)
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),

        // accepts ages greater than 6
        // value could be in one of these forms: 15, '15', '15y', '15yr', '15yrs'
        // all string ages will be replaced to strip off non-digits
       age: Joi.alternatives().try([
        Joi.number().integer().greater(6).required(),
        Joi.string().replace(/^([7-9]|[1-9]\d+)(y|yr|yrs)?$/i, '$1').required()
        ])

    });

    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {

        // create a random number as id
        const id = Math.ceil(Math.random() * 9999999);
        
        if (err) {
            // send a 400 error response if validation fails
            res.status(400).json({
                message: 'Invalid request data',
                status: 'error',
                data: data
            });
        } else {
            // send a success response if validation passes
            // attach the random ID to the data response
            res.json({
                message: 'User created successfully',
                status: 'success',
                data: Object.assign({id}, value)
            });
        }

    });

});

// establish http server connection
app.listen(port, () => { console.log(`App running on port ${port}`) });
