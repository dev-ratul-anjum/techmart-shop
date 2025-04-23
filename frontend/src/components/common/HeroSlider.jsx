import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      bgColor: '#DAFF56',
      logo: 'HP_LOGO.png',
      title: 'Boost your creativity',
      subtitle: 'with reliable, high-quality printing.',
      productTitle: 'HP Smart Tank 520 & 580 AiO Color Printers',
      tagline: 'FREE* 2-Year Warranty',
      image: 'hp_printer.avif',
      link: '/category/printers'
    },
    {
      id: 2,
      bgColor: '#FFD9D9',
      logo: 'apple_logo.png',
      title: 'Capture every moment',
      subtitle: 'with the stunning iPhone camera system.',
      productTitle: 'iPhone 15 Pro & Pro Max',
      tagline: 'NOW AVAILABLE',
      image: 'iphone-15.png',
      link: '/category/smartphones'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual slide change
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="hero-slider" >
      <div className="slider-container">
        <div className="slider-content" style={{ backgroundColor: slide.bgColor }}>
          <div className="left-content">
            <img src={`/images/heroslider/${slide.logo}`} alt="Brand Logo" className="brand-logo" />
            <h1 className="slider-title">{slide.title}</h1>
            <h2 className="slider-subtitle">{slide.subtitle}</h2>
            <h3 className="product-title">{slide.productTitle}</h3>
            <div className="promo-tag">{slide.tagline}</div>
            <Link to={slide.link} className="shop-now-btn">SHOP NOW</Link>
          </div>
          <div className="right-content">
            <img src={`/images/heroslider/${slide.image}`} alt="Product" className="product-img" />
          </div>
        </div>

        <div className="slider-controls">
          <button className="arrow prev-arrow" onClick={prevSlide}>❮</button>
          <div className="dots">
            {slides.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          <button className="arrow next-arrow" onClick={nextSlide}>❯</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider; 