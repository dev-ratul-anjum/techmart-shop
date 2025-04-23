import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './contexts/ShopContext';
import { CartProvider } from './contexts/CartContext';
import Footer from './components/layouts/Footer';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import CategoryProducts from './pages/CategoryProducts';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import MainHeader from './components/layouts/MainHeader';
const BACKEND_URL = import.meta.VITE_APP_BACKEND_URL;

const App = () => {
    const [user, setUser] = useState(null);
    useEffect(()=>{
        // Check if the user is logged in
        const token = localStorage.getItem('techmart-token');
        if (token) {
            fetch(`${BACKEND_URL}/api/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                credentials: 'include',
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
               setUser(data.user);
            })
            .catch(error => {
                setUser(null);
            });
        }
    }, [])
    return (
        <ShopProvider>
            <CartProvider>
                <Router>
                    <MainHeader user={user}/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {!user && <Route path="/login" element={<LoginPage setUser={setUser} />} />}
                        <Route path="/wishlist" element={<Wishlist user={user}/> } />
                        <Route path="/compare" element={<Compare />} />
                        <Route path="/cart" element={ <Cart user={user}/> } />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/products" element={<Products brand="All Products" />} />
                        <Route path="/category/:category" element={<CategoryProducts/>} />
                        <Route path="/product/:productId" element={<ProductDetail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </Router>
            </CartProvider>
        </ShopProvider>
    );
};

export default App;
