import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight, FaTruck, FaMoneyBillWave, FaSync, FaTimesCircle, FaCreditCard, FaStore } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
    window.scrollTo(0, 0); // Scroll to top on page load

    const { cartItems, updateQuantity, removeFromCart, formatPrice, cartTotal } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [deliveryMethod, setDeliveryMethod] = useState('home');
    const [orderNotes, setOrderNotes] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    
    // Billing address form state
    const [billingAddress, setBillingAddress] = useState({
        firstName: '',
        lastName: '',
        company: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
        region: ''
    });

    // Handle input change for billing address
    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle payment method change
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    // Handle delivery method change
    const handleDeliveryMethodChange = (method) => {
        setDeliveryMethod(method);
    };

    // Clear form errors when fields are filled
    useEffect(() => {
        const newErrors = { ...formErrors };
        
        // Clear errors for billing fields that have values
        Object.keys(billingAddress).forEach(field => {
            if (billingAddress[field] && newErrors[field]) {
                delete newErrors[field];
            }
        });
        
        // Clear payment method error if selected
        if (paymentMethod && newErrors.paymentMethod) {
            delete newErrors.paymentMethod;
        }
        
        // Clear delivery method error if selected
        if (deliveryMethod && newErrors.deliveryMethod) {
            delete newErrors.deliveryMethod;
        }
        
        // Update errors state if changed
        if (Object.keys(newErrors).length !== Object.keys(formErrors).length) {
            setFormErrors(newErrors);
        }
    }, [billingAddress, paymentMethod, deliveryMethod]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        const errors = {};
        
        // Required billing fields
        const requiredFields = ['firstName', 'lastName', 'address1', 'city', 'postcode', 'country', 'region'];
        requiredFields.forEach(field => {
            if (!billingAddress[field]) {
                errors[field] = 'This field is required';
            }
        });
        
        // Validate terms agreement
        if (!agreeTerms) {
            errors.terms = 'You must agree to the Terms & Conditions';
        }
        
        // If there are errors, show them and don't proceed
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            // Scroll to the first error
            const firstErrorField = document.querySelector('.form-error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Prepare order data
        const orderData = {
            billingAddress,
            paymentMethod,
            deliveryMethod,
            orderNotes,
            items: cartItems,
            total: cartTotal
        };
        
        // Process the order based on payment method
        if (paymentMethod === 'cash') {
            processCashOnDelivery(orderData);
        } else if (paymentMethod === 'online') {
            processOnlinePayment(orderData);
        } else if (paymentMethod === 'pos') {
            processPosPayment(orderData);
        }
    };
    
    // Process cash on delivery orders
    const processCashOnDelivery = (orderData) => {
        alert('Your Cash on Delivery order has been placed successfully!');
        // In a real app, would send to server and redirect
    };
    
    // Process online payment orders
    const processOnlinePayment = (orderData) => {
        alert('Redirecting to payment gateway...');
        // In a real app, would redirect to payment gateway
    };
    
    // Process POS payment orders
    const processPosPayment = (orderData) => {
        alert('Your order has been placed. Please bring your card for POS payment on delivery.');
        // In a real app, would send to server and redirect
    };

    return (
        <div className="checkout-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">
                        <FaHome /> Home
                    </Link>
                    <span className="separator">
                        <FaChevronRight />
                    </span>
                    <Link to="/cart">
                        Shopping Cart
                    </Link>
                    <span className="separator">
                        <FaChevronRight />
                    </span>
                    <span className="current">Checkout</span>
                </div>

                <h1 className="page-title">Quick Checkout</h1>
                
                <form onSubmit={handleSubmit} className="checkout-form-container">
                    <div className="checkout-container">
                        {/* Left Column - Billing Address */}
                        <div className="checkout-column">
                            <div className="checkout-section">
                                <h3 className="section-title">
                                    <span className="step-number">1</span> Billing Address
                                </h3>
                                <div className="checkout-form">
                                    <div className={`form-group ${formErrors.firstName ? 'has-error' : ''}`}>
                                        <label htmlFor="firstName">First Name <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="firstName" 
                                            name="firstName" 
                                            placeholder="First Name" 
                                            value={billingAddress.firstName}
                                            onChange={handleBillingChange}
                                        />
                                        {formErrors.firstName && <div className="form-error">{formErrors.firstName}</div>}
                                    </div>
                                    <div className={`form-group ${formErrors.lastName ? 'has-error' : ''}`}>
                                        <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="lastName" 
                                            name="lastName" 
                                            placeholder="Last Name" 
                                            value={billingAddress.lastName}
                                            onChange={handleBillingChange}
                                        />
                                        {formErrors.lastName && <div className="form-error">{formErrors.lastName}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="company">Company</label>
                                        <input 
                                            type="text" 
                                            id="company" 
                                            name="company" 
                                            placeholder="Company" 
                                            value={billingAddress.company}
                                            onChange={handleBillingChange}
                                        />
                                    </div>
                                    <div className={`form-group ${formErrors.address1 ? 'has-error' : ''}`}>
                                        <label htmlFor="address1">Address 1 <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="address1" 
                                            name="address1" 
                                            placeholder="Address 1" 
                                            value={billingAddress.address1}
                                            onChange={handleBillingChange}
                                        />
                                        {formErrors.address1 && <div className="form-error">{formErrors.address1}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address2">Address 2</label>
                                        <input 
                                            type="text" 
                                            id="address2" 
                                            name="address2" 
                                            placeholder="Address 2" 
                                            value={billingAddress.address2}
                                            onChange={handleBillingChange}
                                        />
                                    </div>
                                    <div className={`form-group ${formErrors.city ? 'has-error' : ''}`}>
                                        <label htmlFor="city">City <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="city" 
                                            name="city" 
                                            placeholder="City" 
                                            value={billingAddress.city}
                                            onChange={handleBillingChange}
                                        />
                                        {formErrors.city && <div className="form-error">{formErrors.city}</div>}
                                    </div>
                                    <div className={`form-group ${formErrors.postcode ? 'has-error' : ''}`}>
                                        <label htmlFor="postcode">Post Code <span className="required">*</span></label>
                                        <input 
                                            type="text" 
                                            id="postcode" 
                                            name="postcode" 
                                            placeholder="Post Code" 
                                            value={billingAddress.postcode}
                                            onChange={handleBillingChange}
                                        />
                                        {formErrors.postcode && <div className="form-error">{formErrors.postcode}</div>}
                                    </div>
                                    <div className={`form-group ${formErrors.country ? 'has-error' : ''}`}>
                                        <label htmlFor="country">Country <span className="required">*</span></label>
                                        <select 
                                            id="country" 
                                            name="country"
                                            value={billingAddress.country}
                                            onChange={handleBillingChange}
                                        >
                                            <option value="">Select Country</option>
                                            <option value="bangladesh">Bangladesh</option>
                                            <option value="india">India</option>
                                            <option value="pakistan">Pakistan</option>
                                        </select>
                                        {formErrors.country && <div className="form-error">{formErrors.country}</div>}
                                    </div>
                                    <div className={`form-group ${formErrors.region ? 'has-error' : ''}`}>
                                        <label htmlFor="region">Region / State <span className="required">*</span></label>
                                        <select 
                                            id="region" 
                                            name="region"
                                            value={billingAddress.region}
                                            onChange={handleBillingChange}
                                        >
                                            <option value="">Select Region / State</option>
                                            <option value="dhaka">Dhaka</option>
                                            <option value="chittagong">Chittagong</option>
                                            <option value="sylhet">Sylhet</option>
                                        </select>
                                        {formErrors.region && <div className="form-error">{formErrors.region}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Middle Column - Payment & Delivery Methods */}
                        <div className="checkout-column">
                            {/* Payment Method Section */}
                            <div className="checkout-section">
                                <h3 className="section-title">
                                    <span className="step-number">2</span> Payment Method
                                </h3>
                                <div className="method-selection">
                                    <p className="selection-title">Select a payment method</p>
                                    
                                    <div className="method-option">
                                        <input 
                                            type="radio" 
                                            id="cashOnDelivery" 
                                            name="paymentMethod" 
                                            checked={paymentMethod === 'cash'} 
                                            onChange={() => handlePaymentMethodChange('cash')}
                                        />
                                        <label htmlFor="cashOnDelivery">
                                            <FaMoneyBillWave className="method-icon" />
                                            Cash on Delivery
                                        </label>
                                    </div>
                                    
                                    <div className="method-option">
                                        <input 
                                            type="radio" 
                                            id="onlinePayment" 
                                            name="paymentMethod" 
                                            checked={paymentMethod === 'online'} 
                                            onChange={() => handlePaymentMethodChange('online')}
                                        />
                                        <label htmlFor="onlinePayment">
                                            <FaCreditCard className="method-icon" />
                                            Online Payment
                                        </label>
                                    </div>
                                    
                                    <div className="method-option">
                                        <input 
                                            type="radio" 
                                            id="posOnDelivery" 
                                            name="paymentMethod" 
                                            checked={paymentMethod === 'pos'} 
                                            onChange={() => handlePaymentMethodChange('pos')}
                                        />
                                        <label htmlFor="posOnDelivery">
                                            <FaCreditCard className="method-icon" />
                                            POS on Delivery
                                        </label>
                                    </div>
                                    
                                    {paymentMethod === 'online' && (
                                        <div className="payment-details online-payment">
                                            <p className="payment-note">You will be redirected to our secure payment gateway after confirming your order.</p>
                                            <div className="payment-methods-icons">
                                                <span className="payment-icon">Visa</span>
                                                <span className="payment-icon">MasterCard</span>
                                                <span className="payment-icon">Amex</span>
                                                <span className="payment-icon">bKash</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {paymentMethod === 'pos' && (
                                        <div className="payment-details pos-payment">
                                            <p className="payment-note">Our delivery personnel will bring a POS machine. Please keep your card ready at the time of delivery.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Delivery Method Section */}
                            <div className="checkout-section">
                                <h3 className="section-title">
                                    <span className="step-number">3</span> Delivery Method
                                </h3>
                                <div className="method-selection">
                                    <p className="selection-title">Select a delivery method</p>
                                    
                                    <div className="method-option">
                                        <input 
                                            type="radio" 
                                            id="homeDelivery" 
                                            name="deliveryMethod" 
                                            checked={deliveryMethod === 'home'} 
                                            onChange={() => handleDeliveryMethodChange('home')}
                                        />
                                        <label htmlFor="homeDelivery">
                                            <FaTruck className="method-icon" />
                                            Home Delivery - 60৳
                                        </label>
                                    </div>
                                    
                                    <div className="method-option">
                                        <input 
                                            type="radio" 
                                            id="storePickup" 
                                            name="deliveryMethod" 
                                            checked={deliveryMethod === 'store'} 
                                            onChange={() => handleDeliveryMethodChange('store')}
                                        />
                                        <label htmlFor="storePickup">
                                            <FaStore className="method-icon" />
                                            Store Pickup - 0৳
                                        </label>
                                    </div>
                                    
                                    <div className="method-option">
                                        <input 
                                            type="radio" 
                                            id="expressDelivery" 
                                            name="deliveryMethod" 
                                            checked={deliveryMethod === 'express'} 
                                            onChange={() => handleDeliveryMethodChange('express')}
                                        />
                                        <label htmlFor="expressDelivery">
                                            <FaTruck className="method-icon" />
                                            Request Express - Charge Applicable
                                        </label>
                                    </div>
                                    
                                    {deliveryMethod === 'store' && (
                                        <div className="delivery-details store-pickup">
                                            <p className="delivery-note">You can collect your order from our store during business hours (10 AM - 8 PM).</p>
                                        </div>
                                    )}
                                    
                                    {deliveryMethod === 'express' && (
                                        <div className="delivery-details express-delivery">
                                            <p className="delivery-note">Express delivery charges will be calculated based on your location. Our customer service will contact you for confirmation.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Coupon Section */}
                            <div className="checkout-section">
                                <h3 className="section-title">
                                    <span className="step-number">4</span> Coupon / Voucher / Reward
                                </h3>
                                <div className="coupon-section">
                                    <p>Enter your coupon here</p>
                                    <div className="input-with-button">
                                        <input type="text" placeholder="Enter your coupon here" />
                                        <button type="button" className="submit-btn">SUBMIT</button>
                                    </div>
                                </div>
                                <div className="coupon-section">
                                    <p>Enter your gift certificate code here</p>
                                    <div className="input-with-button">
                                        <input type="text" placeholder="Enter your gift certificate code here" />
                                        <button type="button" className="submit-btn">SUBMIT</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Cart Summary */}
                        <div className="checkout-column">
                            <div className="checkout-section">
                                <h3 className="section-title">
                                    <span className="step-number">5</span> Shopping Cart
                                </h3>
                                <div className="cart-summary">
                                    <div className="cart-summary-table-container">
                                        <table className="cart-summary-table">
                                            <thead>
                                                <tr>
                                                    <th>IMAGE</th>
                                                    <th>PRODUCT NAME</th>
                                                    <th>MODEL</th>
                                                    <th>QTY</th>
                                                    <th>UNIT PRICE</th>
                                                    <th>TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map(item => (
                                                    <tr key={item.id} className="checkout-cart-item">
                                                        <td className="image-column" data-label="IMAGE">
                                                            <img src={item.image} alt={item.name} />
                                                        </td>
                                                        <td className="product-column" data-label="PRODUCT NAME">
                                                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                        </td>
                                                        <td className="model-column" data-label="MODEL">
                                                            {item.model}
                                                        </td>
                                                        <td className="quantity-column" data-label="QTY">
                                                            <div className="quantity-control">
                                                                <input 
                                                                    type="number" 
                                                                    min="1" 
                                                                    value={item.quantity} 
                                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                                />
                                                                <div className="checkout-action-buttons">
                                                                    <button 
                                                                        type="button"
                                                                        className="refresh-btn"
                                                                        title="Update"
                                                                        onClick={() => updateQuantity(item.id, item.quantity)}
                                                                    >
                                                                        <FaSync />
                                                                    </button>
                                                                    <button 
                                                                        type="button"
                                                                        className="remove-btn"
                                                                        title="Remove"
                                                                        onClick={() => removeFromCart(item.id)}
                                                                    >
                                                                        <FaTimesCircle />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="price-column" data-label="UNIT PRICE">
                                                            {formatPrice(item.price)}৳
                                                        </td>
                                                        <td className="total-column" data-label="TOTAL">
                                                            {formatPrice(item.price * item.quantity)}৳
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div className="cart-totals">
                                        <div className="total-row">
                                            <span>Sub-Total:</span>
                                            <span>{formatPrice(cartTotal)}৳</span>
                                        </div>
                                        <div className="total-row">
                                            <span>Flat Shipping Rate:</span>
                                            <span>{deliveryMethod === 'home' ? '60৳' : deliveryMethod === 'express' ? 'To be calculated' : '0৳'}</span>
                                        </div>
                                        <div className="total-row grand-total">
                                            <span>Total:</span>
                                            <span>{formatPrice(cartTotal + (deliveryMethod === 'home' ? 60 : 0))}৳</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="checkout-section">
                                <h3 className="section-title">
                                    <span className="step-number">6</span> Confirm Your Order
                                </h3>
                                <div className="order-confirmation">
                                    <textarea 
                                        placeholder="Add Comments About Your Order" 
                                        rows="5"
                                        value={orderNotes}
                                        onChange={(e) => setOrderNotes(e.target.value)}
                                    ></textarea>
                                    
                                    <div className="checkbox-group">
                                        <input 
                                            type="checkbox" 
                                            id="newsletter" 
                                            name="newsletter" 
                                            defaultChecked 
                                        />
                                        <label htmlFor="newsletter">I wish to subscribe to the Tech Mart newsletter.</label>
                                    </div>
                                    
                                    <div className={`checkbox-group ${formErrors.terms ? 'has-error' : ''}`}>
                                        <input 
                                            type="checkbox" 
                                            id="termsConditions" 
                                            name="termsConditions"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                        />
                                        <label htmlFor="termsConditions">
                                            I have read and agree to the <a href="/terms" className="terms-link">Terms & Conditions</a>
                                        </label>
                                        {formErrors.terms && <div className="form-error">{formErrors.terms}</div>}
                                    </div>
                                    
                                    <button type="submit" className="confirm-order-btn">
                                        CONFIRM ORDER
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout; 