import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaExchangeAlt, FaEye, FaChevronUp, FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import { useShop } from '../../contexts/ShopContext';
import { useCart } from '../../contexts/CartContext';
import QuestionModal from './QuestionModal';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const navigate = useNavigate();

    // Get functions from context
    const { 
        addToWishlist, 
        removeFromWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare,
        formatPrice
    } = useShop();

    // Get cart functions from CartContext
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    const handleToggleCompare = (e) => {
        e.preventDefault();
        if (isInCompare(product.id)) {
            removeFromCompare(product.id);
        } else {
            addToCompare(product.id);
        }
    };

    const getDiscountPercentage = () => {
        if (product.originalPrice && product.price < product.originalPrice) {
            return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        }
        return null;
    };

    const discountPercentage = getDiscountPercentage();
    const wishlistActive = isInWishlist(product.id);
    const compareActive = isInCompare(product.id);

    // Handle quantity changes
    const increaseQuantity = () => {
        setQuantity(q => q + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(q => q - 1);
        }
    };

    // Generate rating stars
    const renderStars = () => {
        return Array(5).fill(0).map((_, index) => (
            <span key={index} className={index < product.rating ? "star filled" : "star"}>★</span>
        ));
    };

    return (
            <>
                            <div className="product-card">
            {/* Product Image with Badges */}
            <div className="product-image">
                <Link to={`/product/${product.id}`}>
                    <img src={`/images/products/${product.image}`} alt={product.name} />
                </Link>
                
                {/* Badges */}
                <div className="product-labels">
                    {discountPercentage && (
                        <span className="product-label sale">-{discountPercentage}%</span>
                    )}
                    {product.isNewProduct && (
                        <span className="product-label new">NEW</span>
                    )}
                </div>
            </div>
            
            {/* Product Details */}
            <div className="product-details">
                {/* Brand and Model */}
                <div className="product-info-header">
                    <div className="product-brand">
                        <Link to={`/brand/${product.brand}`}>{product.brand}</Link>
                    </div>
                    <div className="product-model">{product.model}</div>
                </div>
                
                {/* Product Name */}
                <h3 className="product-name">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                
                {/* Rating */}
                <div className="rating">
                    {renderStars()}
                </div>
                
                {/* Price Section */}
                <div className="price-section">
                    <div className="price-container">
                        <span className="product-price">{formatPrice(product.price)}BDT</span>
                        {product.originalPrice && product.price < product.originalPrice && (
                            <span className="product-old-price">{formatPrice(product.originalPrice)}BDT</span>
                        )}
                    </div>
                </div>
                
                {/* Quantity and Actions */}
                <div className="card-bottom">
                    {/* Quantity Controls */}
                    <div className="quantity-section">
                        <div className="quantity-controls">
                            <input 
                                type="text" 
                                value={quantity} 
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val) && val > 0) setQuantity(val);
                                }}
                            />
                            <div className="quantity-buttons">
                                <button onClick={increaseQuantity} className="quantity-up">
                                    <FaChevronUp />
                                </button>
                                <button onClick={decreaseQuantity} className="quantity-down">
                                    <FaChevronDown />
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            ADD TO CART
                        </button>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="action-buttons">
                        <button 
                            className={`wishlist-btn ${wishlistActive ? 'active' : ''}`}
                            onClick={handleToggleWishlist}
                            title={wishlistActive ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <FaHeart />
                        </button>
                        
                        <button 
                            className={`compare-btn ${compareActive ? 'active' : ''}`}
                            onClick={handleToggleCompare}
                            title={compareActive ? "Remove from Compare" : "Add to Compare"}
                        >
                            <FaExchangeAlt />
                        </button>
                    </div>
                </div>
                
                {/* Buy Now and Question */}
                <div className="bottom-links">
                    <button onClick={handleBuyNow} className="buy-now-link">Buy Now</button>
                    <button onClick={() => setShowQuestionModal(true)} className="question-link">
                        <FaQuestionCircle /> Question
                    </button>
                </div>
                
                {/* Out of Stock Label */}
                {!product.inStock && (
                    <div className="out-of-stock">Out of Stock</div>
                )}
            </div>
            
         
        </div>    
           {/* Question Modal */}
           <QuestionModal 
                isOpen={showQuestionModal} 
                onClose={() => setShowQuestionModal(false)} 
                productName={product.name}
            />        
            </>
    );
};

export default ProductCard; 