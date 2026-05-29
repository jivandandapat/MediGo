const express = require('express');

const router = express.Router();

const { auth } = require('../middleware/authMiddleware');

router.get('/dashboard', auth, (req, res) => {

    res.json({
        success: true,
        message: 'Shop Owner Dashboard',
        user: req.user
    });

});

module.exports = router;