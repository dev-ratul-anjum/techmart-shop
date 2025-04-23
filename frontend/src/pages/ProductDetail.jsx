import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { FaHome, FaChevronRight, FaHeart, FaExchangeAlt, FaShoppingCart, FaStar, FaRegStar, FaStarHalfAlt, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaTimes, FaChevronLeft, FaChevronRight as FaChevronRightIcon } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import './ProductDetail.css';

const ProductDetail = () => {
  window.scrollTo(0, 0); // Scroll to top on page load

  const { productId } = useParams();
  const navigate = useNavigate();
  const { getMockProducts, addToCart, addToWishlist, addToCompare, formatPrice } = useShop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [activeTab, setActiveTab] = useState('specifications');
  const [timeRemaining, setTimeRemaining] = useState({ days: 2, hours: 3, minutes: 45, seconds: 30 });
  
  // Image modal states
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  // Get product data
  useEffect(() => {
    const products = getMockProducts();
    const foundProduct = products.find(p => p.id.toString() === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Prepare all product images for the modal
      const allImages = [foundProduct.image];
      if (foundProduct.additionalImages && foundProduct.additionalImages.length > 0) {
        allImages.push(...foundProduct.additionalImages);
      }
      setImages(allImages);
      
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      if (foundProduct.storage && foundProduct.storage.length > 0) {
        setSelectedStorage(foundProduct.storage[0]);
      }
    }
    
    setLoading(false);
  }, [productId, getMockProducts]);

  // Body scroll lock for modal
  useEffect(() => {
    if (showImageModal) {
      document.body.classList.add('pd-modal-open');
    } else {
      document.body.classList.remove('pd-modal-open');
    }
    
    return () => {
      document.body.classList.remove('pd-modal-open');
    };
  }, [showImageModal]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

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
    if (product) {
      addToCart(product, quantity, selectedColor, selectedStorage);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };
  
  // Image modal functions
  const openImageModal = (index) => {
    setActiveImageIndex(index);
    setShowImageModal(true);
  };
  
  const closeImageModal = () => {
    setShowImageModal(false);
  };
  
  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  // Handle keyboard controls for image modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showImageModal) return;
      
      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showImageModal]);

  if (loading) {
    return <div className="pd-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="pd-not-found">Product not found</div>;
  }

  return (
    <div className="pd-container">
      <div className="pd-breadcrumb">
        <div className="container">
          <Link to="/"><FaHome /> Home</Link>
          <span className="pd-separator"><FaChevronRight /></span>
          <Link to="/products">Products</Link>
          <span className="pd-separator"><FaChevronRight /></span>
          <span className="pd-current">{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="pd-main-content">
          <div className="pd-share-save">
            <div className="pd-share">
              <span>Share: </span>
              <a href="#" className="pd-share-icon"><FiShare2 /></a>
            </div>
            <div className="pd-actions">
              <button onClick={() => addToWishlist(product.id)} className="pd-action-btn">
                <FaHeart /> Save
              </button>
              <button onClick={() => addToCompare(product.id)} className="pd-action-btn">
                <FaExchangeAlt /> Add to Compare
              </button>
            </div>
          </div>

          <div className="pd-product-main">
            <div className="pd-image-container">
              <div className="pd-main-image" onClick={() => openImageModal(0)}>
                <img src={`/images/products/${product.image}	`} alt={product.name} />
                {product.isNew && <span className="pd-badge pd-badge-new">NEW</span>}
                <div className="pd-image-zoom-hint">Click to zoom</div>
              </div>
              <div className="pd-thumbnail-images">
                <img 
                  src={`/images/products/${product.image}`} 
                  alt={product.name} 
                  className="pd-thumbnail pd-thumbnail-active"
                  onClick={() => openImageModal(0)} 
                />
                {product.additionalImages && product.additionalImages.map((img, index) => (
                  <img 
                    key={index} 
                    src={`/images/products/${product.image}`} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="pd-thumbnail"
                    onClick={() => openImageModal(index + 1)} 
                  />
                ))}
              </div>
            </div>

            <div className="pd-product-info">
              <h1 className="pd-product-title">{product.name}</h1>
              
              <div className="pd-product-meta">
                <div className="pd-price-info">
                  <span className="pd-current-price">{formatPrice(product.price)}৳</span>
                  {product.oldPrice > 0 && (
                    <span className="pd-old-price">{formatPrice(product.oldPrice)}৳</span>
                  )}
                </div>
                
                <div className="pd-status-info">
                  <p className="pd-status">Status: <span className={product.inStock ? 'pd-in-stock' : 'pd-out-of-stock'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span></p>
                  <p className="pd-product-code">Product Code: {product.model || product.id}</p>
                </div>
                
                <p className="pd-brand">Brand: <Link to={`/products?brand=${product.brand}`}>{product.brand}</Link></p>
              </div>

              <div className="pd-key-features">
                <h3>Key Features</h3>
                <ul className="pd-features-list">
                  {product.features && product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {product.discount > 0 && (
                <div className="pd-discount-timer">
                  <h4>Discount Offer Ends in</h4>
                  <div className="pd-countdown">
                    <div className="pd-countdown-item">
                      <div className="pd-time-value">{timeRemaining.days}</div>
                      <div className="pd-time-label">Days</div>
                    </div>
                    <div className="pd-countdown-item">
                      <div className="pd-time-value">{timeRemaining.hours}</div>
                      <div className="pd-time-label">Hours</div>
                    </div>
                    <div className="pd-countdown-item">
                      <div className="pd-time-value">{timeRemaining.minutes}</div>
                      <div className="pd-time-label">Minutes</div>
                    </div>
                    <div className="pd-countdown-item">
                      <div className="pd-time-value">{timeRemaining.seconds}</div>
                      <div className="pd-time-label">Seconds</div>
                    </div>
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="pd-options-section">
                  <h4 className="pd-option-title">Color:</h4>
                  <div className="pd-color-options">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        className={`pd-color-option ${selectedColor === color ? 'pd-option-active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.storage && product.storage.length > 0 && (
                <div className="pd-options-section">
                  <h4 className="pd-option-title">RAM / Storage:</h4>
                  <div className="pd-storage-options">
                    {product.storage.map(storage => (
                      <button
                        key={storage}
                        className={`pd-storage-option ${selectedStorage === storage ? 'pd-option-active' : ''}`}
                        onClick={() => setSelectedStorage(storage)}
                      >
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pd-payment-options">
                <h4 className="pd-payment-title">Payment Options</h4>
                <div className="pd-payment-methods">
                  <div className="pd-payment-method pd-payment-method-active">
                    <input 
                      type="radio" 
                      id="cash-payment" 
                      name="payment-method" 
                      checked 
                      readOnly
                    />
                    <div className="pd-payment-details">
                      <div className="pd-payment-price">{formatPrice(product.price)}৳</div>
                      <div className="pd-payment-description">Cash Discount Price</div>
                      <div className="pd-payment-note">Online / Cash Payment</div>
                    </div>
                  </div>
                  
                  <div className="pd-payment-method">
                    <input 
                      type="radio" 
                      id="emi-payment" 
                      name="payment-method" 
                      disabled
                    />
                    <div className="pd-payment-details">
                      <div className="pd-payment-price">{formatPrice(Math.round(product.price * 1.1 / 12))}৳/month</div>
                      <div className="pd-payment-description">Regular Price: {formatPrice(Math.round(product.price * 1.1))}৳</div>
                      <div className="pd-payment-note">0% EMI for up to 12 Months</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pd-purchase-actions">
                <div className="pd-quantity">
                  <button className="pd-quantity-btn pd-quantity-minus" onClick={handleDecrement}>-</button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="pd-quantity-input"
                    min="1"
                    max="99"
                  />
                  <button className="pd-quantity-btn pd-quantity-plus" onClick={handleIncrement}>+</button>
                </div>
                
                <button 
                  className="pd-add-to-cart" 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <FaShoppingCart /> ADD TO CART
                </button>
                
                <button 
                  className="pd-buy-now" 
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          </div>

          <div className="pd-details-tabs">
            <div className="pd-tabs-header">
              <button 
                className={`pd-tab ${activeTab === 'specifications' ? 'pd-tab-active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`pd-tab ${activeTab === 'description' ? 'pd-tab-active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`pd-tab ${activeTab === 'questions' ? 'pd-tab-active' : ''}`}
                onClick={() => setActiveTab('questions')}
              >
                Questions (0)
              </button>
              <button 
                className={`pd-tab ${activeTab === 'reviews' ? 'pd-tab-active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (1)
              </button>
            </div>
            
            <div className="pd-tab-content">
              {activeTab === 'specifications' && (
                <div className="pd-specification">
                  <div className="pd-spec-section">
                    <h3 className="pd-spec-title">Display</h3>
                    <div className="pd-spec-items">
                      <div className="pd-spec-item">
                        <div className="pd-spec-name">Size</div>
                        <div className="pd-spec-value">{product.displaySize || '6.1-inch (diagonal)'}</div>
                      </div>
                      <div className="pd-spec-item">
                        <div className="pd-spec-name">Type</div>
                        <div className="pd-spec-value">{product.displayType || 'Super Retina XDR display'}</div>
                      </div>
                      <div className="pd-spec-item">
                        <div className="pd-spec-name">Resolution</div>
                        <div className="pd-spec-value">{product.displayResolution || '2556x1179-pixel resolution at 460 ppi'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pd-spec-section">
                    <h3 className="pd-spec-title">Processor</h3>
                    <div className="pd-spec-items">
                      <div className="pd-spec-item">
                        <div className="pd-spec-name">Chipset</div>
                        <div className="pd-spec-value">{product.processor || 'A18 chip'}</div>
                      </div>
                      <div className="pd-spec-item">
                        <div className="pd-spec-name">CPU Type</div>
                        <div className="pd-spec-value">{product.cpu || '6-core CPU with 2 performance and 4 efficiency cores'}</div>
                      </div>
                      <div className="pd-spec-item">
                        <div className="pd-spec-name">GPU</div>
                        <div className="pd-spec-value">{product.gpu || '5-core GPU'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'description' && (
                <div className="pd-description">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                </div>
              )}
              
              {activeTab === 'questions' && (
                <div className="pd-questions">
                  <div className="pd-no-questions">
                    <div className="pd-question-icon">?</div>
                    <p>There are no questions asked yet. Be the first one to ask a question.</p>
                    <button className="pd-ask-question">Ask Question</button>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="pd-reviews">
                  <div className="pd-review-summary">
                    <div className="pd-stars">★★★★★</div>
                    <p className="pd-rating-text">5 out of 5</p>
                  </div>
                  <div className="pd-review-item">
                    <div className="pd-stars">★★★★★</div>
                    <p className="pd-review-text">
                      I recently used this product. The quality is impressive, especially in low light, 
                      and the new features make it worth it.
                    </p>
                    <p className="pd-review-author">By Customer on 04 Feb 2023</p>
                  </div>
                  <button className="pd-write-review">Write a Review</button>
                </div>
              )}
            </div>
          </div>
          
          <div className="pd-related-products">
            <h3 className="pd-related-title">Related Product</h3>
            <div className="pd-related-list">
              {getMockProducts()
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 3)
                .map(relatedProduct => (
                  <div key={relatedProduct.id} className="pd-related-item">
                    <Link to={`/product/${relatedProduct.id}`} className="pd-related-image">
                      <img src={relatedProduct.image} alt={relatedProduct.name} />
                      {relatedProduct.isNew && <span className="pd-badge pd-badge-sm">NEW</span>}
                    </Link>
                    <div className="pd-related-info">
                      <Link to={`/product/${relatedProduct.id}`} className="pd-related-name">
                        {relatedProduct.name}
                      </Link>
                      <div className="pd-related-price">
                        <span className="pd-related-current-price">{formatPrice(relatedProduct.price)}৳</span>
                        {relatedProduct.oldPrice > 0 && (
                          <span className="pd-related-old-price">{formatPrice(relatedProduct.oldPrice)}৳</span>
                        )}
                      </div>
                      <button className="pd-related-compare" onClick={() => addToCompare(relatedProduct.id)}>
                        Add to Compare
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      {showImageModal && (
        <div className="pd-image-modal" onClick={closeImageModal}>
          <div className="pd-image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="pd-image-modal-close" onClick={closeImageModal}>
              <FaTimes />
            </button>
            
            <div className="pd-image-modal-main">
              <button className="pd-image-modal-nav pd-image-modal-prev" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <div className="pd-image-modal-img-container">
                <img 
                  src={images[activeImageIndex]} 
                  alt={`${product.name} - full view ${activeImageIndex + 1}`} 
                  className="pd-image-modal-img" 
                />
              </div>
              <button className="pd-image-modal-nav pd-image-modal-next" onClick={nextImage}>
                <FaChevronRightIcon />
              </button>
            </div>
            
            <div className="pd-image-modal-thumbnails">
              {images.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`pd-image-modal-thumbnail ${index === activeImageIndex ? 'pd-image-modal-thumbnail-active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
            
            <div className="pd-image-modal-caption">
              {product.name} - Image {activeImageIndex + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail; 