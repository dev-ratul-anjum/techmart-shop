import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import ProductListView from './ProductListView';
import mockProducts from '../../data/products';
import './ProductsComponent.css';
import './OffCanvasFilter.css';
// Import all icons from utility to ensure they load correctly
import { commonIcons as Icons } from '../../utils/iconLoader';
import { BsGrid3X3GapFill, BsListUl } from 'react-icons/bs';
import { useShop } from '../../contexts/ShopContext';
// import { getAllProducts } from '../../utils/fetchApi';
import { getPaginatedProducts } from '../../utils/fetchApi';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Products = ({brand}) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const [activeCategory, setActiveCategory] = useState(brand);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeBrands, setActiveBrands] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [showInStock, setShowInStock] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProductsForCompare, setSelectedProductsForCompare] = useState([]);
  const [showPerPage, setShowPerPage] = useState(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayPriceRange, setDisplayPriceRange] = useState([0, 50000]); // For display purposes
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sliderValue, setSliderValue] = useState([0, 50000]);
  
  // Refs for price slider
  const sliderRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const startKnobRef = useRef(null);
  const endKnobRef = useRef(null);
  const trackFillRef = useRef(null);
  
  // Create subcategories object
  const subcategories = {
    Laptops: ['All Laptops', 'Premium Laptops', 'Budget Laptops', 'Gaming Laptops'],
    Smartphones: ['All Smartphones', 'Android Phones', 'iOS Phones'],
    Audio: ['All Audio', 'Headphones', 'Speakers', 'Earbuds'],
    TVs: ['All TVs', 'OLED TVs', 'QLED TVs', 'LED TVs'],
    Tablets: ['All Tablets', 'iOS Tablets', 'Android Tablets'],
    Accessories: ['All Accessories', 'Mice', 'Keyboards', 'Cables']
  };
  
  // Get unique brands from products
  const brands = [...new Set(products.map(product => product.brand))].sort();
  
  // Calculate min and max price
  const minPriceValue = useMemo(() => Math.min(...(products.length ? products.map(product => product.price) : [0])), [products]);
  const maxPriceValue = useMemo(() => Math.max(...(products.length ? products.map(product => product.price) : [200000])), [products]);
  
  // Update price range when products change
  useEffect(() => {
    if (products.length > 0) {
      const min = Math.floor(minPriceValue);
      const max = Math.ceil(maxPriceValue);
      setPriceRange({ min, max });
    }
  }, [products.length, minPriceValue, maxPriceValue]);
  
  // Price slider functionality with improved performance
  useEffect(() => {
    if (!sliderRef.current || !startKnobRef.current || !endKnobRef.current) return;
    
    const slider = sliderRef.current;
    const startKnob = startKnobRef.current;
    const endKnob = endKnobRef.current;
    
    // Calculate position based on price
    const calculatePosition = (price, min, max) => {
      return ((price - min) / (max - min)) * 100;
    };
    
    // Calculate price based on position
    const calculatePrice = (position, min, max) => {
      return Math.round(min + ((max - min) * position) / 100);
    };
    
    // Get min and max prices
    const minPrice = Math.min(...products.map(product => product.price)) || 0;
    const maxPrice = Math.max(...products.map(product => product.price)) || 2000;
    
    // Update knob positions based on price range
    const updateKnobPositions = () => {
      const startPos = calculatePosition(displayPriceRange[0], minPrice, maxPrice);
      const endPos = calculatePosition(displayPriceRange[1], minPrice, maxPrice);
      
      if (startKnob && endKnob) {
        startKnob.style.left = `${startPos}%`;
        endKnob.style.left = `${endPos}%`;
        
        // Update the colored track between knobs
        if (!trackFillRef.current) {
          const trackFill = document.createElement('div');
          trackFill.classList.add('track-fill');
          slider.appendChild(trackFill);
          trackFillRef.current = trackFill;
        }
        
        if (trackFillRef.current) {
          trackFillRef.current.style.left = `${startPos}%`;
          trackFillRef.current.style.width = `${endPos - startPos}%`;
        }
      }
    };
    
    // Set initial positions
    updateKnobPositions();
    
    // Variables for drag state
    let isDraggingStart = false;
    let isDraggingEnd = false;
    let lastUpdate = 0;
    const updateDelay = 10; // milliseconds to throttle updates (lowered for smoother experience)
    
    // Start dragging
    const handleStart = (e, isStart) => {
      e.preventDefault();
      if (isStart) {
        isDraggingStart = true;
      } else {
        isDraggingEnd = true;
      }
      
      document.body.classList.add('slider-dragging');
    };
    
    // Handle move - with throttling for smoother performance
    const handleMove = (clientX) => {
      if (!isDraggingStart && !isDraggingEnd) return;
      
      const now = Date.now();
      if (now - lastUpdate < updateDelay) return;
      lastUpdate = now;
      
      const sliderRect = slider.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      let position = ((clientX - sliderRect.left) / sliderWidth) * 100;
      position = Math.max(0, Math.min(position, 100));
      
      const newPrice = calculatePrice(position, minPrice, maxPrice);
      
      let newDisplayRange = [...displayPriceRange];
      
      if (isDraggingStart) {
        if (newPrice < displayPriceRange[1]) {
          newDisplayRange[0] = newPrice;
          startKnob.style.left = `${position}%`;
        }
      } else if (isDraggingEnd) {
        if (newPrice > displayPriceRange[0]) {
          newDisplayRange[1] = newPrice;
          endKnob.style.left = `${position}%`;
        }
      }
      
      if (newDisplayRange[0] !== displayPriceRange[0] || newDisplayRange[1] !== displayPriceRange[1]) {
        setDisplayPriceRange(newDisplayRange);
        
        // Update track fill
        if (trackFillRef.current) {
          const startPos = calculatePosition(newDisplayRange[0], minPrice, maxPrice);
          const endPos = calculatePosition(newDisplayRange[1], minPrice, maxPrice);
          trackFillRef.current.style.left = `${startPos}%`;
          trackFillRef.current.style.width = `${endPos - startPos}%`;
        }
      }
    };
    
    // Stop dragging
    const handleEnd = () => {
      if (isDraggingStart || isDraggingEnd) {
        // Only update the actual price range when dragging ends
        setPriceRange({ min: displayPriceRange[0], max: displayPriceRange[1] });
        setCurrentPage(1); // Reset to first page when filter changes
      }
      
      isDraggingStart = false;
      isDraggingEnd = false;
      document.body.classList.remove('slider-dragging');
    };
    
    // Mouse events
    const handleMouseDown = (e) => {
      if (e.target === startKnob) {
        handleStart(e, true);
      } else if (e.target === endKnob) {
        handleStart(e, false);
      }
    };
    
    const handleMouseMove = (e) => {
      handleMove(e.clientX);
    };
    
    // Touch events
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (e.target === startKnob) {
        handleStart(e, true);
      } else if (e.target === endKnob) {
        handleStart(e, false);
      }
    };
    
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      handleMove(touch.clientX);
    };
    
    // Add click directly on slider to jump to position
    const handleSliderClick = (e) => {
      if (e.target === startKnob || e.target === endKnob) return;
      
      const sliderRect = slider.getBoundingClientRect();
      const position = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
      const newPrice = calculatePrice(position, minPrice, maxPrice);
      
      // Determine which knob to move (closest one)
      const distToStart = Math.abs(newPrice - displayPriceRange[0]);
      const distToEnd = Math.abs(newPrice - displayPriceRange[1]);
      
      let newDisplayRange = [...displayPriceRange];
      
      if (distToStart <= distToEnd) {
        newDisplayRange[0] = newPrice;
      } else {
        newDisplayRange[1] = newPrice;
      }
      
      setDisplayPriceRange(newDisplayRange);
      setPriceRange({ min: displayPriceRange[0], max: displayPriceRange[1] });
      setCurrentPage(1);
      
      updateKnobPositions();
    };
    
    // Add event listeners
    startKnob.addEventListener('mousedown', handleMouseDown);
    endKnob.addEventListener('mousedown', handleMouseDown);
    startKnob.addEventListener('touchstart', handleTouchStart);
    endKnob.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('click', handleSliderClick);
    
    // Global events for move and end
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    
    // Cleanup
    return () => {
      startKnob.removeEventListener('mousedown', handleMouseDown);
      endKnob.removeEventListener('mousedown', handleMouseDown);
      startKnob.removeEventListener('touchstart', handleTouchStart);
      endKnob.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('click', handleSliderClick);
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
      
      // Remove any added elements
      if (trackFillRef.current && slider.contains(trackFillRef.current)) {
        slider.removeChild(trackFillRef.current);
        trackFillRef.current = null;
      }
    };
  }, [displayPriceRange, products]);
  
  // Handle input field change for price range
  const handlePriceRangeChange = (type, value) => {
    // Convert to number and handle empty string
    const numValue = value === '' ? (type === 'min' ? minPrice : maxPrice) : Number(value);
    
    // Clamp value between min and max
    let newValue = Math.max(0, Math.min(maxPrice, numValue));
    
    const newPriceRange = { ...priceRange };
    newPriceRange[type] = newValue;
    
    // Ensure min <= max
    if (type === 'min' && newPriceRange.min > newPriceRange.max) {
      newPriceRange.min = newPriceRange.max;
    } else if (type === 'max' && newPriceRange.max < newPriceRange.min) {
      newPriceRange.max = newPriceRange.min;
    }
    
    setPriceRange(newPriceRange);
  };
  
  // Apply price filter
  const applyPriceFilter = () => {
    setPriceRange({ min: sliderValue[0], max: sliderValue[1] });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Toggle mobile filter sidebar
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
    if (!isMobileFilterOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when filter is open
    } else {
      document.body.style.overflow = 'auto'; // Allow scrolling when filter is closed
    }
  };
  
  // Toggle filter section collapse
  const toggleFilterSection = (section) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section]
    });
  };

  // Format price
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (activeCategory) {
      if(activeCategory === 'All Products') {
        filtered = products;
      }else{
        filtered = filtered.filter(product => product.category.toLowerCase() === activeCategory.toLowerCase());
      }
    }
    
        // Filter by subcategory
        // if (activeSubcategory && activeSubcategory !== `All ${activeCategory}`) {
        //   filtered = filtered.filter(product => product.subcategory === activeSubcategory);
        // }
        
        // Filter by brands
        if (activeBrands.length > 0) {
          filtered = filtered.filter(product => activeBrands.includes(product.brand));
        }
        
        // // Filter by price range
        // filtered = filtered.filter(
        //   product => product.price >= priceRange[0] && product.price <= priceRange[1]
        // );
        
        // // Filter by availability
        // if (showInStock) {
        //   filtered = filtered.filter(product => product.inStock);
        // }
        
        // // Filter by search term
        // if (searchTerm) {
        //   const search = searchTerm.toLowerCase();
        //   filtered = filtered.filter(product => 
        //     product.name.toLowerCase().includes(search) || 
        //     product.description.toLowerCase().includes(search) ||
        //     product.brand.toLowerCase().includes(search)
        //   );
        // }

    return filtered;
  }, [products, activeCategory, activeSubcategory, activeBrands, priceRange, showInStock, searchTerm]);
  
  // Sort products
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Assuming id represents the newest products
        sorted.sort((a, b) => b.id - a.id);
        break;
    }
    
    return sorted;
  }, [filteredProducts, sortBy]);
  
  // Handlers
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSubcategory(`All ${category}`);
  };
  
  const handleSubcategoryChange = (subcategory) => {
    setActiveSubcategory(subcategory);
  };
  
  const handleBrandToggle = (brand) => {
    if (activeBrands.includes(brand)) {
      setActiveBrands(activeBrands.filter(b => b !== brand));
    } else {
      setActiveBrands([...activeBrands, brand]);
    }
  };
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleAvailability = () => {
    setShowInStock(!showInStock);
  };
  
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };
  
  const toggleProductCompare = (productId) => {
    if (selectedProductsForCompare.includes(productId)) {
      setSelectedProductsForCompare(
        selectedProductsForCompare.filter(id => id !== productId)
      );
    } else {
      if (selectedProductsForCompare.length < 4) {
        setSelectedProductsForCompare([...selectedProductsForCompare, productId]);
      }
    }
  };
  
  const resetFilters = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setActiveBrands([]);
    setPriceRange({ min: Math.floor(minPrice), max: Math.ceil(maxPrice) });
    setShowInStock(false);
    setSearchTerm('');
    setSortBy('newest');
  };

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filters = {
          page: currentPage,
          limit: showPerPage,
          category: activeCategory,
          subcategory: activeSubcategory,
          brands: activeBrands,
          priceMin: priceRange.min,
          priceMax: priceRange.max,
          sortBy: sortBy,
          inStock: showInStock,
          searchTerm: searchTerm
        };
        
        const data = await getPaginatedProducts(filters);
        setProducts(data.products);
        setTotalProducts(data.total);
        setTotalPages(Math.ceil(data.total / showPerPage));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
        
        // Fallback to mock data if API fails (for development)
        setProducts(mockProducts);
        setTotalProducts(mockProducts.length);
        setTotalPages(Math.ceil(mockProducts.length / showPerPage));
      }
    };
    
    fetchProducts();
  }, [
    currentPage, 
    showPerPage, 
    activeCategory, 
    activeSubcategory, 
    activeBrands, 
    sortBy, 
    showInStock, 
    searchTerm,
    priceRange // Added priceRange to the dependency array
  ]);

  // Update min and max inputs when slider changes
  const handleSliderChange = (value) => {
    setSliderValue(value);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  // Update slider when min input changes
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMinPrice(value);
      if (value <= sliderValue[1]) {
        setSliderValue([value, sliderValue[1]]);
      }
    }
  };

  // Update slider when max input changes
  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMaxPrice(value);
      if (value >= sliderValue[0]) {
        setSliderValue([sliderValue[0], value]);
      }
    }
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/"><Icons.FaHome /> Home</Link>
          <span className="separator">
            <Icons.FaChevronRight />
          </span>
          <span className="current">{brand}</span>
        </div>

        <h1 className="page-title">{brand}</h1>
        
        {/* Filter Overlay - Only visible on small screens when filter is open */}
        <div className={`filter-overlay ${isMobileFilterOpen ? 'active' : ''}`} onClick={toggleMobileFilter}></div>
        
        <div className="products-main-content">
          {/* Products Content */}
          <div className="products-content">
            {/* Toolbar */}
            <div className="products-toolbar">
              <div className="view-options">
                <button 
                  className={`view-option ${viewMode === 'grid' ? 'active' : ''}`} 
                  onClick={() => toggleViewMode('grid')}
                  title="Grid View"
                >
                  <Icons.FaTh />
                </button>
                <button 
                  className={`view-option ${viewMode === 'list' ? 'active' : ''}`} 
                  onClick={() => toggleViewMode('list')}
                  title="List View"
                >
                  <Icons.FaList />
                </button>
              </div>

              <div className="sort-options">
                <div className="sort-by">
                  <label>Sort By:</label>
                  <select value={sortBy} onChange={handleSortChange}>
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="name-a-z">Name: A to Z</option>
                    <option value="name-z-a">Name: Z to A</option>
                  </select>
                </div>

                <div className="show-per-page">
                  <label>Show:</label>
                  <select value={showPerPage} onChange={(e) => setShowPerPage(parseInt(e.target.value))}>
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="24">24</option>
                    <option value="32">32</option>
                  </select>
                </div>
              </div>
              
              {/* Mobile Filter Toggle Button - Only visible on small screens */}
              <button className="filter-toggle-btn" onClick={toggleMobileFilter}>
                <Icons.FaFilter /> Filter
              </button>
            </div>

            {/* Product Grid */}
            <div className={`product-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
              {sortedProducts.length > 0 ? (
                sortedProducts.slice(0, showPerPage).map(product => (
                  viewMode === 'list' ? (
                    <ProductListView key={product.id} product={product} />
                  ) : (
                    <ProductCard key={product.id} product={product} />
                  )
                ))
              ) : (
                <div className="no-products">
                  <p>No products match your selected filters.</p>
                  <button onClick={resetFilters}>Clear Filters</button>
                </div>
              )}
            </div>
          </div>
          
          {/* Filter Sidebar - Only shown when isMobileFilterOpen is true */}
          <div className={`filters-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}>
            <button className="filter-close-btn" onClick={toggleMobileFilter}>
              <Icons.FaTimes />
            </button>
            
            <div className="filter-header">
              <h3>Filter</h3>
              <button className="clear-btn" onClick={resetFilters}>Clear</button>
            </div>
            
            <div className="filter-sections-container">
              {/* Price Range Filter */}
              <div className="filter-section">
                <h4 
                  className={`filter-title ${collapsedSections['price'] ? 'collapsed' : ''}`} 
                  onClick={() => toggleFilterSection('price')}
                >
                  PRICE RANGE
                  <Icons.FaChevronDown className="collapse-icon" />
                </h4>
                {!collapsedSections['price'] && (
                  <div className="price-filter-container">
                    <div className="price-filter">
                      <div className="price-inputs">
                        <div className="price-input-group">
                          <span className="currency">৳</span>
                          <input
                            type="text"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="price-input"
                          />
                        </div>
                        <span className="price-separator">-</span>
                        <div className="price-input-group">
                          <span className="currency">৳</span>
                          <input
                            type="text"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="price-input"
                          />
                        </div>
                      </div>
                      
                      <div className="price-slider-container">
                        <Slider
                          range
                          min={0}
                          max={50000}
                          value={sliderValue}
                          onChange={handleSliderChange}
                        />
                      </div>
                      
                      <button 
                        className="price-filter-btn" 
                        onClick={applyPriceFilter}
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Availability Filter */}
              <div className="filter-section">
                <h4 
                  className={`filter-title ${collapsedSections['availability'] ? 'collapsed' : ''}`}
                  onClick={() => toggleFilterSection('availability')}
                >
                  AVAILABILITY
                  <Icons.FaChevronDown className="collapse-icon" />
                </h4>
                {!collapsedSections['availability'] && (
                  <div className="filter-section-content">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={showInStock} 
                        onChange={toggleAvailability} 
                      />
                      <span className="checkmark"></span>
                      In Stock
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      Pre Order
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      Up Coming
                    </label>
                  </div>
                )}
              </div>

              {/* Processor Filter */}
              <div className="filter-section">
                <h4 
                  className={`filter-title ${collapsedSections['processor'] ? 'collapsed' : ''}`}
                  onClick={() => toggleFilterSection('processor')}
                >
                  PROCESSOR
                  <Icons.FaChevronDown className="collapse-icon" />
                </h4>
                {!collapsedSections['processor'] && (
                  <div className="filter-section-content">
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      Intel
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      AMD
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      Apple
                    </label>
                  </div>
                )}
              </div>

              {/* RAM Filter */}
              <div className="filter-section">
                <h4 
                  className={`filter-title ${collapsedSections['ram'] ? 'collapsed' : ''}`}
                  onClick={() => toggleFilterSection('ram')}
                >
                  RAM
                  <Icons.FaChevronDown className="collapse-icon" />
                </h4>
                {!collapsedSections['ram'] && (
                  <div className="filter-section-content">
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      2 GB
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      4 GB
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      8 GB
                    </label>
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      16 GB
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 