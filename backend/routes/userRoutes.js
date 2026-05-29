const express = require('express');

const router = express.Router();

const { auth } = require('../middleware/authMiddleware');

router.get('/dashboard', auth, (req, res) => {
    res.json({
        success: true,
        message: 'User Dashboard',
        user: req.user
    });
});

// verify token validity
router.get('/verify', auth, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

module.exports = router;