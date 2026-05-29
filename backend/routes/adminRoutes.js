const express = require('express');

const router = express.Router();

const { auth } = require('../middleware/authMiddleware');

router.get('/dashboard', auth, (req, res) => {

    res.json({
        success: true,
        message: 'Admin Dashboard',
        user: req.user 
    });
});

module.exports = router;