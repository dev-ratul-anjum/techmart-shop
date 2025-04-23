const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../validators/userValidator');
const validate = require('../validators/validationMiddleware');

const router = express.Router();

// Auth routes
router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);
// router.get('/me', passport.authenticate('jwt', { session: false }), getCurrentUser);

router.get('/me', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {

        if (err || !user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    })(req, res, next);
}, getCurrentUser);

module.exports = router;