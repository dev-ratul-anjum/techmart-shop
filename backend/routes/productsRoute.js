const express = require('express');
const {getProducts, createProduct} = require('../controllers/productController');

const router = express.Router();

// Product routes
router.post('/', createProduct);
router.get('/', getProducts);

module.exports = router;