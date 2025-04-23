import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import './FeaturedProducts.css';
// import { getAllProducts } from '../../utils/fetchApi';
import { getPaginatedProducts } from '../../utils/fetchApi';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // const data = await getAllProducts();
        const data = await getPaginatedProducts();

        setProducts(data.products);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header-container">
          <h2>Featured Products</h2>
          <p>Check & Get Your Desired Product!</p>
        </div>
        
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-item" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="see-more-container">
          <Link to="/products" className="see-more-btn">
            See More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 