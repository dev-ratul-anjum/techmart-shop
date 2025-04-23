const Product = require('../models/Product');

// Create new product
exports.createProduct = async (req, res) => {
    try {
        const products = req.body;
        // Check if the request contains a single product or an array of products
        const productsArray = Array.isArray(products) ? products : [products];
        
        // Validate all products before inserting
        for (const product of productsArray) {
            // If inStock is true but quantity is 0 or not set, set a default quantity
            if (product.inStock && (!product.quantity || product.quantity === 0)) {
                product.quantity = 10;
            }
            
            // If inStock is false, ensure quantity is 0
            if (product.inStock === false) {
                product.quantity = 0;
            }
            
            // Calculate discount properties if originalPrice exists
            if (product.originalPrice && product.originalPrice > product.price) {
                // These will be calculated by virtuals, but we add them for API consistency
                product.discount = product.originalPrice - product.price;
                product.discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            }
        }
        
        const newProducts = await Product.insertMany(productsArray);
        res.status(201).json(newProducts);
    } catch (error) {
        console.error('Error creating products:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all products (with pagination and filtering)
exports.getProducts = async (req, res) => {

    try {
        // Get all products first to check if database has data
        const allProducts = await Product.find({});
        
        // Get all query parameters with defaults
        const {
            page = 1,
            limit = 8,
            category,
            subcategory,
            brands,
            priceMin,
            priceMax,
            sortBy = 'newest',
            inStock,
            search
        } = req.query;


        // Build simple filter object
        const filter = {};

        // Category filter
        if (category && category !== 'All Products') {
            filter.category = { $regex: new RegExp(`^${category}$`, "i") };
        }

        // Subcategory filter
        if (subcategory && subcategory !== `All ${category}`) {
            filter.subcategory = subcategory;
        }

        // Brand filter
        if (brands) {
            filter.brand = Array.isArray(brands) ? { $in: brands } : brands;
        }

        // Price range filter
        if (priceMin !== undefined || priceMax !== undefined) {
            filter.price = {};
            if (priceMin) filter.price.$gte = Number(priceMin);
            if (priceMax) filter.price.$lte = Number(priceMax);
        }

        // In stock filter
        if (inStock === 'true') {
            filter.inStock = true;
        }

        // Search filter
        if (search && search.trim()) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { subcategory: { $regex: search, $options: 'i' } }
            ];
        }

        // Pagination parameters
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Sort configuration
        let sortConfig = {};
        switch (sortBy) {
            case 'price-low-high':
                sortConfig = { price: 1 };
                break;
            case 'price-high-low':
                sortConfig = { price: -1 };
                break;
            case 'name-a-z':
                sortConfig = { name: 1 };
                break;
            case 'name-z-a':
                sortConfig = { name: -1 };
                break;
            case 'rating':
                sortConfig = { rating: -1 };
                break;
            case 'newest':
            default:
                sortConfig = { createdAt: -1, _id: -1 };
                break;
        }

        // Execute query
        const pds = await Product.find({category: 	{ '$regex' : /^laptop$/i }, price: {$gte: 0, $lte: 2000}}).sort(sortConfig)
        .skip(skip)
        .limit(limitNum);

        const products = await Product.find(filter)
            .sort(sortConfig)
            .skip(skip)
            .limit(limitNum);


        // Get total count
        const total = await Product.countDocuments(filter); 

        // Return paginated results with metadata
        res.json({
            products,
            page: pageNum,
            limit: limitNum,
            total,
            totalPages: Math.ceil(total / limitNum)
        });
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).json({ errors: error.message });
    }
};
