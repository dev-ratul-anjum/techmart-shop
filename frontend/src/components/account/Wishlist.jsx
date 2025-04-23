import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { useShop } from '../../contexts/ShopContext';
import './Wishlist.css';

const Wishlist = () => {
  // Get data and functions from context
  const { 
    wishlistItems, 
    removeFromWishlist, 
    addToCart, 
    formatPrice 
  } = useShop();

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/"><FaHome size={16} /> Home</Link>
          <span className="separator">&gt;</span>
          <Link to="/account">Account</Link>
          <span className="separator">&gt;</span>
          <span className="current">My Wish List</span>
        </div>

        <h1 className="page-title">My Wish List</h1>

        {wishlistItems.length > 0 ? (
          <div className="wishlist-table">
            <div className="wishlist-header">
              <div className="image-col">IMAGE</div>
              <div className="product-col">PRODUCT NAME</div>
              <div className="model-col">MODEL</div>
              <div className="stock-col">STOCK</div>
              <div className="price-col">UNIT PRICE</div>
              <div className="action-col">ACTION</div>
            </div>

            {wishlistItems.map(item => ( <>
              <div className="wishlist-item" key={item.id}>
                <div className="image-col" data-label="Image">
                  <Link to={`/product/${item.id}`}>
                    <img src={`/images/products/${item.image}`} alt={item.name} />
                  </Link>
                </div>
                <div className="product-col" data-label="Product Name">
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </div>
                <div className="model-col" data-label="Model">
                  {item.model}
                </div>
                <div className="stock-col" data-label="Stock">
                  <span className={item.inStock ? "in-stock" : "out-of-stock"}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="price-col" data-label="Unit Price">
                  <div className="price">
                    <span className="current-price">{formatPrice(item.price)}BDT</span>
                    {item.originalPrice && (
                      <span className="original-price">{formatPrice(item.originalPrice)}BDT</span>
                    )}
                  </div>
                </div>
                <div className="wishlist-action-col" data-label="Action">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock}
                    title="Add to Cart"
                  >
                    <FaShoppingCart size={16} />
                  </button>
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    title="Remove from Wishlist"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </div>
              </>
            ))}
            <div className="continue-shopping">
            <Link to="/products" className="wishlist-continue-btn">
              CONTINUE
            </Link>
          </div> 
          </div>
        ) : (
          <div className="empty-wishlist">
            <p>Your wish list is empty.</p>
            <Link to="/products" className="wishlist-continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 