require('dotenv').config();

const express = require('express');

const cors = require('cors');

const path = require('path');

const app = express();

const db = require('./config/db');



// DB Connection
db();

// Middleware
app.use(express.json());
app.use(cors());

// AOI Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const shopRoutes = require('./routes/shopRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shop', shopRoutes);


// Serve frontend dist folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// React routing support - catch all non-API routes
app.get('/{*splat}', (req, res) => {

    res.sendFile(
        path.join(__dirname, '../frontend/dist/index.html')
    );

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});