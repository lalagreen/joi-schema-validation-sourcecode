// load app dependencies
const express = require('express');
const logger = require('morgan');

const Routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// app configurations
app.set('port', port);

// load app middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// load our API routes
app.use('/', Routes);


app.get('/test', (req, res, next) => {

    // require the Joi module
    const Joi = require('joi');

    // fetch the request sample data

    const name = 'stephen adhokorie';
    const github = '@lalagreen';
    const email = 'stephadhok.co@gmail.com';
    const mobile = '09035968685'

    const data = { name, github, email, mobile };
    

    // define the validation schema
    const schema = Joi.object().keys({
        // accepts name only as letters and converts to uppercase
        name: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
        // accepts only letters that begins with @
        github: Joi.string().regex(/^@(?=.*\w)[\w]{1,15}$/i).required(),
         // email is required
        // email must be a valid email string
        email: Joi.string().email().lowercase().required(),
        // phone is required
        // and must be a string of the format XXX-XXX-XXXX
        // where X is a digit (0-9)
        mobile: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
        // accepts only letters that begins with @
        twitter: Joi.string().regex(/^@(?=.*\w)[\w]{1,15}$/i).lowercase()
    });

    // validate the request data against the schema
    Joi.validate(data, schema, (err, value) => {

        
        if (err) {
            // send a 400 error response if validation fails
            res.status(400).json({
                message: 'Invalid request data',
                status: 'error',
                data: null
            });
        } else {
            // send a success response if validation passes
            // attach the random ID to the data response
            res.json({
                message: 'User Validated successfully',
                status: 'success',
                data: Object.assign(value)
            });
        }

    });

});


// establish http server connection
app.listen(port, () => { console.log(`App running on port ${port}`) });
