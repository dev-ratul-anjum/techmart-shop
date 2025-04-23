import React from 'react';
import ProductsComponent from '../components/products/ProductsComponent';

const Products = ({brand}) => {
  window.scrollTo(0, 0); // Scroll to top on page load

  return <ProductsComponent brand={brand}/>;
};

export default Products; 