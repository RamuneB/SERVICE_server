const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Patikrinkite, ar teisingas kelias į modelį

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: `Error registering user: ${error.message}` });
    }
});

module.exports = router;
