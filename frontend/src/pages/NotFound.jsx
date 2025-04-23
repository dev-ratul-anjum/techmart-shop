import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
    window.scrollTo(0, 0); // Scroll to top on page load

    return (
        <div className="not-found-page">
            <div className="container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/"><FaHome /></Link>
                    <span className="separator">→</span>
                    <span className="current">The page you requested cannot be found!</span>
                </div>

                <h1 className="page-title">The page you requested cannot be found!</h1>
                
                <div className="not-found-content">
                    <p className="not-found-message">The page you requested cannot be found.</p>
                    
                    <Link to="/" className="continue-button">
                        CONTINUE
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 