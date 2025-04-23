const BACKEND_URL = 'https://techmart-api.onrender.com';

// Add new function to fetch paginated products with filters
export const getPaginatedProducts = async (filters = {}) => {
  // Destructure filters with defaults
  const {
    page = 1,
    limit = 8,
    category = null,
    subcategory = null,
    brands = [],
    priceMin = 0,
    priceMax = 1000000,
    sortBy = 'newest',
    inStock = false,
    searchTerm = ''
  } = filters;



  // Build query parameters
  let queryParams = new URLSearchParams();

  queryParams.append('page', page);
  queryParams.append('limit', limit);
  
  if (category && category !== 'All Products') {
    queryParams.append('category', category);
  }
  
  if (subcategory && subcategory !== `All ${category}`) {
    queryParams.append('subcategory', subcategory);
  }
  
  if (brands.length > 0) {
    brands.forEach(brand => queryParams.append('brands', brand));
  }
  
  queryParams.append('priceMin', priceMin);
  queryParams.append('priceMax', priceMax);
  queryParams.append('sortBy', sortBy);
  
  if (inStock) {
    queryParams.append('inStock', inStock);
  }
  
  if (searchTerm) {
    queryParams.append('search', searchTerm);
  }

  try {
    

    const response = await fetch(`${BACKEND_URL}/api/products?${queryParams.toString()}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // if (!response.ok) {
    //   throw new Error(`Error fetching products: ${response.statusText}`);
    // }

    const data = await response.json();

    return data;
  } catch (error) {

    console.error('Error in getPaginatedProducts:', error);
    throw error;
  }
}; 