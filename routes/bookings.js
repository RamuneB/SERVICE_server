const express = require('express');
const router = express.Router();

// Gauti užsakymus pagal vartotojo el. paštą
router.get('/user/:email', (req, res) => {
  res.send(`Gauti užsakymus vartotojui su el. paštu: ${req.params.email}`);
});

// Sukurti naują užsakymą
router.post('/', (req, res) => {
  res.send('Sukurti naują užsakymą');
});

module.exports = router;
