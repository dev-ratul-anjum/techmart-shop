import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaExchangeAlt, FaEye, FaStar, FaStarHalfAlt, FaRegStar, FaQuestionCircle } from 'react-icons/fa';
import { useShop } from '../../contexts/ShopContext';
import QuestionModal from '../common/QuestionModal';
import './ProductListView.css';

const ProductListView = ({ product }) => {
  const { addToCart, addToWishlist, addToCompare, formatPrice } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  
  // Shorten description to a maximum of 200 characters
  const shortDescription = product.description.length > 200 
    ? product.description.substring(0, 200) + '...' 
    : product.description;

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }
    
    return stars;
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="product-list-item">
      <div className="product-image">
        {product.isNew && (
          <div className="product-labels">
            <span className="product-label new">NEW</span>
            {product.discount > 0 && (
              <span className="product-label sale">-{product.discount}%</span>
            )}
          </div>
        )}
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      
      <div className="product-details">
        <div className="product-meta">
          <div className="product-brand">Brand: {product.brand}</div>
          <div className="product-card-model">Model: {product.model || product.id}</div>
        </div>
        
        <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
        
        <div className="product-list-info">
          <span>
            <strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
          <span>
            <strong>Category:</strong> {product.category}
          </span>
        </div>
        
        <div className="product-description">{shortDescription}</div>
        
        <div className="rating">
          {renderRatingStars(product.rating)}
          <span className="rating-count">({product.reviewCount || 0})</span>
        </div>
        
        <div className="price-section">
          <div className="price-tag">
            {product.oldPrice > 0 && (
              <span className="product-old-price">{formatPrice(product.oldPrice)}৳</span>
            )}
            <span className="product-price">{formatPrice(product.price)}BDT</span>
            <span className="ex-tax">Ex Tax:{formatPrice(product.price)}BDT</span>
          </div>
        </div>
                  
        <div className="plv-product-actions">
          <div className="quantity-wrapper">
            <div className="quantity-control">
              <button className="quantity-btn" onClick={handleDecrement}>-</button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange}
              />
              <button className="quantity-btn" onClick={handleIncrement}>+</button>
            </div>
          </div>
            
          <button 
            className="plv-add-to-cart"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <FaShoppingCart /> ADD TO CART
          </button>
          
          <div className="plv-action-buttons-group">
            <button 
              className="plv-action-button"
              onClick={() => addToWishlist(product.id)}
              title="Add to Wishlist"
            >
              <FaHeart />
            </button>
            
            <button 
              className="plv-action-button"
              onClick={() => addToCompare(product.id)}
              title="Add to Compare"
            >
              <FaExchangeAlt />
            </button>
            
            <Link 
              to={`/product/${product.id}`} 
              className="plv-action-button"
              title="Quick View"
            >
              <FaEye />
            </Link>
          </div>
        </div>
        
        <div className="buy-now-question">
          <Link to={`/checkout?product=${product.id}`}>Buy Now</Link>
          <Link  onClick={() => setShowQuestionModal(true)}><FaQuestionCircle /> Question</Link>
        </div>
      </div>
      
       {/* Question Modal */}
       <QuestionModal 
          isOpen={showQuestionModal} 
          onClose={() => setShowQuestionModal(false)} 
          productName={product.name}
        />        
    </div>
  );
};

export default ProductListView; 