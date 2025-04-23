import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { toast } from 'react-toastify';
import './Auth.css';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="PRIVACY POLICY">
            <div className="privacy-policy-content">
                <h2>Privacy Policy | Tech Mart</h2>
                <p><strong>Effective Date:</strong> 01-01-2025</p>
                
                <p>At Tech Mart, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, store, and protect your personal information in compliance with both international laws (such as GDPR) and Bangladeshi privacy laws.</p>
                
                <h3>1. Information We Collect</h3>
                <p>We collect various types of information when you interact with our website and services:</p>
                <p><strong>Personal Information:</strong> When you make purchases, sign up for newsletters, or contact us, we may collect your name, email address, phone number, shipping and billing addresses, payment details, and other necessary information to process your order.</p>
                <p><strong>Non-Personal Information:</strong> We also collect data such as your IP address, device type, browser type, browsing activity, and location, which helps us improve our website and provide a better user experience.</p>
                
                <h3>2. How We Use Your Information</h3>
                <p>Your personal data is used for the following purposes:</p>
                <ul>
                    <li><strong>Order Processing:</strong> To process your orders, complete transactions, and deliver products to you.</li>
                    <li><strong>Customer Communication:</strong> To provide customer support, send you product updates, promotions, and newsletters (you can opt-out anytime).</li>
                    <li><strong>Website Improvement:</strong> To enhance our website's functionality, security, and your overall shopping experience.</li>
                    <li><strong>Legal Compliance:</strong> To comply with legal obligations under both Bangladeshi and international laws.</li>
                </ul>
                
                <h3>3. Data Protection and Security</h3>
                <p>We use industry-standard security measures to protect your data. However, no method of data transmission over the internet is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
                
                <h3>4. Cookies</h3>
                <p>We use cookies to enhance your experience on our website. Cookies are small files placed on your device that allow us to remember your preferences and provide personalized content. By using our website, you consent to the use of cookies as outlined in this policy. You can disable cookies through your browser settings, but some parts of the website may not function correctly if cookies are disabled.</p>
                
                <h3>5. Sharing Your Information</h3>
                <p>We may share your personal data with trusted third parties who help us operate our website and provide services, such as payment processors. These service providers adhere to strict data protection standards and do not misuse your information.</p>
                
                <h3>6. Your Rights</h3>
                <p>Under both international and Bangladeshi privacy laws, you have the following rights:</p>
                <ul>
                    <li><strong>Access:</strong> You have the right to request a copy of the personal information we hold about you.</li>
                    <li><strong>Rectification:</strong> You can request corrections to any inaccurate or incomplete data we hold.</li>
                    <li><strong>Erasure:</strong> You have the right to request the deletion of your personal data, subject to certain legal exceptions.</li>
                    <li><strong>Opt-Out:</strong> You can unsubscribe from marketing communications at any time by clicking the "unsubscribe" link in emails or by contacting us directly.</li>
                </ul>
                
                <h3>7. Children's Privacy</h3>
                <p>We do not knowingly collect or solicit personal information from children under the age of 13. If we learn that we have inadvertently collected personal data from a child under 13, we will take steps to delete that information as quickly as possible.</p>
                
                <h3>8. Changes to This Privacy Policy</h3>
                <p>We reserve the right to update this Privacy Policy periodically. Any changes will be posted on this page with an updated "Effective Date". We encourage you to review this policy regularly to stay informed about how we protect your data.</p>
                
                <h3>9. Compliance with Laws</h3>
                <p><strong>General Data Protection Regulation (GDPR):</strong> If you are a resident of the European Union, we comply with the GDPR, which regulates how businesses collect, process, and store your personal data.</p>
                <p><strong>Digital Security Act (Bangladesh):</strong> We follow the Digital Security Act, 2018 and other applicable laws of Bangladesh to ensure the privacy and security of personal data.</p>
                
                <h3>10. Contact Us</h3>
                <p>If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us:</p>
                <p>Email: info@techmart.com.bd</p>
            </div>
        </Modal>
    );
};

const RegisterModal = ({ isOpen, onClose, openLogin }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
    const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const BACKEND_URL = import.meta.VITE_APP_BACKEND_URL;


    const handleSubmit = (e) => {
        e.preventDefault();

        const registerUser = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/users/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        telephone,
                        password,
                        confirmPassword,
                        newsletter,
                        agreedToPrivacy,
                    }),
                });

                const data = await response.json();
                
                if(data.errors) {
                    setErrors(data.errors);
                }else{
                    localStorage.setItem('token', data.token);
                    onClose();
                    toast.success('Registration successful! Please check your email for verification.', 
                        {autoClose : 1000, className: 'toast-success'}
                    );  

                    setTimeout(() => {
                        window.location.replace('/');
                    }, 2000);

                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setTelephone('');
                    setPassword('');
                    setConfirmPassword('');
                    setNewsletter(false);
                    setAgreedToPrivacy(false);
                    setErrors({});
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
        registerUser();
    };

    const openPrivacyPolicy = (e) => {
        e.preventDefault();
        setPrivacyPolicyOpen(true);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Create TechMart Account"
                size="md"
            >
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="section-title">
                        <h3>Your Personal Details</h3>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="firstName">
                            First Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}     
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="lastName">
                            Last Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">
                            E-Mail <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-Mail"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="telephone">
                            Telephone <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            id="telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            className="telephone-input"
                            placeholder="017XXXXXXXX"
                        />
                        {errors.telephone && <span className="error">{errors.telephone}</span>}
                    </div>
                    
                    <div className="section-title">
                        <h3>Your Password</h3>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">
                            Password <span className="required">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="password-input"
                            placeholder="••••••"
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Password Confirm <span className="required">*</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Password Confirm"
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>
                    
                    <div className="section-title">
                        <h3>Newsletter</h3>
                    </div>
                    
                    <div className="form-radio-group">
                        <label className="radio-group-label">Subscribe</label>
                        <div className="radio-options">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="newsletter"
                                    value="yes"
                                    checked={newsletter === true}
                                    onChange={() => setNewsletter(true)}
                                />
                                Yes
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="newsletter"
                                    value="no"
                                    checked={newsletter === false}
                                    onChange={() => setNewsletter(false)}
                                />
                                No
                            </label>
                        </div>
                    </div>
                    
                    <div className="privacy-agreement">
                        <label className="form-checkbox privacy-checkbox">
                            <input
                                type="checkbox"
                                checked={agreedToPrivacy}
                                onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                            />
                            <span>I have read and agree to the <a href="#" onClick={openPrivacyPolicy}>Privacy Policy</a></span>
                        </label>
                    </div>
                    {errors.agreedToPrivacy && <span className="error">{errors.agreedToPrivacy}</span>}
                    {errors.common && <span className="error">{errors.common}</span>}
                    
                    <button className="auth-button" type="submit">
                        CONTINUE
                    </button>
                </form>
            </Modal>
            <PrivacyPolicyModal 
                isOpen={privacyPolicyOpen} 
                onClose={() => setPrivacyPolicyOpen(false)} 
            />
        </>
    );
};

export default RegisterModal; 