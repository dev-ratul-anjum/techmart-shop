import React from 'react';
import WishlistComponent from '../components/account/Wishlist';

const Wishlist = () => {
  window.scrollTo(0, 0); // Scroll to top on page load

  return (
    <main>
      <WishlistComponent />
    </main>
  );
};

export default Wishlist;
