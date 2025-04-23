const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        const mappedErrors = {};
        errors.array().forEach(err => {
            if (err.type === 'field') {
                mappedErrors[err.path] = err.msg.message || err.msg;
            }
        });

        return res.status(400).json({
            success: false,
            errors: mappedErrors
        });
    }
    next();
};

module.exports = validate;