import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExchangeAlt, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { useShop } from '../contexts/ShopContext';
import './Compare.css';

const Compare = () => {
  window.scrollTo(0, 0); // Scroll to top on page load

  // Get data and functions from context
  const { 
    compareItems, 
    removeFromCompare, 
    addToCart, 
    formatPrice 
  } = useShop();

  const handleRemoveItem = (id) => {
    removeFromCompare(id);
  };

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  return (
    <div className="compare-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/"><FaHome size={16} /> Home</Link>
          <span className="separator">&gt;</span>
          <span className="current">Product Comparison</span>
        </div>

        <h1 className="page-title">
          Product Comparison
        </h1>

        {compareItems.length > 0 ? (
          <div className="compare-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="feature-column">PRODUCT DETAILS</th>
                  {compareItems.map(item => (
                    <th key={item.id} className="product-column">
                      <div className="compare-product-image">
                        <button 
                          className="compare-remove-btn" 
                          onClick={() => handleRemoveItem(item.id)}
                          title="Remove from comparison"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                        <Link to={`/product/${item.id}`}>
                          <img src={`/images/products/${item.image}`} alt={item.name} />
                        </Link>
                      </div>
                      <div className="product-info">
                        <Link to={`/product/${item.brand.toLowerCase()}`} className="product-brand">
                          {item.brand}
                        </Link>
                        <Link to={`/product/${item.id}`} className="product-name">
                          {item.model}
                        </Link>
                        <div className="product-rating">
                          {[1, 2, 3, 4, 5].map(star => (
                            <span 
                              key={star} 
                              className={star <= Math.floor(item.rating) ? "star filled" : "star"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">Product</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-name">Price</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      <div className="price">
                        <span className="current-price">{formatPrice(item.price)}BDT</span>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-name">Model</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      {item.model}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-name">Brand</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      {item.brand}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-name">Availability</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      <span className={item.inStock ? "in-stock" : "out-of-stock"}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-name">Rating</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span 
                            key={star} 
                            className={star <= Math.floor(item.rating) ? "star filled" : "star"}
                          >
                            ★
                          </span>
                        ))}
                        <span className="rating-text">Based on 1 reviews.</span>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="specifications-section">
                  <td colSpan={compareItems.length + 1} className="section-header">
                    SPECIFICATIONS
                  </td>
                </tr>

                <tr>
                  <td className="feature-name">Network</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      {item.network}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-name">Display</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      {item.display}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-name">Action</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="product-data">
                      <button 
                        className="add-to-cart-btn" 
                        onClick={() => handleAddToCart(item.id)}
                        disabled={!item.inStock}
                      >
                        <FaShoppingCart size={14} /> ADD TO CART
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-compare">
            <p>You have no products to compare.</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;