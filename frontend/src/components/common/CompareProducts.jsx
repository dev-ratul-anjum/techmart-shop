import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useShop } from '../../contexts/ShopContext';
import './CompareProducts.css';

const CompareProducts = () => {
  const navigate = useNavigate();
  const { getMockProducts, addToCompare, compareItems } = useShop();
  
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [searchResults1, setSearchResults1] = useState([]);
  const [searchResults2, setSearchResults2] = useState([]);
  const [showResults1, setShowResults1] = useState(false);
  const [showResults2, setShowResults2] = useState(false);
  
  const products = getMockProducts();

  // Search functions
  const handleSearch = (term, setResults) => {
    if (term.trim() === '') {
      setResults([]);
      return;
    }
    
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.model.toLowerCase().includes(term.toLowerCase()) ||
      product.brand.toLowerCase().includes(term.toLowerCase())
    );
    
    setResults(filteredProducts.slice(0, 5)); // Limit to 5 results
  };

  useEffect(() => {
    handleSearch(searchTerm1, setSearchResults1);
  }, [searchTerm1]);

  useEffect(() => {
    handleSearch(searchTerm2, setSearchResults2);
  }, [searchTerm2]);

  const selectProduct = (productId, isFirstInput) => {
    addToCompare(productId);
    
    if (isFirstInput) {
      setSearchTerm1('');
      setShowResults1(false);
    } else {
      setSearchTerm2('');
      setShowResults2(false);
    }
  };

  const handleViewComparison = () => {
    if (compareItems.length >= 2) {
      navigate('/compare');
    } else {
      alert('Please select at least two products to compare');
    }
  };

  return (
    <div className="compare-products-widget">
      <div className="compare-container">
        <div className="compare-content">
          <div className="compare-left">
            <h2 className="compare-title">Compare Products</h2>
            <p className="compare-subtitle">Choose Two Products to Compare</p>
            {compareItems.length > 0 && (
              <div className="selected-products">
                <p>Selected products: {compareItems.length}</p>
              </div>
            )}
          </div>
          
          <div className="compare-right">
            <div className="compare-form">
              <div className="search-field">
                <input
                  type="text"
                  placeholder="Search for products to compare"
                  value={searchTerm1}
                  onChange={(e) => setSearchTerm1(e.target.value)}
                  onFocus={() => setShowResults1(true)}
                  onBlur={() => setShowResults1(false)}
                  className="compare-input"
                />
                <button type="button" className="search-icon">
                  <FaSearch />
                </button>
                {showResults1  && searchResults1.length > 0 && (
                  <div className="search-results">
                    {searchResults1.map(product => (
                      <div 
                        key={product.id} 
                        className="search-result-item"
                        onClick={() => selectProduct(product.id, true)}
                      >
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                          <div className="product-name">{product.name}</div>
                          <div className="product-price">{product.price}BDT</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="search-field">
                <input
                  type="text"
                  placeholder="Search for another product"
                  value={searchTerm2}
                  onChange={(e) => setSearchTerm2(e.target.value)}
                  onFocus={() => setShowResults2(true)}
                  onBlur={() => setShowResults2(false)}
                  className="compare-input"
                />
                <button type="button" className="search-icon">
                  <FaSearch />
                </button>
                {showResults2 && searchResults2.length > 0 && (
                  <div className="search-results">
                    {searchResults2.map(product => (
                      <div 
                        key={product.id} 
                        className="search-result-item"
                        onClick={() => selectProduct(product.id, false)}
                      >
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                          <div className="product-name">{product.name}</div>
                          <div className="product-price">{product.price}BDT</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                type="button" 
                className="view-comparison-btn"
                onClick={handleViewComparison}
                disabled={compareItems.length < 2}
              >
                View Comparison
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProducts; 