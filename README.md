# TechMart

A modern e-commerce platform for electronics and tech products built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Responsive Design**: Fully responsive UI that works across desktop, tablet, and mobile devices
- **Product Browsing**: Comprehensive product listings with filtering, sorting, and search functionality
- **Product Details**: Detailed product pages with specifications, images, and related products
- **Image Gallery**: Interactive product image gallery with zoom functionality
- **Category Navigation**: Intuitive category and subcategory navigation system
- **User Authentication**: Secure login and registration system
- **Shopping Cart**: Fully functional cart with product management
- **Checkout Process**: Streamlined checkout with address and payment information
- **User Profiles**: User account management and order history
- **Admin Dashboard**: Product, order, and user management for administrators

## Tech Stack

### Frontend
- React 19
- React Router v7
- Context API for state management
- RC Slider for range inputs
- React Icons
- CSS3 with responsive design principles
- Vite as the build tool

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- RESTful API architecture

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas URI)

### Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/techmart.git
   cd techmart
   ```

2. **Backend Setup**
   ```
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/techmart
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

3. **Frontend Setup**
   ```
   cd ../frontend
   npm install
   ```
   
   Create a `.env` file in the frontend directory with:
   ```
   VITE_APP_BACKEND_URL=http://localhost:5000
   ```

4. **Running the Application**

   For development:
   
   Backend:
   ```
   cd backend
   npm run dev
   ```
   
   Frontend:
   ```
   cd frontend
   npm run dev
   ```
   
   The frontend should be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Project Structure

```
techmart/
├── backend/               # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── utils/             # Utility functions
├── frontend/              # React frontend
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # React components
│       ├── contexts/      # Context providers
│       ├── data/          # Static data
│       ├── pages/         # Page components
│       ├── utils/         # Utility functions
│       └── App.jsx        # Main App component
└── README.md              # Project documentation
```

## API Endpoints

- **Authentication**
  - POST `/api/auth/register` - Register a new user
  - POST `/api/auth/login` - Login a user
  - GET `/api/auth/profile` - Get user profile

- **Products**
  - GET `/api/products` - Get all products with filtering options
  - GET `/api/products/:id` - Get a specific product
  - POST `/api/products` - Create a product (admin only)
  - PUT `/api/products/:id` - Update a product (admin only)
  - DELETE `/api/products/:id` - Delete a product (admin only)

- **Categories**
  - GET `/api/categories` - Get all categories
  - GET `/api/categories/:id/products` - Get products by category

- **Orders**
  - GET `/api/orders` - Get user orders
  - POST `/api/orders` - Create a new order
  - GET `/api/orders/:id` - Get order details

## Future Enhancements

- Product reviews and ratings
- Wishlist functionality
- Advanced payment gateway integration
- Email notifications
- Social media login
- Analytics dashboard
- Inventory management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- All the open-source libraries and tools used in this project
- The MERN stack community for documentation and tutorials
