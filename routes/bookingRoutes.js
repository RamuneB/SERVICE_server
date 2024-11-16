const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route example
router.get('/bookings', authenticateToken, (req, res) => {
    // Čia gali būti kodas gauti visus booking'us
    res.json({ message: 'This is a protected bookings route' });
});

module.exports = router;
