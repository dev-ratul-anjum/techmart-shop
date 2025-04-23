const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    telephone: {
        type: String,
        required: [true, 'Telephone number is required'],
        match: [/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please provide a valid telephone number']
    },
    agreedToPrivacy: {
        type: Boolean,
        required: [true, 'You must agree to the privacy policy'],
        default: false
    },
    newsletter: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Virtual for full name
UserSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);