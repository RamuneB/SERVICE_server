import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = express.Router();

// Registration route
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Patikriname, ar pateikti visi būtini duomenys
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Patikriname, ar el. paštas jau naudojamas
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Patikriname slaptažodžio stiprumą
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Slaptažodžio šifravimas
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Sukuriame naują vartotoją su užšifruotu slaptažodžiu
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Atsakymas po sėkmingos registracijos
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);

    // Detalesnis klaidų apdorojimas
    if (error instanceof Error) {
      return res.status(500).json({ error: `Error registering user: ${error.message}` });
    }
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

export default router;
