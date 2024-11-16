// authRoutes.js - Registracijos ir prisijungimo maršrutai
// Kelias: HomeServiceAPI/routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();  // Sukuriame router objektą
const User = require('../models/user');

// Registracijos maršrutas
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Patikriname, ar el. paštas jau yra
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Užšifruojame slaptažodį
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Sukuriame naują naudotoją
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Prisijungimo maršrutas
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;  // Eksportuojame router
