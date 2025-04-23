import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterModal from '../components/auth/RegisterModal';
const BACKEND_URL = import.meta.VITE_APP_BACKEND_URL;
import './LoginPage.css';

const LoginPage = ({ setUser }) => {
    window.scrollTo(0, 0); // Scroll to top on page load

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${BACKEND_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            
            if (data.errors) {
                setErrors(data.errors);
            } else {
                localStorage.setItem('techmart-token', data.token);
                setUser(data.user);
                
                toast.success('Login successful!', {
                    autoClose: 1000,
                    className: 'toast-success'
                });
                
                setTimeout(() => {
                    window.location.replace('/');
                }, 1500);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrors({ common: 'An error occurred. Please try again.' });
        }
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <div className="login-page-container">
            <div className="login-breadcrumb">
                <div className="container">
                    <ul>
                        <li><Link to="/"><i className="fa fa-home"></i></Link></li>
                        <li><Link to="/account">Account</Link></li>
                        <li>Login</li>
                    </ul>
                </div>
            </div>
            
            <div className="login-main-container">
                <div className="container">
                    <h1 className="login-title">Account Login</h1>
                    <hr className="login-divider" />
                    
                    <div className="login-content">
                        <div className="login-columns">
                            <div className="new-customer">
                                <h2>New Customer</h2>
                                <p>
                                    By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
                                </p>
                                <button className="login-btn continue-btn" onClick={openRegisterModal}>
                                    CONTINUE
                                </button>
                            </div>
                            
                            <div className="returning-customer">
                                <h2>Returning Customer</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="login-form-group">
                                        <label htmlFor="email">E-Mail Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="017XXXXXXXX"
                                        />
                                        {errors.email && <span className="login-error">{errors.email}</span>}
                                    </div>
                                    
                                    <div className="login-form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••"
                                        />
                                        {errors.password && <span className="login-error">{errors.password}</span>}
                                    </div>
                                    
                                    <Link to="/forgot-password" className="forgot-password">
                                        Forgotten Password
                                    </Link>
                                    
                                    <button type="submit" className="login-btn login-submit-btn">
                                        LOGIN
                                    </button>
                                    
                                    {errors.common && <div className="login-error common-error">{errors.common}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={closeRegisterModal}
                openLogin={() => {}}
            />
        </div>
    );
};

export default LoginPage; 