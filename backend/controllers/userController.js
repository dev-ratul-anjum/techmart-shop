const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, telephone, agreedToPrivacy, newsletter } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            telephone,
            agreedToPrivacy,
            newsletter: newsletter 
        });
        
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token : 'Bearer ' + token });	
    } catch (error) {
        res.status(500).json({ 
            errors : {
                common : error.message,
            }
        });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ errors : {email : 'User was not found with this email!'} });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ errors : { password : 'Invalid credentials'} });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token : 'Bearer ' + token });
    } catch (error) {
        res.status(500).json({ errors: { common: error.message } });
    }
};

// Get current user info
exports.getCurrentUser = (req, res) => {
    res.json({ user: req.user });
};