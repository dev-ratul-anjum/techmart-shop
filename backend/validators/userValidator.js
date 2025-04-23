const { check } = require('express-validator');
const User = require('../models/User');

const registerValidation = [
    check('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
    
    check('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
    
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('Email is already registered');
            }
            return true;
        }),
    
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
    
    check('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
    
    check('telephone')
        .notEmpty().withMessage('Telephone number is required')
        .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
        .withMessage('Please provide a valid telephone number')
        .custom(async (telephone) => {
            const user = await User.findOne({ telephone });
            if (user) {
                throw new Error('Telephone number is already registered');
            }
            return true;
        }),
    
    check('agreedToPrivacy')
        .isBoolean()
        .custom((value) => {
            if (!value) {
                throw new Error('You must agree to the privacy policy');
            }
            return true;
        }),
    
    check('newsletter')
        .optional()
        .isBoolean()
];

const loginValidation = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email'),
    
    check('password')
        .notEmpty().withMessage('Password is required')
];

module.exports = {
    registerValidation,
    loginValidation
};