import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserPlus, FaHeart, FaExchangeAlt, FaShoppingCart } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { useShop } from '../../contexts/ShopContext';
import { useCart } from '../../contexts/CartContext';
import Logo from './Logo';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import { toast, ToastContainer } from 'react-toastify';
import './Header.css';

const Header = ({user}) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    
    // Get data from context
    const { wishlistItems, compareItems } = useShop();
    
    // Get cart data from CartContext
    const { cartCount } = useCart();
    
    // Calculate counts
    const wishlistCount = wishlistItems.length;
    const compareCount = compareItems.length;

    const openLoginModal = () => {
        setIsLoginOpen(true);
    };

    const openRegisterModal = () => {
        setIsRegisterOpen(true);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-container">
                    <Logo />
                </div>
                
                <div className="search-bar">
                    <input type="text" placeholder="Search for products..." />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
                
                <div className="nav-icons">
                    {!user && <> <a href="#" className="icon-link" onClick={(e) => {e.preventDefault(); openLoginModal();}}>
                        <FaUser size={24} />
                        <span>Login</span>
                    </a>
                    <a href="#" className="icon-link" onClick={(e) => {e.preventDefault(); openRegisterModal();}}>
                        <FaUserPlus size={24} />
                        <span>Register</span>
                    </a> </>}

                    {user && <a href="#" className="icon-link" onClick={(e) => {localStorage.removeItem('token');  toast.success('Logout successful!', { autoClose : 1000 , className: 'toast-success' }); setTimeout(() => {window.location.replace('/');}, 2000);}}>
                        <IoIosLogOut size={24} />
                        <span>Logout</span>
                    </a>}

                    <Link to='/wishlist' className="icon-link wishlist">
                        <div className="icon-with-badge">
                            <FaHeart size={24} />
                            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
                        </div>
                        <span>Wishlist</span>
                    </Link>
                    <Link to="/compare" className="icon-link compare">
                        <div className="icon-with-badge">
                            <FaExchangeAlt size={24} />
                            {compareCount > 0 && <span className="badge">{compareCount}</span>}
                        </div>
                        <span>Compare</span>
                    </Link>
                    <Link to="/cart" className="icon-link cart">
                        <div className="cart-icon-container">
                            <FaShoppingCart size={24} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </div>
                        <span>Cart</span>
                    </Link>
                </div>
            </div>
            
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
                openRegister={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                }}
            />
            
            <RegisterModal 
                isOpen={isRegisterOpen} 
                onClose={() => setIsRegisterOpen(false)} 
                openLogin={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                }}
            />
            <ToastContainer />
        </header>
    );
};

export default Header; 