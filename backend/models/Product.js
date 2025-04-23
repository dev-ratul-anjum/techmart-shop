const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'], 
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long'],
        maxlength: [100, 'Product name must be at most 100 characters long'],
        index: true
    },
    description: { 
        type: String, 
        required: [true, 'Product description is required'], 
        minlength: [10, 'Product description must be at least 10 characters long']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        index: true
    },
    model: {
        type: String,
        required: [true, 'Model is required']
    },
    price: { 
        type: Number, 
        required: [true, 'Product price is required'], 
        min: [0, 'Product price must be a positive number'],
        index: true
    },
    originalPrice: {
        type: Number,
        default: null,
        validate: {
            validator: function(value) {
                // originalPrice should be null or greater than price
                return value === null || value >= this.price;
            },
            message: 'Original price must be greater than or equal to current price'
        }
    },
    image: { 
        type: String, 
        required: [true, 'Product image is required']
    },
    images: {
        type: [String],
        default: []
    },
    rating: { 
        type: Number, 
        default: 0, 
        min: [0, 'Rating cannot be less than 0'], 
        max: [5, 'Rating cannot be more than 5'],
        index: true
    },
    reviews: {
        type: Number,
        default: 0,
        min: [0, 'Number of reviews cannot be negative']
    },
    isNewProduct: {
        type: Boolean,
        default: false,
        index: true
    },
    inStock: {
        type: Boolean,
        default: true,
        index: true
    },
    category: { 
        type: String, 
        required: [true, 'Product category is required'],
        index: true,
        enum: {
            values: ['Smartphone', 'Laptop', 'TV', 'Audio', 'Accessories', 'Gaming', 'Wearable'],
            message: '{VALUE} is not a valid category'
        }
    },
    subcategory: {
        type: String,
        required: [true, 'Product subcategory is required'],
        index: true
    },
    quantity: {
        type: Number,
        default: function() {
            return this.inStock ? 10 : 0; // Default quantity based on stock status
        },
        min: [0, 'Quantity cannot be negative'],
        validate: {
            validator: function(value) {
                // If not in stock, quantity must be 0
                return this.inStock || value === 0;
            },
            message: 'Products not in stock must have quantity 0'
        }
    },
    specifications: {
        type: Map,
        of: String,
        default: {}
    },
    features: {
        type: [String],
        default: []
    },
    // Legacy field - will be used for data migration but not required
    id: {
        type: Number,
        index: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

ProductSchema.virtual('discountPercentage').get(function() {
    if (this.originalPrice && this.originalPrice > this.price) {
        return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
    }
    return 0;
});

ProductSchema.virtual('discount').get(function() {
    if (this.originalPrice && this.originalPrice > this.price) {
        return this.originalPrice - this.price;
    }
    return 0;
});

// Before saving, ensure consistency in category names and add image to images array
ProductSchema.pre('save', function(next) {
    // Normalize category name
    if (this.category) {
        // Handle cases like 'Smartphones' -> 'Smartphone'
        if (this.category.endsWith('s') && this.category !== 'Accessories') {
            this.category = this.category.slice(0, -1);
        }
        // Capitalize first letter
        this.category = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }
    
    // Add main image to images array if not already present
    if (this.image && (!this.images || !this.images.includes(this.image))) {
        this.images = [this.image, ...(this.images || [])];
    }
    
    // Ensure consistency between inStock and quantity
    if (!this.inStock && this.quantity > 0) {
        this.quantity = 0;
    } else if (this.inStock && this.quantity === 0) {
        this.quantity = 10; // Default quantity for in-stock items
    }
    
    next();
});

// Create text index for search functionality
ProductSchema.index({
    name: 'text',
    description: 'text',
    brand: 'text',
    category: 'text',
    subcategory: 'text'
});

module.exports = mongoose.model('Product', ProductSchema); 