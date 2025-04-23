import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
    return (
        <Link to="/" className="logo-link">
            <img src='/images/static/techmart_logo.png' alt="TECH MART" className="logo-image" />
        </Link>
    );
};

export default Logo; 