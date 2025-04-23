import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import './CategoryNav.css';

// Updated category data to match the reference images
const categoryData = [
    {
        id: 1,
        name: 'Desktop',
        path: '/category/desktop',
        subcategories: [
            { id: 101, name: 'All Desktop', path: '/category/desktop/all-desktop' },
            { id: 102, name: 'Gaming Desktop', path: '/category/desktop/gaming-desktop' },
            { id: 103, name: 'Brand PC', path: '/category/desktop/brand-pc' },
            { id: 104, name: 'All In One PC', path: '/category/desktop/all-in-one' },
        ]
    },
    {
        id: 2,
        name: 'Laptop',
        path: '/category/laptop',
        subcategories: [
            { id: 201, name: 'All Laptop', path: '/category/laptop/all-laptop' },
            { id: 202, name: 'Gaming Laptop', path: '/category/laptop/gaming-laptop' },
            { id: 203, name: 'Premium Ultrabook', path: '/category/laptop/premium-ultrabook' },
            { id: 204, name: 'Laptop Bag', path: '/category/laptop/laptop-bag' },
            { id: 205, name: 'Laptop Accessories', path: '/category/laptop/laptop-accessories' },
            { id: 206, name: 'Show All Laptop', path: '/category/laptop/show-all' },
        ]
    },
    {
        id: 3,
        name: 'Component',
        path: '/category/component',
        subcategories: [
            { id: 301, name: 'Processor', path: '/category/component/processor' },
            { id: 302, name: 'Motherboard', path: '/category/component/motherboard' },
            { id: 303, name: 'RAM', path: '/category/component/ram' },
            { id: 304, name: 'Graphics Card', path: '/category/component/graphics-card' },
            { id: 305, name: 'Storage', path: '/category/component/storage' },
            { id: 306, name: 'Power Supply', path: '/category/component/power-supply' },
            { id: 307, name: 'CPU Cooler', path: '/category/component/cpu-cooler' },
            { id: 308, name: 'Casing', path: '/category/component/casing' },
        ]
    },
    {
        id: 4,
        name: 'Monitor',
        path: '/category/monitor',
        subcategories: [
            { id: 401, name: 'Gaming Monitor', path: '/category/monitor/gaming-monitor' },
            { id: 402, name: 'Professional Monitor', path: '/category/monitor/professional-monitor' },
            { id: 403, name: 'Curved Monitor', path: '/category/monitor/curved-monitor' },
            { id: 404, name: 'Budget Monitor', path: '/category/monitor/budget-monitor' },
        ]
    },
    {
        id: 5,
        name: 'UPS',
        path: '/category/ups',
        subcategories: [
            { id: 501, name: 'Online UPS', path: '/category/ups/online-ups' },
            { id: 502, name: 'Offline UPS', path: '/category/ups/offline-ups' },
            { id: 503, name: 'Mini UPS', path: '/category/ups/mini-ups' },
            { id: 504, name: 'UPS Battery', path: '/category/ups/ups-battery' },
            { id: 505, name: 'Voltage Stabilizer', path: '/category/ups/voltage-stabilizer' },
            { id: 506, name: 'IPS', path: '/category/ups/ips' },
            { id: 507, name: 'Show All UPS', path: '/category/ups/show-all' },
        ]
    },
    {
        id: 6,
        name: 'Phone',
        path: '/category/phone',
        subcategories: [
            { id: 601, name: 'Smartphones', path: '/category/phone/smartphones' },
            { id: 602, name: 'Feature Phones', path: '/category/phone/feature-phones' },
            { id: 603, name: 'Phone Accessories', path: '/category/phone/accessories' },
        ]
    },
    {
        id: 7,
        name: 'Tablet',
        path: '/category/tablet',
        subcategories: [
            { id: 701, name: 'Android Tablets', path: '/category/tablet/android' },
            { id: 702, name: 'iPads', path: '/category/tablet/ipad' },
            { id: 703, name: 'Tablet Accessories', path: '/category/tablet/accessories' },
        ]
    },
    {
        id: 8,
        name: 'Office Equipment',
        path: '/category/office-equipment',
        subcategories: [
            { id: 801, name: 'Printers', path: '/category/office-equipment/printers' },
            { id: 802, name: 'Scanners', path: '/category/office-equipment/scanners' },
            { id: 803, name: 'Projectors', path: '/category/office-equipment/projectors' },
        ]
    },
    {
        id: 9,
        name: 'Camera',
        path: '/category/camera',
        subcategories: [
            { id: 901, name: 'DSLR Cameras', path: '/category/camera/dslr' },
            { id: 902, name: 'Mirrorless Cameras', path: '/category/camera/mirrorless' },
            { id: 903, name: 'Action Cameras', path: '/category/camera/action' },
            { id: 904, name: 'Camera Accessories', path: '/category/camera/accessories' },
        ]
    },
    {
        id: 10,
        name: 'Security',
        path: '/category/security',
        subcategories: [
            { id: 1001, name: 'CCTV Cameras', path: '/category/security/cctv' },
            { id: 1002, name: 'Door Locks', path: '/category/security/door-locks' },
            { id: 1003, name: 'Safes', path: '/category/security/safes' },
        ]
    },
    {
        id: 11,
        name: 'Networking',
        path: '/category/networking',
        subcategories: [
            { id: 1101, name: 'Routers', path: '/category/networking/routers' },
            { id: 1102, name: 'Network Switches', path: '/category/networking/switches' },
            { id: 1103, name: 'Network Cables', path: '/category/networking/cables' },
        ]
    },
    {
        id: 12,
        name: 'Software',
        path: '/category/software',
        subcategories: [
            { id: 1201, name: 'Operating Systems', path: '/category/software/os' },
            { id: 1202, name: 'Office Software', path: '/category/software/office' },
            { id: 1203, name: 'Antivirus', path: '/category/software/antivirus' },
        ]
    }
];

const CategoryNav = () => {
    const [openCategory, setOpenCategory] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [dropdownPosition, setDropdownPosition] = useState(null);
    const navRef = useRef(null);
    const categoryRefs = useRef({});
    const dropdownRef = useRef(null);
    const hoverTimeoutRef = useRef(null);
    const isHoveringRef = useRef(false);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);
            if (newWidth > 767 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
            
            // Reset dropdown position on resize
            if (openCategory) {
                updateDropdownPosition(openCategory);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, [isMobileMenuOpen, openCategory]);

    const updateDropdownPosition = useCallback((categoryId) => {
        const categoryElement = categoryRefs.current[categoryId];
        if (!categoryElement) return;

        const rect = categoryElement.getBoundingClientRect();
        const navRect = navRef.current ? navRef.current.getBoundingClientRect() : { bottom: 0 };
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        setDropdownPosition({
            categoryId,
            top: rect.bottom + scrollTop,
            left: rect.left,
            width: Math.max(200, rect.width),
            isRightAligned: window.innerWidth - rect.right < 200,
            navBottom: navRect.bottom
        });
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-nav') && !event.target.closest('.mobile-menu-toggle')) {
                setIsMobileMenuOpen(false);
            }
            
            // Close dropdown if clicking outside
            if (openCategory && 
                !event.target.closest('.category-item') && 
                !event.target.closest('.subcategory-dropdown')) {
                setOpenCategory(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        
        const handleScroll = () => {
            if (openCategory) {
                updateDropdownPosition(openCategory);
            }
        };
        
        document.addEventListener('scroll', handleScroll);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('scroll', handleScroll);
        };
    }, [isMobileMenuOpen, openCategory, updateDropdownPosition]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileCategoryClick = (categoryId) => {
        if (openCategory === categoryId) {
            setOpenCategory(null);
        } else {
            setOpenCategory(categoryId);
        }
    };

    const handleMouseEnter = (categoryId) => {
        if (windowWidth > 767) {
            // Clear any existing timeout
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
            }
            
            isHoveringRef.current = true;
            setOpenCategory(categoryId);
            updateDropdownPosition(categoryId);
        }
    };

    const handleMouseLeave = () => {
        if (windowWidth > 767) {
            isHoveringRef.current = false;
            
            // Use a longer delay before closing to avoid accidental closures
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
            
            hoverTimeoutRef.current = setTimeout(() => {
                if (!isHoveringRef.current) {
                    setOpenCategory(null);
                }
                hoverTimeoutRef.current = null;
            }, 300);
        }
    };

    const handleDropdownMouseEnter = () => {
        if (windowWidth > 767) {
            isHoveringRef.current = true;
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
            }
        }
    };

    const handleDropdownMouseLeave = () => {
        if (windowWidth > 767) {
            isHoveringRef.current = false;
            
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
            
            hoverTimeoutRef.current = setTimeout(() => {
                if (!isHoveringRef.current) {
                    setOpenCategory(null);
                }
                hoverTimeoutRef.current = null;
            }, 300);
        }
    };

    const handleSubcategoryClick = () => {
        // Close dropdown when subcategory is clicked
        setOpenCategory(null);
    };

    // Render the subcategories for a category using a portal
    const renderDesktopSubcategories = () => {
        if (!openCategory || !dropdownPosition) return null;
        
        const category = categoryData.find(cat => cat.id === openCategory);
        if (!category || !category.subcategories.length) return null;
        
        const dropdownStyle = {
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: dropdownPosition.isRightAligned ? 'auto' : `${dropdownPosition.left}px`,
            right: dropdownPosition.isRightAligned ? '0' : 'auto',
            width: `${dropdownPosition.width}px`,
            zIndex: 9999
        };

        return createPortal(
            <div 
                className="subcategory-dropdown"
                style={dropdownStyle}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
                ref={dropdownRef}
            >
                <ul className="subcategory-list">
                    {category.subcategories.map((subcategory) => (
                        <li key={subcategory.id} className="subcategory-item">
                            <Link 
                                to={subcategory.path} 
                                className="subcategory-link"
                                onClick={handleSubcategoryClick}
                            >
                                {subcategory.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>,
            document.body
        );
    };

    return (
        <nav className="category-nav" ref={navRef}>
            <div className="category-container">
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <div className="menu-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                        <span>Categories</span>
                    </div>
                    <svg className={`dropdown-arrow ${isMobileMenuOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <div className="category-scroll-container">
                    <ul className="category-list desktop-nav">
                        {categoryData.map((category) => (
                            <li 
                                key={category.id} 
                                className={`category-item ${openCategory === category.id ? 'active' : ''}`}
                                onMouseEnter={() => handleMouseEnter(category.id)}
                                onMouseLeave={handleMouseLeave}
                                ref={el => { categoryRefs.current[category.id] = el; }}
                            >
                                <Link to={category.path} className="category-link">
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Render the dropdown using a portal */}
                {renderDesktopSubcategories()}

                {/* Mobile Navigation */}
                {isMobileMenuOpen && <div className="mobile-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>}
                <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-header">
                        <h3>Categories</h3>
                        <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>×</button>
                    </div>
                    <ul className="mobile-category-list">
                        {categoryData.map((category) => (
                            <li key={category.id} className="mobile-category-item">
                                <div 
                                    className="mobile-category-header"
                                    onClick={() => handleMobileCategoryClick(category.id)}
                                >
                                    <Link to={category.path} className="mobile-category-link" onClick={(e) => {e.stopPropagation();setIsMobileMenuOpen(false);}}>
                                        {category.name}
                                    </Link>
                                    {category.subcategories.length > 0 && (
                                        <span className="mobile-dropdown-icon">
                                            {openCategory === category.id ? '−' : '+'}
                                        </span>
                                    )}
                                </div>
                                {openCategory === category.id && category.subcategories.length > 0 && (
                                    <ul className="mobile-subcategory-list">
                                        {category.subcategories.map((subcategory) => (
                                            <li key={subcategory.id} className="mobile-subcategory-item">
                                                <Link to={subcategory.path} className="mobile-subcategory-link" onClick={() => {setIsMobileMenuOpen(false);}}>
                                                    {subcategory.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default CategoryNav; 