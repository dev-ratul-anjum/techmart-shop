import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
export const ShopContext = createContext();

// Sample mock products for testing
const mockProducts = [
  {
    id: 1,
    name: "Apple iPhone 11 | Ultimate Smartphone Experience",
    description: "Experience the ultimate smartphone with the Apple iPhone 11, featuring an advanced camera system and powerful performance.",
    price: 29999,
    originalPrice: 35999,
    image: "iphone_11.png",
    rating: 5,
    brand: "Apple",
    inStock: true,
    model: "iPhone 11",
    category: "Smartphone",
    network: "LTE, Wi-Fi 6, Bluetooth 5.0, NFC, GPS",
    display: "6.1-inch Liquid Retina HD",
    isNew: false
  },
  {
    id: 2,
    name: "Apple iPhone 16 | Built for Apple Intelligence",
    description: "The iPhone 16 is built for Apple Intelligence, with the most advanced features and powerful performance.",
    price: 89999,
    originalPrice: 99999,
    image: "iphone_16.jepg",
    rating: 5,
    brand: "Apple",
    inStock: true,
    model: "iPhone 16",
    category: "Smartphone",
    network: "5G, Wi-Fi 6E, Bluetooth 5.3, NFC, GPS",
    display: "6.7-inch Super Retina XDR",
    isNew: true
  },
  {
    id: 3,
    name: "Samsung Galaxy A56 | Awesome Intelligence",
    description: "Experience awesome intelligence with the Samsung Galaxy A56, featuring an advanced camera system and powerful performance.",
    price: 39999,
    originalPrice: 49999,
    image: "galaxy_a56_5g.png",
    rating: 4,
    brand: "Samsung",
    inStock: true,
    model: "A56",
    category: "Smartphone",
    network: "5G, Wi-Fi 6, Bluetooth 5.1, NFC, GPS",
    display: "6.5-inch Super AMOLED",
    isNew: true
  },
  {
    id: 4,
    name: "WGP Mini UPS – High-Capacity Router & ONU Backup",
    description: "Keep your internet connection alive during power outages with this high-capacity mini UPS for routers and ONUs.",
    price: 1350,
    originalPrice: 1500,
    image: "mini_ups.webp",
    rating: 4.5,
    brand: "WGP",
    inStock: true,
    model: "WGP103-5912-01",
    category: "Accessories",
    network: "N/A",
    display: "LED Indicators",
    isNew: false
  }
];

export const ShopProvider = ({ children }) => {
  // Initialize state with saved data from localStorage (if available)
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlistItems = localStorage.getItem('wishlistItems');
    return savedWishlistItems ? JSON.parse(savedWishlistItems) : [];
  });
  
  const [compareItems, setCompareItems] = useState(() => {
    const savedCompareItems = localStorage.getItem('compareItems');
    return savedCompareItems ? JSON.parse(savedCompareItems) : [];
  });

  // Save state changes to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);
  
  useEffect(() => {
    localStorage.setItem('compareItems', JSON.stringify(compareItems));
  }, [compareItems]);

  // Find a product by ID from mock data
  const findProductById = (productId) => {
    return mockProducts.find(product => product.id === productId);
  };

  // Cart functions
  const addToCart = (productId, quantity = 1) => {
    const product = findProductById(productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productId);
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Wishlist functions
  const addToWishlist = (productId) => {
    const product = findProductById(productId);
    if (!product) return;

    setWishlistItems(prevItems => {
      // Check if item already exists
      if (prevItems.some(item => item.id === productId)) {
        return prevItems; // Item already in wishlist
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Compare functions
  const addToCompare = (productId) => {
    const product = findProductById(productId);
    if (!product) return;

    setCompareItems(prevItems => {
      // Limit to 4 items maximum
      if (prevItems.some(item => item.id === productId)) {
        return prevItems; // Item already in compare
      } else {
        const newItems = [...prevItems, product];
        return newItems.slice(0, 4); // Limit to 4 items
      }
    });
  };

  const removeFromCompare = (productId) => {
    setCompareItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const isInCompare = (productId) => {
    return compareItems.some(item => item.id === productId);
  };

  // Utility functions
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // For testing purposes
  const getMockProducts = () => {
    return mockProducts;
  };

  return (
    <ShopContext.Provider value={{
      cartItems,
      wishlistItems,
      compareItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      addToCompare,
      removeFromCompare,
      isInCompare,
      formatPrice,
      calculateCartTotal,
      getMockProducts
    }}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook for using the context
export const useShop = () => useContext(ShopContext); 