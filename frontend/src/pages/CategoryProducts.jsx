import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductPlaceholder from '../components/common/ProductPlaceholder';
import './CategoryProducts.css';
import ProductsComponent from '../components/products/ProductsComponent';

const CategoryProducts = () => {
  window.scrollTo(0, 0); // Scroll to top on page load

  const { category } = useParams();
    return (
      <ProductsComponent brand={category}/>
    );
};

// // Mock data for products - in a real app, this would come from an API
// const allProducts = [
//   {
//     id: 1,
//     name: 'Apple iPhone 11 | Ultimate Smartphone Experience',
//     price: 29999,
//     originalPrice: 32999,
//     discount: 3000,
//     discountPercentage: 9,
//     category: 'Smart Phone',
//     brand: 'Apple',
//     rating: 5,
//     isNew: true,
//     isHot: false,
//     inStock: true,
//     model: 'iPhone 11'
//   },
//   {
//     id: 2,
//     name: 'Apple iPhone 16 | Built for Apple Intelligence',
//     price: 89999,
//     originalPrice: 92999,
//     discount: 3000,
//     discountPercentage: 3,
//     category: 'Smart Phone',
//     brand: 'Apple',
//     rating: 5,
//     isNew: true,
//     isHot: false,
//     inStock: true,
//     model: 'iPhone 16'
//   },
//   {
//     id: 3,
//     name: 'Apple iPhone 16e (2025) | Built for Apple Intelligence',
//     price: 79999,
//     originalPrice: 84999,
//     discount: 5000,
//     discountPercentage: 6,
//     category: 'Smart Phone',
//     brand: 'Apple',
//     rating: 5,
//     isNew: true,
//     isHot: true,
//     inStock: true,
//     model: 'iPhone 16e'
//   },
//   {
//     id: 4,
//     name: 'Samsung Galaxy S24 Ultra | 200MP Camera',
//     price: 149999,
//     originalPrice: 159999,
//     discount: 10000,
//     discountPercentage: 6,
//     category: 'Smart Phone',
//     brand: 'Samsung',
//     rating: 4.5,
//     isNew: true,
//     isHot: false,
//     inStock: true,
//     model: 'Galaxy S24 Ultra'
//   },
//   {
//     id: 5,
//     name: 'Samsung Galaxy Z Fold 5 | Foldable Display',
//     price: 189999,
//     originalPrice: 199999,
//     discount: 10000,
//     discountPercentage: 5,
//     category: 'Smart Phone',
//     brand: 'Samsung',
//     rating: 4.5,
//     isNew: false,
//     isHot: false,
//     inStock: true,
//     model: 'Galaxy Z Fold 5'
//   },
//   {
//     id: 6,
//     name: 'Google Pixel 8 Pro | AI-Powered Camera',
//     price: 89999,
//     originalPrice: 94999,
//     discount: 5000,
//     discountPercentage: 5,
//     category: 'Smart Phone',
//     brand: 'Google',
//     rating: 4.5,
//     isNew: false,
//     isHot: true,
//     inStock: true,
//     model: 'Pixel 8 Pro'
//   }
// ];

// // Mock data for price ranges
// const priceRanges = [
//   { min: 0, max: 29999 },
//   { min: 30000, max: 59999 },
//   { min: 60000, max: 89999 },
//   { min: 90000, max: Infinity }
// ];

// // Mock data for brands in this category
// const brands = [
//   { id: 1, name: 'Apple', count: 3 },
//   { id: 2, name: 'Samsung', count: 2 },
//   { id: 3, name: 'Google', count: 1 }
// ];

// const CategoryProducts = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(100000);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [inStockOnly, setInStockOnly] = useState(false);
//   const [sortOption, setSortOption] = useState('default');
//   const [viewMode, setViewMode] = useState('grid');
//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [priceFilter, setPriceFilter] = useState([minPrice, maxPrice]);
//   const [showFilters, setShowFilters] = useState(false);

//   // Initialize products based on category
//   useEffect(() => {
//     // In a real app, this would be an API call
//     const categoryProducts = allProducts.filter(product => 
//       product.category.toLowerCase() === (category || '').toLowerCase()
//     );
//     setProducts(categoryProducts);
//     setFilteredProducts(categoryProducts);
//   }, [category]);

//   // Apply filters when filter states change
//   useEffect(() => {
//     let result = [...products];
    
//     // Filter by price
//     result = result.filter(product => 
//       product.price >= priceFilter[0] && product.price <= priceFilter[1]
//     );
    
//     // Filter by brand
//     if (selectedBrands.length > 0) {
//       result = result.filter(product => 
//         selectedBrands.includes(product.brand)
//       );
//     }
    
//     // Filter by availability
//     if (inStockOnly) {
//       result = result.filter(product => product.inStock);
//     }
    
//     // Apply sorting
//     switch (sortOption) {
//       case 'price_asc':
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case 'price_desc':
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case 'name_asc':
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case 'name_desc':
//         result.sort((a, b) => b.name.localeCompare(a.name));
//         break;
//       default:
//         // Default sorting (newest first, or featured)
//         break;
//     }
    
//     setFilteredProducts(result);
//   }, [products, priceFilter, selectedBrands, inStockOnly, sortOption]);

//   // Handle brand selection
//   const handleBrandChange = (brand) => {
//     if (selectedBrands.includes(brand)) {
//       setSelectedBrands(selectedBrands.filter(b => b !== brand));
//     } else {
//       setSelectedBrands([...selectedBrands, brand]);
//     }
//   };

//   // Handle price range input
//   const handlePriceChange = (e, index) => {
//     const value = parseInt(e.target.value, 10) || 0;
//     const newPriceFilter = [...priceFilter];
//     newPriceFilter[index] = value;
    
//     // Ensure min <= max
//     if (index === 0 && value > priceFilter[1]) {
//       newPriceFilter[1] = value;
//     } else if (index === 1 && value < priceFilter[0]) {
//       newPriceFilter[0] = value;
//     }
    
//     setPriceFilter(newPriceFilter);
//   };

//   // Handle clear filters
//   const handleClearFilters = () => {
//     setSelectedBrands([]);
//     setInStockOnly(false);
//     setPriceFilter([minPrice, maxPrice]);
//   };

//   // Format price with commas
//   const formatPrice = (price) => {
//     return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   // Toggle mobile filters
//   const toggleFilters = () => {
//     setShowFilters(!showFilters);
//   };

//   return (
//     <div className="category-page">
//       <div className="breadcrumb">
//         <Link to="/">Home</Link> → <span>{category || 'Products'}</span>
//       </div>
      
//       <h1 className="category-title">{category || 'Products'}</h1>
      
//       <div className="category-content">
//         {/* Mobile filter toggle */}
//         <button className="filter-toggle" onClick={toggleFilters}>
//           {showFilters ? 'Hide Filters' : 'Show Filters'} 
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//           </svg>
//         </button>
        
//         {/* Sidebar with filters */}
//         <aside className={`category-sidebar ${showFilters ? 'show' : ''}`}>
//           <div className="filter-section">
//             <div className="filter-header">
//               <h2>Filter</h2>
//               <button className="clear-btn" onClick={handleClearFilters}>Clear</button>
//             </div>
            
//             <div className="filter-group">
//               <h3 className="filter-title">PRICE</h3>
//               <div className="price-slider">
//                 <div className="price-inputs">
//                   <input 
//                     type="number" 
//                     value={priceFilter[0]} 
//                     onChange={(e) => handlePriceChange(e, 0)}
//                     placeholder="Min"
//                   />
//                   <span>-</span>
//                   <input 
//                     type="number" 
//                     value={priceFilter[1]} 
//                     onChange={(e) => handlePriceChange(e, 1)}
//                     placeholder="Max"
//                   />
//                   <span>BDT</span>
//                 </div>
//                 <div className="price-range">
//                   <input 
//                     type="range"
//                     min={minPrice}
//                     max={maxPrice}
//                     value={priceFilter[0]}
//                     onChange={(e) => handlePriceChange(e, 0)}
//                     className="price-slider-input"
//                   />
//                   <input 
//                     type="range"
//                     min={minPrice}
//                     max={maxPrice}
//                     value={priceFilter[1]}
//                     onChange={(e) => handlePriceChange(e, 1)}
//                     className="price-slider-input"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="filter-group">
//               <h3 className="filter-title">AVAILABILITY</h3>
//               <div className="filter-option">
//                 <label className="checkbox-label">
//                   <input 
//                     type="checkbox" 
//                     checked={inStockOnly} 
//                     onChange={() => setInStockOnly(!inStockOnly)}
//                   />
//                   <span className="checkbox-custom"></span>
//                   In Stock
//                 </label>
//               </div>
//             </div>
            
//             <div className="filter-group">
//               <h3 className="filter-title">BRANDS</h3>
//               {brands.map(brand => (
//                 <div className="filter-option" key={brand.id}>
//                   <label className="checkbox-label">
//                     <input 
//                       type="checkbox" 
//                       checked={selectedBrands.includes(brand.name)} 
//                       onChange={() => handleBrandChange(brand.name)}
//                     />
//                     <span className="checkbox-custom"></span>
//                     {brand.name} ({brand.count})
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </aside>
        
//         {/* Product list */}
//         <div className="product-list-container">
//           <div className="product-list-header">
//             <div className="view-options">
//               <button 
//                 className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                 onClick={() => setViewMode('grid')}
//                 title="Grid View"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <rect x="3" y="3" width="7" height="7"></rect>
//                   <rect x="14" y="3" width="7" height="7"></rect>
//                   <rect x="14" y="14" width="7" height="7"></rect>
//                   <rect x="3" y="14" width="7" height="7"></rect>
//                 </svg>
//               </button>
//               <button 
//                 className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
//                 onClick={() => setViewMode('list')}
//                 title="List View"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <line x1="8" y1="6" x2="21" y2="6"></line>
//                   <line x1="8" y1="12" x2="21" y2="12"></line>
//                   <line x1="8" y1="18" x2="21" y2="18"></line>
//                   <line x1="3" y1="6" x2="3.01" y2="6"></line>
//                   <line x1="3" y1="12" x2="3.01" y2="12"></line>
//                   <line x1="3" y1="18" x2="3.01" y2="18"></line>
//                 </svg>
//               </button>
              
//               <button className="compare-btn">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <polyline points="18 8 22 12 18 16"></polyline>
//                   <polyline points="6 8 2 12 6 16"></polyline>
//                   <line x1="2" y1="12" x2="22" y2="12"></line>
//                 </svg>
//                 Product Compare
//               </button>
//             </div>
            
//             <div className="sort-options">
//               <div className="sort-dropdown">
//                 <label>Sort By: </label>
//                 <select 
//                   value={sortOption} 
//                   onChange={(e) => setSortOption(e.target.value)}
//                 >
//                   <option value="default">Default</option>
//                   <option value="price_asc">Price (Low to High)</option>
//                   <option value="price_desc">Price (High to Low)</option>
//                   <option value="name_asc">Name (A to Z)</option>
//                   <option value="name_desc">Name (Z to A)</option>
//                 </select>
//               </div>
              
//               <div className="show-dropdown">
//                 <label>Show: </label>
//                 <select 
//                   value={itemsPerPage} 
//                   onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
//                 >
//                   <option value="12">12</option>
//                   <option value="24">24</option>
//                   <option value="36">36</option>
//                   <option value="48">48</option>
//                 </select>
//               </div>
//             </div>
//           </div>
          
//           <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map(product => (
//                 <div className="product-card" key={product.id}>
//                   <div className="product-badges">
//                     {product.isNew && <span className="badge new-badge">NEW</span>}
//                     {product.isHot && <span className="badge hot-badge">HOT</span>}
//                   </div>
                  
//                   <div className="product-image">
//                     <Link to={`/product/${product.id}`}>
//                       <ProductPlaceholder category="Electronics" width="100%" height="100%" />
//                     </Link>
//                   </div>
                  
//                   <div className="product-info">
//                     <div className="product-brand">{product.brand}</div>
                    
//                     <div className="product-model">{product.model}</div>
                    
//                     <h3 className="product-name">
//                       <Link to={`/product/${product.id}`}>{product.name}</Link>
//                     </h3>
                    
//                     <div className="product-rating">
//                       {[...Array(5)].map((_, i) => (
//                         <span key={i} className={`star ${i < product.rating ? 'filled' : ''}`}>
//                           ★
//                         </span>
//                       ))}
//                     </div>
                    
//                     <div className="product-price">
//                       <span className="current-price">{formatPrice(product.price)}৳</span>
//                       {product.discount > 0 && (
//                         <span className="original-price">{formatPrice(product.originalPrice)}৳</span>
//                       )}
//                     </div>
                    
//                     <div className="product-actions">
//                       <button className="add-to-cart-btn">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <circle cx="9" cy="21" r="1"></circle>
//                           <circle cx="20" cy="21" r="1"></circle>
//                           <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
//                         </svg>
//                         ADD TO CART
//                       </button>
                      
//                       <button className="wishlist-btn" title="Add to Wishlist">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
//                         </svg>
//                       </button>
                      
//                       <button className="compare-btn" title="Compare">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <polyline points="18 8 22 12 18 16"></polyline>
//                           <polyline points="6 8 2 12 6 16"></polyline>
//                           <line x1="2" y1="12" x2="22" y2="12"></line>
//                         </svg>
//                       </button>
                      
//                       <button className="question-btn" title="Ask a Question">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <circle cx="12" cy="12" r="10"></circle>
//                           <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
//                           <line x1="12" y1="17" x2="12.01" y2="17"></line>
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="no-products">
//                 <p>No products found matching your criteria.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default CategoryProducts; 