const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const userRoutes = require('./routes/usersRoute');
const productRoutes = require('./routes/productsRoute');

require('./config/passport');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
}));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Common Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await connectDB();
});