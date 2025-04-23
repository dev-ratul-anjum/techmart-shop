import React from 'react';
import './MovingTextBanner.css';

const MovingTextBanner = ({ text, speed = 'medium' }) => {
  // Speed classes: slow, medium, fast
  const speedClass = `speed-${speed}`;

  return (
    <div className="moving-banner">
      <div className="banner-container">
        <div className={`moving-text ${speedClass}`}>
          <div className="text-content">
            {text}
          </div>
          <div className="text-content" aria-hidden="true">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingTextBanner; 