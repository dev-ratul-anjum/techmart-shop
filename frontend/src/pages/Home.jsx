import React from 'react';
import HeroSlider from '../components/common/HeroSlider';
import CompareProducts from '../components/common/CompareProducts';
import ServiceBar from '../components/common/ServiceBar';
import MovingTextBanner from '../components/common/MovingTextBanner';
import FeaturedProducts from '../components/home/FeaturedProducts';
import './Home.css';

const Home = () => {
    window.scrollTo(0, 0); // Scroll to top on page load
    
    // Special offers and announcements for moving text
    const specialOffers = "🔥 HOT DEALS: iPhone 15 Pro - Save 15% | Samsung S24 Ultra - Free Galaxy Buds | HP Laptops - Extra 10% Off | Free Shipping on orders over 5000 BDT 🔥";

    return (
        <div className="home-page">
            <HeroSlider />
            <CompareProducts />
            <MovingTextBanner text={specialOffers} speed="medium" />
            <ServiceBar />
            <FeaturedProducts />
        </div>
    );
};

export default Home;