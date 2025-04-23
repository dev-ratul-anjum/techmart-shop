import React from 'react';

// This component generates a placeholder SVG for product images
const ProductPlaceholder = ({ category, width = 300, height = 300 }) => {
  // Different colors based on product category
  const getColors = () => {
    const colors = {
      'Electronics': { bg: '#e3f2fd', fg: '#1976d2' },
      'Computers': { bg: '#e8f5e9', fg: '#2e7d32' },
      'Home Appliances': { bg: '#fff3e0', fg: '#e65100' },
      'Gaming': { bg: '#f3e5f5', fg: '#7b1fa2' },
      'Accessories': { bg: '#e1f5fe', fg: '#0288d1' },
      'Smart Home': { bg: '#ede7f6', fg: '#512da8' },
      'Wearables': { bg: '#fbe9e7', fg: '#d84315' },
      'default': { bg: '#f5f5f5', fg: '#616161' }
    };
    
    return colors[category] || colors.default;
  };
  
  const { bg, fg } = getColors();
  const iconType = getIconForCategory(category);
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="300" height="300" fill={bg} />
      
      {/* Icons based on category */}
      {renderIcon(iconType, fg)}
      
      {/* Category text */}
      <text
        x="150"
        y="240"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        textAnchor="middle"
        fill={fg}
      >
        {category}
      </text>
    </svg>
  );
};

// Helper to get icon type for category
function getIconForCategory(category) {
  const icons = {
    'Electronics': 'electronics',
    'Computers': 'computer',
    'Home Appliances': 'appliance',
    'Gaming': 'gaming',
    'Accessories': 'accessory',
    'Smart Home': 'smarthome',
    'Wearables': 'wearable',
  };
  
  return icons[category] || 'default';
}

// Helper to render the appropriate icon
function renderIcon(type, color) {
  switch (type) {
    case 'electronics':
      return (
        <g transform="translate(100, 100)">
          <rect x="10" y="10" width="80" height="60" rx="2" stroke={color} strokeWidth="5" fill="none" />
          <line x1="10" y1="30" x2="90" y2="30" stroke={color} strokeWidth="5" />
        </g>
      );
    case 'computer':
      return (
        <g transform="translate(100, 80)">
          <rect x="10" y="10" width="80" height="60" rx="2" stroke={color} strokeWidth="5" fill="none" />
          <rect x="30" y="75" width="40" height="15" stroke={color} strokeWidth="5" fill="none" />
          <line x1="50" y1="70" x2="50" y2="75" stroke={color} strokeWidth="5" />
        </g>
      );
    case 'appliance':
      return (
        <g transform="translate(100, 80)">
          <rect x="10" y="10" width="80" height="100" rx="5" stroke={color} strokeWidth="5" fill="none" />
          <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="5" fill="none" />
          <rect x="30" y="90" width="40" height="10" fill={color} />
        </g>
      );
    case 'gaming':
      return (
        <g transform="translate(110, 100)">
          <rect x="0" y="0" width="80" height="40" rx="20" stroke={color} strokeWidth="5" fill="none" />
          <circle cx="20" cy="20" r="10" fill={color} />
          <circle cx="60" cy="20" r="10" fill={color} />
          <circle cx="40" cy="20" r="5" fill={color} />
        </g>
      );
    case 'accessory':
      return (
        <g transform="translate(110, 100)">
          <circle cx="40" cy="10" r="30" stroke={color} strokeWidth="5" fill="none" />
          <line x1="40" y1="40" x2="40" y2="80" stroke={color} strokeWidth="5" />
          <line x1="15" y1="60" x2="65" y2="60" stroke={color} strokeWidth="5" />
        </g>
      );
    case 'smarthome':
      return (
        <g transform="translate(100, 80)">
          <path d="M50,10 L10,40 L20,40 L20,90 L80,90 L80,40 L90,40 Z" stroke={color} strokeWidth="5" fill="none" />
          <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="5" fill="none" />
        </g>
      );
    case 'wearable':
      return (
        <g transform="translate(110, 100)">
          <circle cx="40" cy="20" r="30" stroke={color} strokeWidth="5" fill="none" />
          <rect x="20" y="20" width="40" height="60" rx="10" stroke={color} strokeWidth="5" fill="none" />
        </g>
      );
    default:
      return (
        <g transform="translate(100, 100)">
          <rect x="25" y="0" width="50" height="70" rx="5" stroke={color} strokeWidth="5" fill="none" />
          <circle cx="50" cy="90" r="10" fill={color} />
        </g>
      );
  }
}

export default ProductPlaceholder; 