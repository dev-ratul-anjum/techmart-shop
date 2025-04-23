import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaTrashAlt, FaArrowRight, FaSyncAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
    window.scrollTo(0, 0); // Scroll to top on page load

    const { cartItems, removeFromCart, updateQuantity, formatPrice, cartTotal, calculateTotalWeight } = useCart();
    
    // State for collapsible sections
    const [couponOpen, setCouponOpen] = useState(false);
    const [shippingOpen, setShippingOpen] = useState(false);
    const [giftCertOpen, setGiftCertOpen] = useState(false);
    
    // Form state
    const [couponCode, setCouponCode] = useState('');
    const [estimateCountry, setEstimateCountry] = useState('');
    const [estimateRegion, setEstimateRegion] = useState('');
    const [estimateZip, setEstimateZip] = useState('');
    const [giftCertCode, setGiftCertCode] = useState('');

    // Handle continue shopping button
    const continueShopping = () => {
        window.location.href = '/products';
    };

    // Handle checkout button
    const checkout = () => {
        window.location.href = '/checkout';
    };

    // Handle form submissions
    const applyCoupon = (e) => {
        e.preventDefault();
        // Implementation would connect to backend
        alert('Applying coupon: ' + couponCode);
    };

    const getShippingQuote = (e) => {
        e.preventDefault();
        // Implementation would connect to backend
        alert(`Getting shipping quote for: ${estimateCountry}, ${estimateRegion}, ${estimateZip}`);
    };

    const applyGiftCertificate = (e) => {
        e.preventDefault();
        // Implementation would connect to backend
        alert('Applying gift certificate: ' + giftCertCode);
    };

    return (
        <div className="cart-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">
                        <FaHome /> Home
                    </Link>
                    <span className="separator">/</span>
                    <span className="current">Shopping Cart</span>
                </div>

                <h1 className="page-title">Shopping Cart ({calculateTotalWeight()}kg)</h1>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your shopping cart is empty.</p>
                        <button onClick={continueShopping} className="continue-btn">Continue Shopping</button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-main">
                            <div className="cart-table-container">
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th className="image-col">IMAGE</th>
                                            <th className="name-col">PRODUCT NAME</th>
                                            <th className="model-col">MODEL</th>
                                            <th className="quantity-col">QUANTITY</th>
                                            <th className="unit-price-col">UNIT PRICE</th>
                                            <th className="total-col">TOTAL</th>
                                            <th className="action-col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map(item => (
                                            <tr key={item.id}>
                                                <td className="image-col" data-label="IMAGE">
                                                    <Link to={`/product/${item.id}`}>
                                                        <img src={item.image} alt={item.name} />
                                                    </Link>
                                                </td>
                                                <td className="name-col" data-label="PRODUCT NAME">
                                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                </td>
                                                <td className="model-col" data-label="MODEL">{item.model}</td>
                                                <td className="quantity-col" data-label="QUANTITY">
                                                    <div className="quantity-control">
                                                        <button 
                                                            className="quantity-btn minus"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <input 
                                                            type="text" 
                                                            value={item.quantity}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value);
                                                                if (!isNaN(value) && value >= 1) {
                                                                    updateQuantity(item.id, value);
                                                                }
                                                            }}
                                                        />
                                                        <button 
                                                            className="quantity-btn plus"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="unit-price-col" data-label="UNIT PRICE">{item.price}BDT</td>
                                                <td className="total-col" data-label="TOTAL">{item.price * item.quantity}BDT</td>
                                                <td className="action-col">
                                                    <button 
                                                        className="refresh-btn"
                                                        onClick={() => updateQuantity(item.id, item.quantity)}
                                                        title="Update"
                                                    >
                                                        <FaSyncAlt />
                                                    </button>
                                                    <button 
                                                        className="remove-btn"
                                                        onClick={() => removeFromCart(item.id)}
                                                        title="Remove"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="cart-sidebar">
                            <h2 className="sidebar-title">What would you like to do next?</h2>
                            
                            {/* Coupon Code Section */}
                            <div className="sidebar-block">
                                <div 
                                    className={`block-header ${couponOpen ? 'open' : ''}`}
                                    onClick={() => setCouponOpen(!couponOpen)}
                                >
                                    <h3>USE COUPON CODE</h3>
                                    <span className="toggle-icon">{couponOpen ? <FaMinus /> : <FaPlus />}</span>
                                </div>
                                
                                {couponOpen && (
                                    <div className="block-content">
                                        <p className="block-desc">Enter your coupon here</p>
                                        <div className="coupon-form">
                                            <input 
                                                type="text" 
                                                placeholder="Enter your coupon here"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                            />
                                            <button 
                                                type="button" 
                                                className="apply-btn"
                                                onClick={applyCoupon}
                                            >
                                                APPLY COUPON
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Shipping Estimate Section */}
                            <div className="sidebar-block">
                                <div 
                                    className={`block-header ${shippingOpen ? 'open' : ''}`}
                                    onClick={() => setShippingOpen(!shippingOpen)}
                                >
                                    <h3>ESTIMATE SHIPPING & TAXES</h3>
                                    <span className="toggle-icon">{shippingOpen ? <FaMinus /> : <FaPlus />}</span>
                                </div>
                                
                                {shippingOpen && (
                                    <div className="block-content">
                                        <p className="block-desc">Enter your destination to get a shipping estimate.</p>
                                        <form onSubmit={getShippingQuote}>
                                            <div className="form-group">
                                                <label htmlFor="country">Country <span className="required">*</span></label>
                                                <select 
                                                    id="country" 
                                                    value={estimateCountry}
                                                    onChange={(e) => setEstimateCountry(e.target.value)}
                                                    required
                                                >
                                                    <option value="">-- Please Select --</option>
                                                    <option value="Bangladesh">Bangladesh</option>
                                                    <option value="India">India</option>
                                                    <option value="Pakistan">Pakistan</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="region">Region / State <span className="required">*</span></label>
                                                <select 
                                                    id="region" 
                                                    value={estimateRegion}
                                                    onChange={(e) => setEstimateRegion(e.target.value)}
                                                    required
                                                >
                                                    <option value="">-- Please Select --</option>
                                                    <option value="Dhaka">Dhaka</option>
                                                    <option value="Chittagong">Chittagong</option>
                                                    <option value="Khulna">Khulna</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="postcode">Post Code</label>
                                                <input 
                                                    type="text" 
                                                    id="postcode" 
                                                    placeholder="Post Code"
                                                    value={estimateZip}
                                                    onChange={(e) => setEstimateZip(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className="quote-btn">GET QUOTES</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                            
                            {/* Gift Certificate Section */}
                            <div className="sidebar-block">
                                <div 
                                    className={`block-header ${giftCertOpen ? 'open' : ''}`}
                                    onClick={() => setGiftCertOpen(!giftCertOpen)}
                                >
                                    <h3>USE GIFT CERTIFICATE</h3>
                                    <span className="toggle-icon">{giftCertOpen ? <FaMinus /> : <FaPlus />}</span>
                                </div>
                                
                                {giftCertOpen && (
                                    <div className="block-content">
                                        <p className="block-desc">Enter your gift certificate code here</p>
                                        <div className="gift-form">
                                            <input 
                                                type="text" 
                                                placeholder="Enter your gift certificate code here"
                                                value={giftCertCode}
                                                onChange={(e) => setGiftCertCode(e.target.value)}
                                            />
                                            <button 
                                                type="button" 
                                                className="apply-btn"
                                                onClick={applyGiftCertificate}
                                            >
                                                APPLY GIFT CERTIFICATE
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Cart Totals */}
                            <div className="totals">
                                <div className="totals-row">
                                    <div className="totals-label">Sub-Total:</div>
                                    <div className="totals-value">{cartTotal}BDT</div>
                                </div>
                                <div className="totals-row">
                                    <div className="totals-label">Total:</div>
                                    <div className="totals-value">{cartTotal}BDT</div>
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="cart-action-buttons">
                                <button className="continue-btn" onClick={continueShopping}>
                                    CONTINUE SHOPPING
                                </button>
                                <button className="checkout-btn" onClick={checkout}>
                                    CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;

