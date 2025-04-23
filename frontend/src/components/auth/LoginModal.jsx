import React, { useState } from 'react';
import Modal from '../common/Modal';
import { toast } from 'react-toastify';
const BACKEND_URL = import.meta.VITE_APP_BACKEND_URL;


const LoginModal = ({ isOpen, onClose, openRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const loginUser = async () =>{
            const response = await fetch(`${BACKEND_URL}/api/users/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if(!data.errors){
                localStorage.setItem('token', data.token);
                onClose();
                toast.success('Login successful!', {autoClose: 1000, className: 'toast-success' });

                setEmail('');
                setPassword('');
                setErrors({});

                setTimeout(() => {
                    window.location.replace('/');
                }, 2000);
            }else{
                setErrors(data.errors);
            }
        }
        loginUser();
    };

    const switchToRegister = () => {
        onClose();
        openRegister();
    };

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose} title="Returning Customer">
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-Mail Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                {errors.common && <span className="error">{errors.common}</span>}
                
  
                
                <button type="submit" className="auth-button">
                    LOGIN
                </button>
                
                <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#555' }}>
                    Don't have an account? 
                    <a 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault();
                            switchToRegister();
                        }} 
                        style={{ color: '#5e2e91', marginLeft: '5px', textDecoration: 'none' }}
                    >
                        Register here
                    </a>
                </p>

                <a href="#" className="form-link" onClick={(e) => {e.preventDefault(); /* Handle password reset */}}>
                    Forgotten Password?
                </a>
          
            </form>
        </Modal>
        </>
    );
};

export default LoginModal; 